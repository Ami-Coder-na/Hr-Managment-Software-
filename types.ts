import React from 'react';

export enum Department {
    ENGINEERING = 'Engineering',
    HR = 'Human Resources',
    SALES = 'Sales',
    MARKETING = 'Marketing',
    PRODUCT = 'Product',
    DESIGN = 'Design'
  }
  
  export enum EmployeeStatus {
    ACTIVE = 'Active',
    ON_LEAVE = 'On Leave',
    TERMINATED = 'Terminated'
  }
  
  export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    department: Department;
    joinDate: string;
    status: EmployeeStatus;
    avatar: string;
    managerId?: string; // For Org Chart
  }
  
  export interface JobPosting {
    id: string;
    title: string;
    department: Department;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract';
    description: string;
    requirements: string[];
    postedDate: string;
    status: 'Open' | 'Closed' | 'Draft';
  }
  
  export interface Candidate {
    id: string;
    name: string;
    email: string;
    appliedFor: string; // Job ID
    status: 'New' | 'Screening' | 'Interview' | 'Offer' | 'Rejected';
    matchScore?: number; // AI Score
    summary?: string; // AI Summary
  }
  
  export interface LeaveRequest {
    id: string;
    employeeId: string;
    type: 'Vacation' | 'Sick' | 'Personal';
    startDate: string;
    endDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    reason: string;
  }

  export interface AttendanceRecord {
    id: string;
    employeeId: string;
    date: string;
    checkIn: string; // HH:mm
    checkOut?: string; // HH:mm
    status: 'Present' | 'Absent' | 'Late' | 'Half Day';
  }

  export interface PayrollRecord {
    id: string;
    employeeId: string;
    month: string;
    year: number;
    basicSalary: number;
    allowances: number;
    deductions: number;
    netSalary: number;
    status: 'Paid' | 'Pending' | 'Processing';
    paymentDate?: string;
    paymentMethod?: 'Bank Transfer' | 'Check' | 'Cash';
  }
  
  export interface PerformanceReview {
    id: string;
    employeeId: string;
    reviewDate: string;
    reviewer: string;
    rating: number; // 1-5
    feedback: string;
    goals: string[];
  }

  export type TaskPriority = 'Low' | 'Medium' | 'High';
  export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

  export interface Task {
    id: string;
    title: string;
    description: string;
    assigneeId: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
  }

  export type OnboardingCategory = 'Paperwork' | 'IT Setup' | 'Training' | 'Orientation' | 'Policy';

  export interface OnboardingTask {
    id: string;
    title: string;
    category: OnboardingCategory;
    completed: boolean;
  }

  export interface OnboardingRecord {
    employeeId: string;
    startDate: string;
    tasks: OnboardingTask[];
  }
  
  export interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<any>;
  }

  export type ViewState = 'dashboard' | 'employees' | 'recruitment' | 'performance' | 'orgchart' | 'tasks' | 'attendance' | 'payroll' | 'onboarding';