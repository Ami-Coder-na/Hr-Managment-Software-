import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  Users, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Plus,
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  FileText,
  TrendingUp,
  MapPin,
  Filter,
  X,
  Award,
  Mail,
  Hash,
  User,
  CheckSquare,
  AlertCircle,
  Edit2,
  Trash2,
  Eye,
  CalendarClock,
  Banknote,
  Download,
  Printer,
  CreditCard,
  Wallet,
  Upload,
  GraduationCap,
  ListChecks,
  Circle,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  Network,
  LayoutDashboard,
  Shield,
  Bell,
  Database,
  Globe,
  Building,
  Save,
  Lock,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import Sidebar from './components/Sidebar';
import OrgChart from './components/OrgChart';
import { MOCK_EMPLOYEES, MOCK_JOBS, DEPARTMENTS_LIST, MOCK_TASKS, MOCK_ATTENDANCE, MOCK_LEAVES, MOCK_PAYROLL, MOCK_ONBOARDING } from './constants';
import { Employee, ViewState, JobPosting, Department, EmployeeStatus, Task, TaskStatus, TaskPriority, AttendanceRecord, LeaveRequest, PayrollRecord, OnboardingRecord, OnboardingTask } from './types';
import * as GeminiService from './services/geminiService';

// --- Sub-components ---

const LoginView = ({ onLogin }: { onLogin: (e: React.FormEvent) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            onLogin(e);
        }, 1000);
    };

    const handleDemoLogin = (role: 'admin' | 'hr') => {
        if (role === 'admin') {
            setEmail('admin@nexus.com');
            setPassword('admin123');
        } else {
            setEmail('hr.manager@nexus.com');
            setPassword('hr123');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-indigo-500/30 mx-auto mb-4">
                        N
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                    <p className="text-slate-500 text-sm mt-2">Sign in to access your dashboard</p>
                </div>

                {/* Demo Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <button 
                        type="button"
                        onClick={() => handleDemoLogin('admin')}
                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
                    >
                        <span className="text-xs font-bold text-slate-600 group-hover:text-indigo-700 uppercase tracking-wider mb-1">Admin Demo</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-indigo-500">admin@nexus.com</span>
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleDemoLogin('hr')}
                        className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-200 transition-all group"
                    >
                        <span className="text-xs font-bold text-slate-600 group-hover:text-purple-700 uppercase tracking-wider mb-1">HR Demo</span>
                        <span className="text-[10px] text-slate-400 group-hover:text-purple-500">hr@nexus.com</span>
                    </button>
                </div>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-400 font-medium">Or sign in with email</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                            <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            <>
                                Sign In <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-slate-400">
                        Don't have an account? <a href="#" className="text-indigo-600 font-medium hover:underline">Contact Admin</a>
                    </p>
                </div>
            </div>

            <p className="mt-8 text-xs text-slate-400">© 2023 Nexus Innovations Inc. All rights reserved.</p>
        </div>
    );
};

const StatCard = ({ title, value, subtext, icon: Icon, colorClass, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${colorClass} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
            </div>
            {trend && (
                <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    <TrendingUp size={12} className="mr-1" /> {trend}
                </span>
            )}
        </div>
        <div>
            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">{value}</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">{title}</p>
            {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
        </div>
    </div>
);

const DashboardStats = ({ employees, jobs }: { employees: Employee[], jobs: JobPosting[] }) => {
    const departmentData = [
        { name: 'Eng', count: employees.filter(e => e.department === Department.ENGINEERING).length },
        { name: 'Prod', count: employees.filter(e => e.department === Department.PRODUCT).length },
        { name: 'Sales', count: employees.filter(e => e.department === Department.SALES).length },
        { name: 'HR', count: employees.filter(e => e.department === Department.HR).length },
        { name: 'Mkt', count: employees.filter(e => e.department === Department.MARKETING).length },
    ];

    const hiringData = [
        { name: 'Jan', applicants: 65, hires: 4 },
        { name: 'Feb', applicants: 59, hires: 3 },
        { name: 'Mar', applicants: 80, hires: 6 },
        { name: 'Apr', applicants: 81, hires: 5 },
        { name: 'May', applicants: 56, hires: 3 },
        { name: 'Jun', applicants: 95, hires: 7 },
        { name: 'Jul', applicants: 70, hires: 4 },
    ];

    const performanceData = [
        { name: 'Outstanding', count: 12, fill: '#6366f1' },
        { name: 'Exceeds', count: 28, fill: '#8b5cf6' },
        { name: 'Meets', count: 45, fill: '#ec4899' },
        { name: 'Needs Imp.', count: 10, fill: '#f43f5e' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Employees" 
                    value={employees.length} 
                    trend="+4.5%" 
                    icon={Users} 
                    colorClass="bg-indigo-500" 
                />
                <StatCard 
                    title="Active Jobs" 
                    value={jobs.filter(j => j.status === 'Open').length} 
                    subtext="3 urgencies"
                    icon={Briefcase} 
                    colorClass="bg-purple-500" 
                />
                <StatCard 
                    title="Upcoming Reviews" 
                    value="12" 
                    subtext="Next 7 days"
                    icon={Calendar} 
                    colorClass="bg-amber-500" 
                />
                <StatCard 
                    title="Payroll Forecast" 
                    value="$1.2M" 
                    trend="+1.2%"
                    icon={DollarSign} 
                    colorClass="bg-emerald-500" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-lg font-bold text-slate-800">Headcount by Department</h4>
                        <button className="text-sm text-indigo-600 font-medium hover:underline">View Report</button>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}}
                                    itemStyle={{color: '#fff'}}
                                />
                                <Bar dataKey="count" fill="url(#colorCount)" radius={[6, 6, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                     <h4 className="text-lg font-bold text-slate-800 mb-2">Diversity Metrics</h4>
                     <p className="text-sm text-slate-500 mb-6">Gender distribution across company</p>
                     <div className="h-64 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={[{name: 'Male', value: 58}, {name: 'Female', value: 42}]} 
                                    innerRadius={70} 
                                    outerRadius={90} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                    startAngle={90}
                                    endAngle={-270}
                                >
                                    <Cell key="cell-0" fill="#6366f1" strokeWidth={0} />
                                    <Cell key="cell-1" fill="#ec4899" strokeWidth={0} />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-3xl font-bold text-slate-800">42%</span>
                            <span className="text-xs text-slate-500 font-medium">Female</span>
                        </div>
                     </div>
                     <div className="flex justify-center gap-6 mt-2">
                         <div className="flex items-center gap-2 text-sm text-slate-600">
                             <div className="w-3 h-3 rounded-full bg-indigo-500"></div> Male
                         </div>
                         <div className="flex items-center gap-2 text-sm text-slate-600">
                             <div className="w-3 h-3 rounded-full bg-pink-500"></div> Female
                         </div>
                     </div>
                </div>
            </div>

            {/* Additional Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Recruitment Velocity</h4>
                    <p className="text-sm text-slate-500 mb-6">Applications vs Hires (YTD)</p>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={hiringData}>
                                <defs>
                                    <linearGradient id="colorApplicants" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Area type="monotone" dataKey="applicants" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorApplicants)" />
                                <Area type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHires)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="text-lg font-bold text-slate-800 mb-2">Performance Distribution</h4>
                    <p className="text-sm text-slate-500 mb-6">Last Review Cycle</p>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData} layout="vertical" margin={{top: 0, right: 30, left: 10, bottom: 0}}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px'}} />
                                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={32}>
                                    {performanceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EmployeeList = ({ 
    employees, 
    setEmployees, 
    tasks 
}: { 
    employees: Employee[], 
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>,
    tasks: Task[]
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Modal & Form States
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    
    // Delete States
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);

    // View Details State
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    // Import
    const fileInputRef = useRef<HTMLInputElement>(null);

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        department: DEPARTMENTS_LIST[0] as Department,
        status: EmployeeStatus.ACTIVE
    };

    const [formData, setFormData] = useState(initialFormData);

    // Click outside to close action menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (activeMenuId && !(event.target as Element).closest('.action-menu-container')) {
                setActiveMenuId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeMenuId]);

    const filtered = employees.filter(e => 
        e.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const employeeTasks = selectedEmployee ? tasks.filter(t => t.assigneeId === selectedEmployee.id) : [];

    const handleOpenAddModal = () => {
        setEditingId(null);
        setFormData(initialFormData);
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = (emp: Employee) => {
        setEditingId(emp.id);
        setFormData({
            firstName: emp.firstName,
            lastName: emp.lastName,
            email: emp.email,
            role: emp.role,
            department: emp.department,
            status: emp.status
        });
        setIsFormModalOpen(true);
        setActiveMenuId(null);
    };

    const handleDeleteClick = (id: string) => {
        setEmployeeToDelete(id);
        setIsDeleteModalOpen(true);
        setActiveMenuId(null);
    };

    const confirmDelete = () => {
        if (employeeToDelete) {
            setEmployees(prev => prev.filter(e => e.id !== employeeToDelete));
            // Close view modal if the deleted employee was being viewed
            if (selectedEmployee && selectedEmployee.id === employeeToDelete) {
                setIsViewModalOpen(false);
            }
        }
        setIsDeleteModalOpen(false);
        setEmployeeToDelete(null);
    };

    const handleSaveEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingId) {
            // Update existing
            setEmployees(prev => prev.map(emp => {
                if (emp.id === editingId) {
                    return {
                        ...emp,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        role: formData.role,
                        department: formData.department,
                        status: formData.status,
                        // Update avatar based on new name
                        avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random&color=fff&background=6366f1`,
                    };
                }
                return emp;
            }));
        } else {
            // Add new
            const newEmployee: Employee = {
                id: Date.now().toString(),
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: formData.role,
                department: formData.department,
                status: formData.status,
                joinDate: new Date().toISOString().split('T')[0],
                avatar: `https://ui-avatars.com/api/?name=${formData.firstName}+${formData.lastName}&background=random&color=fff&background=6366f1`,
            };
            setEmployees(prev => [...prev, newEmployee]);
        }

        setIsFormModalOpen(false);
        setFormData(initialFormData);
        setEditingId(null);
    };

    const handleRowClick = (emp: Employee) => {
        setSelectedEmployee(emp);
        setIsViewModalOpen(true);
    };

    const handleViewDetails = (emp: Employee) => {
        handleRowClick(emp);
        setActiveMenuId(null);
    };

    const toggleMenu = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };
    
    // CSV Import Logic
    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            if (!text) return;
    
            try {
                const lines = text.split('\n');
                if (lines.length < 2) {
                    alert("CSV file seems empty or missing header row.");
                    return;
                }

                // Normalize headers to lowercase and remove quotes
                const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
                
                const newEmployees: Employee[] = [];
    
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (!line) continue;
    
                    // Regex to split by comma but ignore commas inside quotes
                    const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
    
                    if (values.length < 2) continue; // Basic check
    
                    const getValue = (keyPart: string) => {
                        const index = headers.findIndex(h => h.includes(keyPart));
                        return index !== -1 ? values[index] : '';
                    };
    
                    const firstName = getValue('first') || values[0] || '';
                    const lastName = getValue('last') || values[1] || '';
                    const email = getValue('email') || values[2] || '';
                    const role = getValue('role') || values[3] || 'Employee';
                    const deptStr = getValue('department') || values[4] || '';
                    const statusStr = getValue('status') || values[5] || '';
                    
                    // Validate/Normalize Enums
                    const department = Object.values(Department).find(d => d.toLowerCase() === deptStr.toLowerCase()) 
                        || (Object.values(Department).includes(deptStr as Department) ? deptStr as Department : Department.ENGINEERING);
                    
                    const status = Object.values(EmployeeStatus).find(s => s.toLowerCase() === statusStr.toLowerCase()) 
                        || (Object.values(EmployeeStatus).includes(statusStr as EmployeeStatus) ? statusStr as EmployeeStatus : EmployeeStatus.ACTIVE);
    
                    if (firstName && email) {
                        newEmployees.push({
                            id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                            firstName,
                            lastName,
                            email,
                            role,
                            department,
                            status,
                            joinDate: new Date().toISOString().split('T')[0],
                            avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&color=fff&background=6366f1`
                        });
                    }
                }
    
                if (newEmployees.length > 0) {
                    setEmployees(prev => [...prev, ...newEmployees]);
                    alert(`Successfully imported ${newEmployees.length} employees.`);
                } else {
                    alert("No valid employees found in CSV.");
                }
    
            } catch (error) {
                console.error("CSV Parse Error", error);
                alert("Error parsing CSV file. Please check format.");
            }
            
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = '';
        };
        reader.readAsText(file);
    };

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name, role, or ID..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    {/* Hidden File Input */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept=".csv" 
                        className="hidden" 
                    />
                    <button 
                        onClick={handleImportClick}
                        className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors"
                        title="Import CSV (Headers: firstName, lastName, email, role, department, status)"
                    >
                        <Upload size={18} />
                        Import CSV
                    </button>
                    <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors">
                        <Filter size={18} />
                        Filter
                    </button>
                    <button 
                        onClick={handleOpenAddModal}
                        className="flex-1 sm:flex-initial px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20"
                    >
                        <Plus size={18} />
                        Add Employee
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
                <div className="overflow-x-visible">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map(emp => (
                                <tr 
                                    key={emp.id} 
                                    onClick={() => handleRowClick(emp)}
                                    className="group hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:z-10 relative transition-all duration-200 ease-in-out cursor-pointer"
                                >
                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs text-slate-500">#{emp.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${emp.status === EmployeeStatus.ACTIVE ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900">{emp.firstName} {emp.lastName}</p>
                                                <p className="text-xs text-slate-500">{emp.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-700 font-medium">{emp.role}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                            {emp.department}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                                            ${emp.status === EmployeeStatus.ACTIVE 
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                                : 'bg-amber-50 text-amber-700 border border-amber-100'}
                                        `}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${emp.status === EmployeeStatus.ACTIVE ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right relative action-menu-container">
                                        <button 
                                            onClick={(e) => toggleMenu(e, emp.id)} 
                                            className={`p-2 rounded-lg transition-all duration-200 outline-none
                                                ${activeMenuId === emp.id 
                                                    ? 'bg-indigo-50 text-indigo-600 opacity-100' 
                                                    : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 opacity-0 group-hover:opacity-100'}
                                            `}
                                        >
                                            <MoreVertical size={18} />
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        {activeMenuId === emp.id && (
                                            <div className="absolute right-8 top-8 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in zoom-in-95 duration-100 origin-top-right">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleViewDetails(emp); }}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                                                >
                                                    <Eye size={16} /> View Profile
                                                </button>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleOpenEditModal(emp); }}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                                                >
                                                    <Edit2 size={16} /> Edit Details
                                                </button>
                                                <div className="h-px bg-slate-100 my-1"></div>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteClick(emp.id); }}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                                >
                                                    <Trash2 size={16} /> Delete Employee
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <Search size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">No employees found</h3>
                        <p className="text-slate-500 mt-1">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Employee Modal */}
            {isFormModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-slate-100">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
                                <p className="text-sm text-slate-500 mt-1">{editingId ? 'Update employee details below.' : 'Enter the details of the new team member.'}</p>
                            </div>
                            <button 
                                onClick={() => setIsFormModalOpen(false)} 
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSaveEmployee} className="p-8 space-y-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">First Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.firstName}
                                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                        placeholder="Jane"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={formData.lastName}
                                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                                <input 
                                    required
                                    type="email" 
                                    value={formData.email}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                    placeholder="jane.doe@nexus.com"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role / Title</label>
                                <input 
                                    required
                                    type="text" 
                                    value={formData.role}
                                    onChange={e => setFormData({...formData, role: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                    placeholder="e.g. Senior Developer"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</label>
                                    <div className="relative">
                                        <select 
                                            value={formData.department}
                                            onChange={e => setFormData({...formData, department: e.target.value as Department})}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            {DEPARTMENTS_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ChevronRight size={16} className="rotate-90" />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                                    <div className="relative">
                                        <select 
                                            value={formData.status}
                                            onChange={e => setFormData({...formData, status: e.target.value as EmployeeStatus})}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            {Object.values(EmployeeStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                            <ChevronRight size={16} className="rotate-90" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex gap-3">
                                <button type="button" onClick={() => setIsFormModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95">
                                    {editingId ? 'Save Changes' : 'Add Employee'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200 border border-slate-100 text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                            <AlertCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Delete Employee?</h3>
                        <p className="text-slate-500 text-sm mb-6">Are you sure you want to delete this employee? This action cannot be undone.</p>
                        
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setIsDeleteModalOpen(false)} 
                                className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={confirmDelete} 
                                className="flex-1 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 font-medium shadow-lg shadow-red-500/20 transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Employee Details Modal */}
            {isViewModalOpen && selectedEmployee && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200 border border-slate-100 relative">
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Employee Details</h3>
                                <p className="text-sm text-slate-500 mt-1">Full profile information.</p>
                            </div>
                            <button 
                                onClick={() => setIsViewModalOpen(false)} 
                                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        {/* Body */}
                        <div className="p-8">
                             {/* Top Section: Avatar & Basic Info */}
                             <div className="flex flex-col items-center mb-8">
                                <div className="relative mb-4">
                                    <img 
                                        src={selectedEmployee.avatar} 
                                        alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`} 
                                        className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-50 shadow-lg" 
                                    />
                                    <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white ${selectedEmployee.status === EmployeeStatus.ACTIVE ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 text-center">{selectedEmployee.firstName} {selectedEmployee.lastName}</h2>
                                <p className="text-slate-500 font-medium">{selectedEmployee.role}</p>
                                <span className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                                    ${selectedEmployee.status === EmployeeStatus.ACTIVE 
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                        : 'bg-amber-50 text-amber-700 border border-amber-100'}
                                `}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${selectedEmployee.status === EmployeeStatus.ACTIVE ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                                    {selectedEmployee.status}
                                </span>
                             </div>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 border-b border-slate-100 pb-8 mb-8">
                                {/* Email */}
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Mail size={12} /> Email Address
                                    </label>
                                    <p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 truncate">
                                        {selectedEmployee.email}
                                    </p>
                                </div>

                                {/* Department */}
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Users size={12} /> Department
                                    </label>
                                    <p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                        {selectedEmployee.department}
                                    </p>
                                </div>

                                {/* Join Date */}
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Clock size={12} /> Join Date
                                    </label>
                                    <p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                                        {selectedEmployee.joinDate}
                                    </p>
                                </div>

                                {/* Employee ID */}
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <Hash size={12} /> Employee ID
                                    </label>
                                    <p className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 font-mono">
                                        {selectedEmployee.id}
                                    </p>
                                </div>

                                {/* Manager Info */}
                                <div className="space-y-1">
                                     <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <User size={12} /> Manager
                                    </label>
                                    <div className="text-sm font-medium text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 flex items-center gap-2">
                                        {selectedEmployee.managerId ? (
                                            <>
                                                {(() => {
                                                    const manager = employees.find(e => e.id === selectedEmployee.managerId);
                                                    return manager ? (
                                                        <>
                                                            <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] text-indigo-700 font-bold">
                                                                {manager.firstName[0]}{manager.lastName[0]}
                                                            </div>
                                                            <span>{manager.firstName} {manager.lastName}</span>
                                                            <span className="text-xs text-slate-400 ml-auto">#{manager.id}</span>
                                                        </>
                                                    ) : <span>Unknown (ID: {selectedEmployee.managerId})</span>
                                                })()}
                                            </>
                                        ) : (
                                            <span className="text-slate-400 italic">No Manager Assigned</span>
                                        )}
                                    </div>
                                </div>
                             </div>

                             {/* Assigned Tasks Section */}
                             <div>
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <CheckSquare size={16} className="text-indigo-600" />
                                    Assigned Tasks ({employeeTasks.length})
                                </h4>
                                {employeeTasks.length > 0 ? (
                                    <div className="space-y-3">
                                        {employeeTasks.map(task => (
                                            <div key={task.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex justify-between items-start">
                                                <div>
                                                    <h5 className="font-semibold text-slate-800 text-sm">{task.title}</h5>
                                                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{task.description}</p>
                                                    <div className="flex gap-2 mt-2">
                                                         <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border
                                                            ${task.priority === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 
                                                              task.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                              'bg-blue-50 text-blue-600 border-blue-100'}
                                                         `}>{task.priority}</span>
                                                         <span className="text-xs font-medium text-slate-500 bg-white border border-slate-100 px-1.5 py-0.5 rounded">Due: {task.dueDate}</span>
                                                    </div>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full
                                                    ${task.status === 'Done' ? 'bg-emerald-100 text-emerald-700' : 
                                                      task.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700' :
                                                      'bg-slate-100 text-slate-700'}
                                                `}>
                                                    {task.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                                        <p className="text-slate-400 text-sm">No active tasks assigned.</p>
                                    </div>
                                )}
                             </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                             <button 
                                onClick={() => setIsViewModalOpen(false)}
                                className="w-full bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg hover:bg-slate-50 font-medium transition-colors shadow-sm"
                             >
                                Close Details
                             </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ... [The rest of the sub-components: AttendanceView, PayrollView, TaskManagementView, RecruitmentView, PerformanceView, OnboardingView, SettingsView remain unchanged] ...
const AttendanceView = ({ 
    employees, 
    attendance, 
    leaves,
    setLeaves 
}: { 
    employees: Employee[], 
    attendance: AttendanceRecord[], 
    leaves: LeaveRequest[],
    setLeaves: React.Dispatch<React.SetStateAction<LeaveRequest[]>>
}) => {
    // ... [Content of AttendanceView same as previous] ...
    const [activeTab, setActiveTab] = useState<'daily' | 'leaves'>('daily');

    const getStatusColor = (status: string) => {
        switch(status) {
            case 'Present': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'Absent': return 'bg-red-50 text-red-700 border-red-100';
            case 'Late': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'Half Day': return 'bg-blue-50 text-blue-700 border-blue-100';
            default: return 'bg-slate-50 text-slate-700 border-slate-100';
        }
    };

    const handleApproveLeave = (id: string) => {
        setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    };

    const handleRejectLeave = (id: string) => {
        setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-2 rounded-xl border border-slate-200 inline-flex shadow-sm">
                <button 
                    onClick={() => setActiveTab('daily')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'daily' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                    Daily Attendance
                </button>
                <button 
                    onClick={() => setActiveTab('leaves')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'leaves' ? 'bg-indigo-50 text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
                >
                    Leave Requests
                    {leaves.filter(l => l.status === 'Pending').length > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {leaves.filter(l => l.status === 'Pending').length}
                        </span>
                    )}
                </button>
            </div>

            {activeTab === 'daily' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Attendance Log</h3>
                            <p className="text-sm text-slate-500">Today: {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                             <button className="text-sm bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50">Export Report</button>
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Check In</th>
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Check Out</th>
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Work Hours</th>
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {attendance.map(record => {
                                const employee = employees.find(e => e.id === record.employeeId);
                                return (
                                    <tr key={record.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={employee?.avatar} className="w-8 h-8 rounded-full" alt="" />
                                                <span className="font-medium text-slate-800 text-sm">{employee?.firstName} {employee?.lastName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 font-mono">{record.checkIn || '--:--'}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 font-mono">{record.checkOut || '--:--'}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600">8h 30m</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusColor(record.status)}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'leaves' && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-lg font-bold text-slate-800">Leave Requests</h3>
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 shadow-sm">
                            Request Leave
                        </button>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {leaves.map(leave => {
                            const employee = employees.find(e => e.id === leave.employeeId);
                            return (
                                <div key={leave.id} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-4">
                                            <img src={employee?.avatar} className="w-10 h-10 rounded-full ring-2 ring-slate-100" alt="" />
                                            <div>
                                                <h4 className="font-bold text-slate-800">{employee?.firstName} {employee?.lastName}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">{leave.type}</span>
                                                    <span className="text-xs text-slate-400">•</span>
                                                    <span className="text-xs text-slate-500 font-medium">{leave.startDate} to {leave.endDate}</span>
                                                </div>
                                                <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">"{leave.reason}"</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {leave.status === 'Pending' ? (
                                                <>
                                                    <button 
                                                        onClick={() => handleRejectLeave(leave.id)}
                                                        className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                    >
                                                        Reject
                                                    </button>
                                                    <button 
                                                        onClick={() => handleApproveLeave(leave.id)}
                                                        className="px-3 py-1.5 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm shadow-emerald-500/20 transition-colors"
                                                    >
                                                        Approve
                                                    </button>
                                                </>
                                            ) : (
                                                <span className={`text-xs font-bold px-3 py-1.5 rounded-full border 
                                                    ${leave.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                                    {leave.status}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const PayrollView = ({ 
    employees, 
    payroll, 
    setPayroll 
}: { 
    employees: Employee[], 
    payroll: PayrollRecord[], 
    setPayroll: React.Dispatch<React.SetStateAction<PayrollRecord[]>> 
}) => {
    // ... [PayrollView Content same as previous] ...
    const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);
    const [selectedMonth, setSelectedMonth] = useState('October');
    const [selectedYear, setSelectedYear] = useState(2023);
    
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [processingRecordId, setProcessingRecordId] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<'Bank Transfer' | 'Check' | 'Cash'>('Bank Transfer');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = [2023, 2024];

    const filteredPayroll = payroll.filter(p => p.month === selectedMonth && p.year === selectedYear);

    const totalPayroll = filteredPayroll.reduce((acc, curr) => acc + curr.netSalary, 0);
    const pendingCount = filteredPayroll.filter(p => p.status === 'Pending' || p.status === 'Processing').length;

    const openPaymentModal = (id: string) => {
        setProcessingRecordId(id);
        setPaymentModalOpen(true);
    };

    const confirmPayment = (e: React.FormEvent) => {
        e.preventDefault();
        if (processingRecordId) {
            setPayroll(prev => prev.map(p => 
                p.id === processingRecordId 
                    ? { ...p, status: 'Paid', paymentDate: paymentDate, paymentMethod: paymentMethod } 
                    : p
            ));
        }
        setPaymentModalOpen(false);
        setProcessingRecordId(null);
    };

    const getMethodIcon = (method?: string) => {
        switch(method) {
            case 'Bank Transfer': return <CreditCard size={14} className="text-indigo-600" />;
            case 'Cash': return <Wallet size={14} className="text-emerald-600" />;
            case 'Check': return <Banknote size={14} className="text-amber-600" />;
            default: return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                     <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-slate-500">Month:</label>
                        <div className="relative">
                            <select 
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer font-medium"
                            >
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={14} />
                        </div>
                     </div>
                     <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-slate-500">Year:</label>
                        <div className="relative">
                            <select 
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg pl-3 pr-8 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer font-medium"
                            >
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                            <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" size={14} />
                        </div>
                     </div>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Generate Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Payroll Cost</p>
                            <h3 className="text-2xl font-bold text-slate-800">${totalPayroll.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                            <Clock size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Pending Payments</p>
                            <h3 className="text-2xl font-bold text-slate-800">{pendingCount} Employees</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg shadow-indigo-500/20 text-white flex flex-col justify-center items-center text-center">
                    <p className="text-indigo-100 text-sm font-medium mb-1">Next Pay Date</p>
                    <h3 className="text-2xl font-bold">Nov 30, 2023</h3>
                    <button className="mt-3 bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                        Configure Schedule
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Payroll Records - {selectedMonth} {selectedYear}</h3>
                    <span className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-md font-medium">{filteredPayroll.length} Records</span>
                </div>
                {filteredPayroll.length > 0 ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Net Pay</th>
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Date</th>
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Method</th>
                                <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredPayroll.map(record => {
                                const employee = employees.find(e => e.id === record.employeeId);
                                return (
                                    <tr key={record.id} className="hover:bg-slate-50/50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                    {employee?.firstName[0]}{employee?.lastName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800 text-sm">{employee?.firstName} {employee?.lastName}</p>
                                                    <p className="text-xs text-slate-500">{employee?.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-slate-800">${record.netSalary.toLocaleString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border
                                                ${record.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                                  record.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                  'bg-amber-50 text-amber-700 border-amber-100'}
                                            `}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                                            {record.paymentDate || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {record.paymentMethod ? (
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200 w-fit">
                                                    {getMethodIcon(record.paymentMethod)}
                                                    {record.paymentMethod}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">Pending</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => setSelectedPayslip(record)}
                                                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Payslip">
                                                    <FileText size={18} />
                                                </button>
                                                {record.status !== 'Paid' && (
                                                    <button 
                                                        onClick={() => openPaymentModal(record.id)}
                                                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Process Payment">
                                                        <CheckCircle2 size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="p-12 text-center text-slate-400">
                        <CalendarClock size={48} className="mx-auto mb-3 opacity-50" />
                        <p className="font-medium">No payroll records found for {selectedMonth} {selectedYear}</p>
                    </div>
                )}
            </div>

            {paymentModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 border border-slate-200">
                         <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-slate-900">Process Payment</h3>
                            <button onClick={() => setPaymentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                         </div>
                         <form onSubmit={confirmPayment} className="space-y-4">
                             <div className="space-y-1.5">
                                 <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Method</label>
                                 <div className="grid grid-cols-3 gap-2">
                                     {['Bank Transfer', 'Check', 'Cash'].map((method) => (
                                         <button
                                            key={method}
                                            type="button"
                                            onClick={() => setPaymentMethod(method as any)}
                                            className={`p-2 rounded-lg border text-xs font-medium flex flex-col items-center gap-1 transition-all
                                                ${paymentMethod === method 
                                                    ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}
                                            `}
                                         >
                                             {getMethodIcon(method)}
                                             {method === 'Bank Transfer' ? 'Bank' : method}
                                         </button>
                                     ))}
                                 </div>
                             </div>

                             <div className="space-y-1.5">
                                 <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Payment Date</label>
                                 <input 
                                    type="date"
                                    required
                                    value={paymentDate}
                                    onChange={(e) => setPaymentDate(e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none"
                                 />
                             </div>

                             <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-medium shadow-lg shadow-emerald-500/20 transition-all mt-2">
                                 Confirm Payment
                             </button>
                         </form>
                    </div>
                </div>
            )}

            {selectedPayslip && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-in zoom-in-95 border border-slate-200">
                        <div className="flex justify-between items-start mb-8 border-b border-slate-100 pb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Payslip</h2>
                                <p className="text-sm text-slate-500 mt-1">
                                    {selectedPayslip.month} {selectedPayslip.year}
                                </p>
                            </div>
                            <div className="text-right">
                                <h3 className="font-bold text-indigo-600 text-xl">Nexus HR</h3>
                                <p className="text-xs text-slate-400">ID: #{selectedPayslip.id}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Employee Details</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-slate-800">
                                            {employees.find(e => e.id === selectedPayslip.employeeId)?.firstName} {employees.find(e => e.id === selectedPayslip.employeeId)?.lastName}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            {employees.find(e => e.id === selectedPayslip.employeeId)?.role}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-500">Payment Date</p>
                                        <p className="font-medium text-slate-800">{selectedPayslip.paymentDate || 'Pending'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between py-2 border-b border-dashed border-slate-200">
                                    <span className="text-slate-600 text-sm">Basic Salary</span>
                                    <span className="font-medium text-slate-800">${selectedPayslip.basicSalary.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-dashed border-slate-200">
                                    <span className="text-emerald-600 text-sm">Allowances</span>
                                    <span className="font-medium text-emerald-600">+${selectedPayslip.allowances.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-dashed border-slate-200">
                                    <span className="text-red-600 text-sm">Deductions (Tax, PF)</span>
                                    <span className="font-medium text-red-600">-${selectedPayslip.deductions.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between pt-4">
                                    <span className="text-lg font-bold text-slate-900">Net Payable</span>
                                    <span className="text-lg font-bold text-indigo-600">${selectedPayslip.netSalary.toLocaleString()}</span>
                                </div>
                                {selectedPayslip.paymentMethod && (
                                    <div className="flex justify-between pt-2">
                                        <span className="text-sm text-slate-500">Paid via</span>
                                        <span className="text-sm font-medium text-slate-700">{selectedPayslip.paymentMethod}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                            <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg hover:bg-slate-50 font-medium flex items-center justify-center gap-2 transition-colors">
                                <Download size={16} /> Download PDF
                            </button>
                            <button 
                                onClick={() => setSelectedPayslip(null)}
                                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-500/20 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const TaskManagementView = ({ employees, tasks, setTasks }: { 
    employees: Employee[], 
    tasks: Task[], 
    setTasks: React.Dispatch<React.SetStateAction<Task[]>> 
}) => {
    // ... [TaskManagementView content omitted for brevity, unchanged] ...
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [newTask, setNewTask] = useState<Partial<Task>>({
        title: '',
        description: '',
        assigneeId: employees[0]?.id || '',
        priority: 'Medium',
        status: 'To Do',
        dueDate: new Date().toISOString().split('T')[0]
    });

    const handleCreateTask = (e: React.FormEvent) => {
        e.preventDefault();
        const task: Task = {
            id: `t${Date.now()}`,
            title: newTask.title || 'New Task',
            description: newTask.description || '',
            assigneeId: newTask.assigneeId || employees[0].id,
            status: newTask.status as TaskStatus,
            priority: newTask.priority as TaskPriority,
            dueDate: newTask.dueDate || ''
        };
        setTasks([...tasks, task]);
        setIsTaskModalOpen(false);
        setNewTask({
            title: '',
            description: '',
            assigneeId: employees[0]?.id || '',
            priority: 'Medium',
            status: 'To Do',
            dueDate: new Date().toISOString().split('T')[0]
        });
    };

    const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    };

    const getPriorityColor = (p: TaskPriority) => {
        switch(p) {
            case 'High': return 'bg-red-50 text-red-700 border-red-200';
            case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'Low': return 'bg-blue-50 text-blue-700 border-blue-200';
            default: return 'bg-slate-50 text-slate-700';
        }
    };

    const TaskColumn = ({ title, status, items }: { title: string, status: TaskStatus, items: Task[] }) => (
        <div className="flex-1 min-w-[300px] bg-slate-50 rounded-xl p-4 border border-slate-200 h-full flex flex-col relative overflow-hidden">
            {status === 'Done' && (
                <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
                     <CheckCircle2 size={200} className="text-emerald-500" />
                </div>
            )}
            <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    {status === 'To Do' && <div className="w-3 h-3 rounded-full bg-slate-400" />}
                    {status === 'In Progress' && <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />}
                    {status === 'Done' && <div className="w-3 h-3 rounded-full bg-emerald-500" />}
                    {title}
                    <span className="ml-2 bg-white text-slate-500 px-2 py-0.5 rounded-full text-xs border border-slate-200 shadow-sm">{items.length}</span>
                </h3>
            </div>
            <div className="space-y-3 overflow-y-auto pr-1 flex-1 relative z-10">
                {items.map(task => {
                    const assignee = employees.find(e => e.id === task.assigneeId);
                    return (
                        <div 
                            key={task.id} 
                            className={`bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-2 duration-300
                                ${status === 'Done' ? 'border-emerald-100 bg-emerald-50/30' : 'border-slate-200'}
                            `}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide border ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                </span>
                                <div className="relative group/edit">
                                    <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                            <h4 className={`font-bold mb-1 ${status === 'Done' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{task.title}</h4>
                            <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">{task.description}</p>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                <div className="flex items-center gap-2" title={assignee ? `${assignee.firstName} ${assignee.lastName}` : 'Unassigned'}>
                                    {assignee ? (
                                        <img src={assignee.avatar} className="w-6 h-6 rounded-full ring-2 ring-white" alt="" />
                                    ) : (
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-500">?</div>
                                    )}
                                    <span className="text-xs font-medium text-slate-600">{assignee?.firstName || 'Unassigned'}</span>
                                </div>
                                
                                <select 
                                    value={task.status} 
                                    onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                                    className="text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200 rounded px-1 py-0.5 outline-none focus:border-indigo-500 cursor-pointer hover:bg-slate-100 transition-colors"
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="h-[calc(100vh-140px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                 <div>
                    <h2 className="text-xl font-bold text-slate-800">Task Board</h2>
                    <p className="text-sm text-slate-500">Manage team workload and priorities.</p>
                 </div>
                 <button 
                    onClick={() => setIsTaskModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md shadow-indigo-500/20 text-sm font-medium">
                    <Plus size={18} />
                    New Task
                 </button>
            </div>

            <div className="flex gap-6 h-full overflow-x-auto pb-4">
                <TaskColumn title="To Do" status="To Do" items={tasks.filter(t => t.status === 'To Do')} />
                <TaskColumn title="In Progress" status="In Progress" items={tasks.filter(t => t.status === 'In Progress')} />
                <TaskColumn title="Done" status="Done" items={tasks.filter(t => t.status === 'Done')} />
            </div>

            {/* Create Task Modal */}
            {isTaskModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-100 animate-in zoom-in-95">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900">Create New Task</h3>
                            <button onClick={() => setIsTaskModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateTask} className="p-8 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Task Title</label>
                                <input 
                                    required
                                    type="text" 
                                    value={newTask.title}
                                    onChange={e => setNewTask({...newTask, title: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                    placeholder="e.g. Q4 Financial Report"
                                />
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</label>
                                <textarea 
                                    value={newTask.description}
                                    onChange={e => setNewTask({...newTask, description: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none h-24" 
                                    placeholder="Briefly describe the task..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignee</label>
                                    <div className="relative">
                                        <select 
                                            value={newTask.assigneeId}
                                            onChange={e => setNewTask({...newTask, assigneeId: e.target.value})}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            {employees.map(e => <option key={e.id} value={e.id}>{e.firstName} {e.lastName}</option>)}
                                        </select>
                                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</label>
                                    <div className="relative">
                                        <select 
                                            value={newTask.priority}
                                            onChange={e => setNewTask({...newTask, priority: e.target.value as TaskPriority})}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Due Date</label>
                                <input 
                                    type="date" 
                                    value={newTask.dueDate}
                                    onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button type="button" onClick={() => setIsTaskModalOpen(false)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-700 font-medium transition-colors">Cancel</button>
                                <button type="submit" className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-500/20 transition-all transform active:scale-95">Create Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const RecruitmentView = ({ jobs, setJobs }: { jobs: JobPosting[], setJobs: React.Dispatch<React.SetStateAction<JobPosting[]>> }) => {
    // ... [RecruitmentView Content omitted, same as original] ...
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newJob, setNewJob] = useState({ title: '', department: 'Engineering', keywords: '' });
    const [generatedJD, setGeneratedJD] = useState<{ description: string, requirements: string[] } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    
    // Screening State
    const [screeningText, setScreeningText] = useState('');
    const [screeningResult, setScreeningResult] = useState<{score: number, summary: string} | null>(null);
    const [isScreening, setIsScreening] = useState(false);
    const [selectedJobIdForScreening, setSelectedJobIdForScreening] = useState<string | null>(null);

    const handleGenerateJD = async () => {
        setIsGenerating(true);
        try {
            const result = await GeminiService.generateJobDescription(newJob.title, newJob.department, newJob.keywords);
            setGeneratedJD(result);
        } catch (e) {
            alert("Failed to generate JD. Check API Key.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveJob = () => {
        if (!generatedJD) return;
        const job: JobPosting = {
            id: Date.now().toString(),
            title: newJob.title,
            department: newJob.department as Department,
            location: 'Remote',
            type: 'Full-time',
            description: generatedJD.description,
            requirements: generatedJD.requirements,
            postedDate: new Date().toISOString().split('T')[0],
            status: 'Open'
        };
        setJobs([job, ...jobs]);
        setIsModalOpen(false);
        setGeneratedJD(null);
        setNewJob({ title: '', department: 'Engineering', keywords: '' });
    };

    const handleScreenCandidate = async () => {
        if(!selectedJobIdForScreening || !screeningText) return;
        setIsScreening(true);
        const job = jobs.find(j => j.id === selectedJobIdForScreening);
        if(!job) return;

        try {
            const result = await GeminiService.screenCandidate("Candidate", screeningText, job.title);
            setScreeningResult(result);
        } catch(e) {
            alert("Screening failed.");
        } finally {
            setIsScreening(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Briefcase size={20} />
                    </div>
                    <h2 className="text-lg font-bold text-slate-800">Job Postings</h2>
                 </div>
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-md shadow-indigo-500/20 text-sm font-medium">
                    <Plus size={18} />
                    Post New Job
                 </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 space-y-4">
                    {jobs.map(job => (
                        <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Briefcase size={64} className="text-indigo-600 rotate-12" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                <Users size={12} /> {job.department}
                                            </span>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                <MapPin size={12} /> {job.location}
                                            </span>
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                                <Clock size={12} /> {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">{job.status}</span>
                                </div>
                                <p className="text-slate-600 text-sm mb-5 leading-relaxed line-clamp-2">{job.description}</p>
                                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                    <span className="text-xs font-medium text-slate-400">Posted {job.postedDate}</span>
                                    <div className="flex gap-2">
                                         <button 
                                            onClick={() => {
                                                setSelectedJobIdForScreening(job.id);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="text-sm font-medium text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
                                            <Sparkles size={16} /> Screen
                                         </button>
                                         <button className="text-sm font-medium text-slate-700 hover:bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg transition-colors">
                                            View Details
                                         </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* AI Screener Tool */}
                <div className="xl:col-span-1">
                    <div className="bg-slate-900 text-slate-200 p-6 rounded-2xl shadow-xl sticky top-6 border border-slate-800">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
                            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                                <Sparkles size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">AI Screener</h3>
                                <p className="text-xs text-slate-500">Resume Analysis Engine</p>
                            </div>
                        </div>
                        
                        {!selectedJobIdForScreening ? (
                            <div className="text-center py-12 px-4 border-2 border-dashed border-slate-800 rounded-xl">
                                <Briefcase className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                                <p className="text-sm text-slate-500">Select a job from the list to begin screening candidates.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                 <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wider block mb-1">Target Role</span>
                                    <span className="text-sm font-semibold text-white">{jobs.find(j => j.id === selectedJobIdForScreening)?.title}</span>
                                 </div>
                                 
                                 <div className="space-y-2">
                                    <label className="text-xs font-medium text-slate-400">Resume / Profile Summary</label>
                                    <textarea 
                                        className="w-full h-40 p-4 bg-slate-950 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-slate-300 placeholder-slate-600"
                                        placeholder="Paste candidate's resume text, skills, or LinkedIn summary here..."
                                        value={screeningText}
                                        onChange={(e) => setScreeningText(e.target.value)}
                                    />
                                 </div>
                                 
                                 <button 
                                    onClick={handleScreenCandidate}
                                    disabled={isScreening || !screeningText}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-900/50 flex justify-center items-center gap-2">
                                    {isScreening ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            Analyze Match <ChevronRight size={16} />
                                        </>
                                    )}
                                 </button>

                                 {screeningResult && (
                                     <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 mt-6 animate-in zoom-in-95 duration-300">
                                         <div className="flex justify-between items-end mb-4">
                                             <span className="text-sm font-medium text-slate-400">Fit Score</span>
                                             <span className={`text-3xl font-bold ${screeningResult.score > 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                                {screeningResult.score}%
                                             </span>
                                         </div>
                                         <div className="w-full bg-slate-700 h-2 rounded-full mb-4 overflow-hidden">
                                             <div 
                                                className={`h-full rounded-full transition-all duration-1000 ease-out ${screeningResult.score > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                                                style={{width: `${screeningResult.score}%`}}
                                             ></div>
                                         </div>
                                         <p className="text-sm text-slate-300 leading-relaxed p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                                            "{screeningResult.summary}"
                                         </p>
                                     </div>
                                 )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Job Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 animate-in zoom-in-95">
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-xl font-bold text-slate-900">Create New Job Posting</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Job Title</label>
                                    <input 
                                        type="text" 
                                        value={newJob.title}
                                        onChange={e => setNewJob({...newJob, title: e.target.value})}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                        placeholder="e.g. Product Manager"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</label>
                                    <div className="relative">
                                        <select 
                                            value={newJob.department}
                                            onChange={e => setNewJob({...newJob, department: e.target.value})}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none"
                                        >
                                            {DEPARTMENTS_LIST.map(d => <option key={d} value={d}>{d}</option>)}
                                        </select>
                                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Keywords for AI Generation</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. React, Node.js, Leadership, 5+ years exp"
                                    value={newJob.keywords}
                                    onChange={e => setNewJob({...newJob, keywords: e.target.value})}
                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none" 
                                />
                            </div>
                            
                            {!generatedJD ? (
                                <button 
                                    onClick={handleGenerateJD}
                                    disabled={!newJob.title || isGenerating}
                                    className="w-full py-4 bg-indigo-50 text-indigo-700 rounded-xl font-bold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 border border-indigo-200 border-dashed hover:border-solid">
                                    {isGenerating ? <span className="animate-spin">⏳</span> : <Sparkles size={18} />}
                                    Generate Description with Gemini AI
                                </button>
                            ) : (
                                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                                    <div className="p-4 bg-slate-100 border-b border-slate-200 flex justify-between items-center">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                            <Sparkles size={14} className="text-indigo-500" /> AI Draft
                                        </span>
                                        <button onClick={() => setGeneratedJD(null)} className="text-xs text-slate-500 hover:text-indigo-600 font-medium">Clear & Retry</button>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <p className="text-sm text-slate-700 leading-relaxed">{generatedJD.description}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 uppercase mb-2">Requirements</p>
                                            <ul className="space-y-2">
                                                {generatedJD.requirements.map((req, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"></span>
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-white border-t border-slate-200">
                                        <button onClick={handleSaveJob} className="w-full bg-indigo-600 text-white py-2.5 rounded-lg hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-500/20">
                                            Confirm & Post Job
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const PerformanceView = ({ employees }: { employees: Employee[] }) => {
    // ... [PerformanceView Content omitted, unchanged] ...
    const [selectedEmployee, setSelectedEmployee] = useState<string>(employees[0].id);
    const [notes, setNotes] = useState('');
    const [aiReview, setAiReview] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerateReview = async () => {
        if(!notes) return;
        setLoading(true);
        const emp = employees.find(e => e.id === selectedEmployee);
        try {
            const review = await GeminiService.polishPerformanceReview(notes, emp?.firstName || 'Employee', emp?.role || 'Role');
            setAiReview(review);
        } catch (e) {
            alert('Error generating review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-140px)]">
            <div className="flex flex-col gap-6 h-full">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><FileText size={18}/></div>
                        Draft Review
                    </h3>
                    
                    <div className="space-y-4 flex-1 flex flex-col">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Employee</label>
                            <div className="relative">
                                <select 
                                    value={selectedEmployee} 
                                    onChange={(e) => setSelectedEmployee(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none appearance-none"
                                >
                                    {employees.map(e => (
                                        <option key={e.id} value={e.id}>{e.firstName} {e.lastName} - {e.role}</option>
                                    ))}
                                </select>
                                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <div className="space-y-1.5 flex-1 flex flex-col">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Manager Notes & Feedback</label>
                            <textarea 
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter rough bullet points, achievements, and areas for improvement..."
                                className="w-full flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none leading-relaxed"
                            />
                        </div>

                        <button 
                            onClick={handleGenerateReview}
                            disabled={loading || !notes}
                            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 mt-2">
                            {loading ? <span className="animate-spin">⏳</span> : <Sparkles size={18} />}
                            Polish with AI
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                            <Award size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Formal Review</h3>
                            <p className="text-xs text-slate-500">AI-Enhanced Output</p>
                        </div>
                    </div>
                    {aiReview && <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Ready to Send</span>}
                </div>
                
                <div className="flex-1 bg-slate-50 rounded-xl p-8 border border-slate-100 relative overflow-y-auto">
                    {!aiReview ? (
                         <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                <Sparkles size={24} className="opacity-40" />
                            </div>
                            <p className="text-sm font-medium">Generated review will appear here</p>
                         </div>
                    ) : (
                        <div className="prose prose-slate prose-sm max-w-none text-slate-700 leading-7 animate-in fade-in duration-500">
                            {aiReview.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4">{paragraph}</p>
                            ))}
                            <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                                <div>
                                    <div className="h-2.5 w-24 bg-slate-200 rounded-full mb-1.5"></div>
                                    <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                {aiReview && (
                    <div className="mt-6 flex justify-end gap-3">
                         <button className="px-5 py-2.5 text-sm text-slate-600 hover:text-slate-900 font-medium hover:bg-slate-50 rounded-lg transition-colors">Copy to Clipboard</button>
                         <button className="px-5 py-2.5 text-sm bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium shadow-lg shadow-slate-900/10">Finalize & Save</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const OnboardingView = ({ employees }: { employees: Employee[] }) => {
    // ... [OnboardingView Content omitted, unchanged] ...
    const [onboardingRecords, setOnboardingRecords] = useState<OnboardingRecord[]>(MOCK_ONBOARDING);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>(MOCK_ONBOARDING[0].employeeId);

    const selectedRecord = onboardingRecords.find(r => r.employeeId === selectedEmployeeId);
    const selectedEmployee = employees.find(e => e.id === selectedEmployeeId);

    const handleToggleTask = (taskId: string) => {
        setOnboardingRecords(prev => prev.map(record => {
            if (record.employeeId === selectedEmployeeId) {
                return {
                    ...record,
                    tasks: record.tasks.map(t => 
                        t.id === taskId ? { ...t, completed: !t.completed } : t
                    )
                };
            }
            return record;
        }));
    };

    const getProgress = (record: OnboardingRecord) => {
        const completed = record.tasks.filter(t => t.completed).length;
        return Math.round((completed / record.tasks.length) * 100);
    };

    const groupedTasks = selectedRecord ? selectedRecord.tasks.reduce((acc, task) => {
        if (!acc[task.category]) acc[task.category] = [];
        acc[task.category].push(task);
        return acc;
    }, {} as Record<string, OnboardingTask[]>) : {};

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            {/* Sidebar List */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800">New Hires</h3>
                    <p className="text-xs text-slate-500 mt-1">Select an employee to view progress.</p>
                </div>
                <div className="overflow-y-auto flex-1 p-3 space-y-2">
                    {onboardingRecords.map(record => {
                        const emp = employees.find(e => e.id === record.employeeId);
                        const progress = getProgress(record);
                        const isSelected = record.employeeId === selectedEmployeeId;
                        
                        return (
                            <button 
                                key={record.employeeId}
                                onClick={() => setSelectedEmployeeId(record.employeeId)}
                                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center gap-3
                                    ${isSelected 
                                        ? 'bg-indigo-50 border-indigo-200 ring-1 ring-indigo-200' 
                                        : 'bg-white border-slate-100 hover:border-indigo-200 hover:bg-slate-50'}
                                `}
                            >
                                <div className="relative">
                                    <svg className="w-12 h-12 transform -rotate-90">
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
                                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" 
                                            strokeDasharray={125.6} 
                                            strokeDashoffset={125.6 - (progress / 100) * 125.6} 
                                            className={`${progress === 100 ? 'text-emerald-500' : 'text-indigo-600'} transition-all duration-1000 ease-out`} 
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                         <img src={emp?.avatar} className="w-8 h-8 rounded-full" alt="" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className={`font-bold text-sm ${isSelected ? 'text-indigo-900' : 'text-slate-700'}`}>{emp?.firstName} {emp?.lastName}</h4>
                                    <p className="text-xs text-slate-500 mb-1">{emp?.role}</p>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${progress === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                            {progress}% Complete
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Checklist Area */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden">
                {selectedRecord && selectedEmployee ? (
                    <>
                        <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/30">
                            <div className="flex items-center gap-4">
                                <img src={selectedEmployee.avatar} className="w-16 h-16 rounded-full ring-4 ring-white shadow-sm" alt="" />
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedEmployee.firstName}'s Onboarding</h2>
                                    <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                                        <Calendar size={14} /> Start Date: {selectedRecord.startDate}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-indigo-600">{getProgress(selectedRecord)}%</div>
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Progress</div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                            {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
                                <div key={category} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        {category === 'Paperwork' && <FileText size={16} />}
                                        {category === 'IT Setup' && <Users size={16} />} 
                                        {category}
                                        <div className="h-px bg-slate-100 flex-1 ml-2"></div>
                                    </h4>
                                    <div className="space-y-3">
                                        {categoryTasks.map(task => (
                                            <div 
                                                key={task.id} 
                                                onClick={() => handleToggleTask(task.id)}
                                                className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4
                                                    ${task.completed 
                                                        ? 'bg-slate-50 border-slate-200 opacity-70' 
                                                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'}
                                                `}
                                            >
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                                    ${task.completed ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 group-hover:border-indigo-400'}
                                                `}>
                                                    {task.completed && <CheckCircle2 size={14} className="text-white" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`font-medium transition-all ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                                                        {task.title}
                                                    </p>
                                                </div>
                                                {task.completed && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Done</span>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <GraduationCap size={48} className="mb-4 opacity-20" />
                        <p>Select an employee to view their checklist.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SettingsView = ({ fullData }: { fullData: any }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [isSaving, setIsSaving] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const logoInputRef = useRef<HTMLInputElement>(null);

    // Form States
    const [general, setGeneral] = useState({
        companyName: 'Nexus Innovations Inc.',
        email: 'support@nexus.inc',
        timezone: 'Pacific Time (US & Canada)',
        language: 'English (United States)',
        dateFormat: 'MM/DD/YYYY',
        logo: null as string | null
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        slackIntegration: false,
        weeklyDigest: true,
        newHireAlert: true
    });

    const [security, setSecurity] = useState({
        twoFactor: false,
        passwordExpiry: '90',
        sessionTimeout: '30'
    });

    const showSuccessToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            showSuccessToast();
        }, 1200);
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setGeneral({ ...general, logo: ev.target?.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleExportData = () => {
        const dataStr = JSON.stringify(fullData, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `nexus_hrms_export_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'data', label: 'Data Management', icon: Database },
    ];

    const notificationItems = [
        { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive daily summaries and urgent updates via email.' },
        { key: 'slackIntegration', label: 'Slack Integration', desc: 'Push notifications to your company Slack workspace.' },
        { key: 'newHireAlert', label: 'New Hire Alerts', desc: 'Get notified when a new employee completes onboarding.' },
        { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'A weekly summary of team performance and stats.' },
    ];

    return (
        <div className="grid grid-cols-12 gap-6 relative">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-8 right-8 z-50 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle2 size={20} className="text-emerald-400" />
                    <div>
                        <p className="font-bold text-sm">Settings Saved</p>
                        <p className="text-xs text-slate-400">Your changes have been updated successfully.</p>
                    </div>
                </div>
            )}

            {/* Sidebar Navigation */}
            <div className="col-span-12 md:col-span-3">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-6">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                        <h3 className="font-bold text-slate-800">System Settings</h3>
                    </div>
                    <nav className="p-2 space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                                    ${activeTab === tab.id 
                                        ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                                `}
                            >
                                <tab.icon size={18} className={activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'} />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content Area */}
            <div className="col-span-12 md:col-span-9 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[500px]">
                    {activeTab === 'general' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Company Profile</h3>
                                <p className="text-sm text-slate-500 mb-6">Manage your company's public information.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Company Name</label>
                                            <div className="relative">
                                                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input 
                                                    type="text" 
                                                    value={general.companyName}
                                                    onChange={e => setGeneral({...general, companyName: e.target.value})}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Support Email</label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                                <input 
                                                    type="email" 
                                                    value={general.email}
                                                    onChange={e => setGeneral({...general, email: e.target.value})}
                                                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Company Logo</label>
                                        <div className="flex items-start gap-6">
                                            {general.logo ? (
                                                <img src={general.logo} className="w-24 h-24 rounded-xl object-contain border border-slate-200 bg-slate-50" />
                                            ) : (
                                                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-indigo-500/20">
                                                    N
                                                </div>
                                            )}
                                            <div className="space-y-3">
                                                <input 
                                                    type="file" 
                                                    ref={logoInputRef} 
                                                    onChange={handleLogoUpload} 
                                                    className="hidden" 
                                                    accept="image/*"
                                                />
                                                <button 
                                                    onClick={() => logoInputRef.current?.click()}
                                                    className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                                                >
                                                    <Upload size={14} /> Change Logo
                                                </button>
                                                <p className="text-xs text-slate-500 leading-relaxed">
                                                    Upload your company logo.<br/>Recommended size: 200x200px.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="border-t border-slate-100 pt-8">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Regional Settings</h3>
                                <p className="text-sm text-slate-500 mb-6">Set your preferred language and date formats.</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Language</label>
                                        <div className="relative">
                                            <select 
                                                value={general.language}
                                                onChange={e => setGeneral({...general, language: e.target.value})}
                                                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none appearance-none cursor-pointer"
                                            >
                                                <option>English (United States)</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                            </select>
                                            <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Date Format</label>
                                        <div className="relative">
                                            <select 
                                                value={general.dateFormat}
                                                onChange={e => setGeneral({...general, dateFormat: e.target.value})}
                                                className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none appearance-none cursor-pointer"
                                            >
                                                <option>MM/DD/YYYY</option>
                                                <option>DD/MM/YYYY</option>
                                                <option>YYYY-MM-DD</option>
                                            </select>
                                            <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                         <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Notification Preferences</h3>
                                <p className="text-sm text-slate-500 mb-6">Control how you receive alerts and updates.</p>

                                <div className="space-y-4">
                                    {notificationItems.map((item) => (
                                        <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-800">{item.label}</h4>
                                                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                            </div>
                                            <button 
                                                onClick={() => setNotifications({ ...notifications, [item.key]: !(notifications as any)[item.key] })}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                                    (notifications as any)[item.key] ? 'bg-indigo-600' : 'bg-slate-300'
                                                }`}
                                            >
                                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                                                    (notifications as any)[item.key] ? 'translate-x-6' : 'translate-x-1'
                                                }`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                             <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Security Settings</h3>
                                <p className="text-sm text-slate-500 mb-6">Manage access and authentication protocols.</p>

                                <div className="space-y-6">
                                    <div className="p-5 border border-indigo-100 bg-indigo-50/50 rounded-xl flex justify-between items-center">
                                        <div className="flex gap-4 items-center">
                                            <div className="p-3 bg-white rounded-lg text-indigo-600 shadow-sm">
                                                <Lock size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">Two-Factor Authentication</h4>
                                                <p className="text-xs text-slate-500 mt-1">Require 2FA for all admin accounts.</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => setSecurity({...security, twoFactor: !security.twoFactor})}
                                            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                                                security.twoFactor 
                                                ? 'bg-emerald-100 text-emerald-700' 
                                                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            {security.twoFactor ? 'Enabled' : 'Enable'}
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password Expiry</label>
                                            <div className="relative">
                                                <select 
                                                    value={security.passwordExpiry}
                                                    onChange={(e) => setSecurity({...security, passwordExpiry: e.target.value})}
                                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none appearance-none cursor-pointer"
                                                >
                                                    <option value="30">Every 30 Days</option>
                                                    <option value="60">Every 60 Days</option>
                                                    <option value="90">Every 90 Days</option>
                                                    <option value="never">Never</option>
                                                </select>
                                                <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Session Timeout</label>
                                            <div className="relative">
                                                <select 
                                                    value={security.sessionTimeout}
                                                    onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                                                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none appearance-none cursor-pointer"
                                                >
                                                    <option value="15">15 Minutes</option>
                                                    <option value="30">30 Minutes</option>
                                                    <option value="60">1 Hour</option>
                                                </select>
                                                <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100">
                                         <h4 className="text-sm font-bold text-slate-800 mb-4">Active Sessions</h4>
                                         <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                                             <div className="flex items-center gap-3">
                                                 <Globe size={18} className="text-slate-400" />
                                                 <div>
                                                     <p className="text-sm font-medium text-slate-700">Chrome on MacOS (Current)</p>
                                                     <p className="text-xs text-slate-500">San Francisco, USA • 192.168.1.1</p>
                                                 </div>
                                             </div>
                                             <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active Now</span>
                                         </div>
                                    </div>
                                </div>
                             </div>
                        </div>
                    )}

                    {activeTab === 'data' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Data Management</h3>
                                <p className="text-sm text-slate-500 mb-6">Export or manage system data.</p>
                                
                                <div className="space-y-4">
                                    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-slate-800 text-sm">Export All System Data</h4>
                                            <p className="text-xs text-slate-500 mt-1">Download a JSON file containing all employees, payroll, and tasks.</p>
                                        </div>
                                        <button 
                                            onClick={handleExportData}
                                            className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-100 hover:text-indigo-600 transition-colors flex items-center gap-2"
                                        >
                                            <Download size={16} /> Export JSON
                                        </button>
                                    </div>

                                    <div className="p-6 bg-red-50 border border-red-100 rounded-xl flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-red-900 text-sm">System Reset</h4>
                                            <p className="text-xs text-red-600 mt-1">Permanently delete all data and reset to factory defaults.</p>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                if(confirm("Are you SURE? This will wipe all data. This is just a demo alert.")) {
                                                    alert("Data reset simulation complete.");
                                                }
                                            }}
                                            className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition-colors"
                                        >
                                            Reset Data
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="mt-12 pt-6 border-t border-slate-100 flex justify-end gap-3">
                        <button className="px-6 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 disabled:opacity-70"
                        >
                            {isSaving ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} /> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [jobs, setJobs] = useState<JobPosting[]>(MOCK_JOBS);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(MOCK_LEAVES);
  const [payroll, setPayroll] = useState<PayrollRecord[]>(MOCK_PAYROLL);

  const titles: Record<ViewState, string> = {
      dashboard: 'Executive Dashboard',
      employees: 'Employee Directory',
      recruitment: 'Talent Acquisition',
      performance: 'Performance Reviews',
      orgchart: 'Organization Hierarchy',
      tasks: 'Task Management',
      attendance: 'Attendance & Leave',
      payroll: 'Payroll Management',
      onboarding: 'Onboarding Checklist',
      settings: 'System Settings'
  };

  const handleLogin = (e: React.FormEvent) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard'); // Reset view on logout
  };

  if (!isAuthenticated) {
      return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} onSignOut={handleLogout} />
      
      <main className="flex-1 p-8 overflow-y-auto h-screen scroll-smooth">
        <header className="mb-8 flex justify-between items-center bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/50 sticky top-4 z-10 shadow-sm">
            <div className="pl-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{titles[currentView]}</h1>
                <p className="text-slate-500 text-sm mt-0.5">Manage your organization efficiently.</p>
            </div>
            <div className="flex items-center gap-4 pr-2">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                     <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-medium text-slate-600">System Online</span>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                    <Calendar size={16} />
                    <span className="text-sm font-medium text-slate-700">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </div>
        </header>

        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {currentView === 'dashboard' && <DashboardStats employees={employees} jobs={jobs} />}
            {currentView === 'employees' && <EmployeeList employees={employees} setEmployees={setEmployees} tasks={tasks} />}
            {currentView === 'recruitment' && <RecruitmentView jobs={jobs} setJobs={setJobs} />}
            {currentView === 'performance' && <PerformanceView employees={employees} />}
            {currentView === 'tasks' && <TaskManagementView employees={employees} tasks={tasks} setTasks={setTasks} />}
            {currentView === 'attendance' && <AttendanceView employees={employees} attendance={attendance} leaves={leaves} setLeaves={setLeaves} />}
            {currentView === 'payroll' && <PayrollView employees={employees} payroll={payroll} setPayroll={setPayroll} />}
            {currentView === 'onboarding' && <OnboardingView employees={employees} />}
            {currentView === 'settings' && <SettingsView fullData={{ employees, jobs, tasks, attendance, leaves, payroll }} />}
            {currentView === 'orgchart' && (
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 h-[700px] overflow-hidden">
                    <OrgChart employees={employees} />
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;