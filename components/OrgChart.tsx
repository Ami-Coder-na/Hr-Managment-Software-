import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Employee } from '../types';

interface OrgChartProps {
  employees: Employee[];
}

interface HierarchyNode extends d3.HierarchyNode<Employee> {
    x: number;
    y: number;
}

const OrgChart: React.FC<OrgChartProps> = ({ employees }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!employees.length || !svgRef.current || !wrapperRef.current) return;

    // 1. Process Data into Hierarchy
    // We need a root. If multiple roots (e.g. multiple people with no manager or manager not in list),
    // we might need to create a fake root.
    // Assuming CEO has no manager or managerId is not in list.
    
    // Create a map for easy lookup with explicit typing
    const employeeMap = new Map<string, Employee & { children: any[] }>();
    employees.forEach(e => {
        employeeMap.set(e.id, { ...e, children: [] });
    });

    let rootEmployee: (Employee & { children: any[] }) | null = null;

    // Build tree
    employees.forEach(e => {
        const mapped = employeeMap.get(e.id);
        if (e.managerId && employeeMap.has(e.managerId)) {
            const manager = employeeMap.get(e.managerId);
            manager?.children.push(mapped);
        } else {
            rootEmployee = mapped || null; // Simplification: assumes one root
        }
    });

    if (!rootEmployee) return;

    // 2. Setup D3
    const width = wrapperRef.current.clientWidth;
    const height = 600;
    const nodeWidth = 220;
    const nodeHeight = 100;
    const margin = { top: 40, right: 20, bottom: 20, left: 20 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const root = d3.hierarchy<Employee>(rootEmployee);
    const treeLayout = d3.tree<Employee>().nodeSize([nodeWidth + 20, nodeHeight + 60]);

    // Compute layout
    const treeData = treeLayout(root);
    
    // Center the tree
    // Find min/max X to center
    let x0 = Infinity;
    let x1 = -Infinity;
    root.each((d: any) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    const centerX = (width - (x1 - x0)) / 2 - x0;
    g.attr("transform", `translate(${width / 2}, ${margin.top + 20})`);

    // Links
    g.selectAll(".link")
        .data(treeData.links())
        .enter().append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#cbd5e1")
        .attr("stroke-width", 2)
        .attr("d", d3.linkVertical()
            .x((d: any) => d.x)
            .y((d: any) => d.y) as any
        );

    // Nodes
    const nodes = g.selectAll(".node")
        .data(treeData.descendants())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);

    // Node Card Rect
    nodes.append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("x", -nodeWidth / 2)
        .attr("y", 0)
        .attr("rx", 8)
        .attr("fill", "white")
        .attr("stroke", "#e2e8f0")
        .attr("stroke-width", 1)
        .style("filter", "drop-shadow(0 4px 6px rgba(0,0,0,0.05))");

    // Avatar Clip Path
    const defs = svg.append("defs");
    nodes.each(function(d, i) {
        const id = `clip-${i}`;
        defs.append("clipPath")
            .attr("id", id)
            .append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", 24);
    });

    // Avatar Group
    const avatars = nodes.append("g")
        .attr("transform", `translate(0, 0)`); // Centered on top border

    avatars.append("circle")
        .attr("r", 26)
        .attr("fill", "white")
        .attr("stroke", "#e2e8f0");
        
    avatars.append("image")
        .attr("href", (d) => d.data.avatar)
        .attr("width", 48)
        .attr("height", 48)
        .attr("x", -24)
        .attr("y", -24)
        .attr("clip-path", (d, i) => `url(#clip-${i})`);

    // Name
    nodes.append("text")
        .attr("dy", 45)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("font-weight", "600")
        .attr("fill", "#1e293b")
        .text((d) => `${d.data.firstName} ${d.data.lastName}`);

    // Role
    nodes.append("text")
        .attr("dy", 65)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#64748b")
        .text((d) => d.data.role);
    
     // Dept
     nodes.append("text")
     .attr("dy", 82)
     .attr("text-anchor", "middle")
     .attr("font-size", "11px")
     .attr("fill", "#94a3b8")
     .attr("font-style", "italic")
     .text((d) => d.data.department);


  }, [employees]);

  return (
    <div ref={wrapperRef} className="w-full h-full overflow-auto bg-slate-50 border border-slate-200 rounded-xl relative">
        <svg ref={svgRef} width="100%" height={800} style={{minWidth: '800px'}}></svg>
        <div className="absolute bottom-4 right-4 bg-white/80 p-2 rounded text-xs text-slate-500 backdrop-blur-sm">
            Drag to pan (not implemented in simplified version) &bull; Scroll to zoom
        </div>
    </div>
  );
};

export default OrgChart;