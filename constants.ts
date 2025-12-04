import { Employee, Department, EmployeeStatus, JobPosting, Task, AttendanceRecord, LeaveRequest, PayrollRecord, OnboardingRecord } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Connor',
    email: 'sarah.c@nexus.com',
    role: 'CEO',
    department: Department.PRODUCT,
    joinDate: '2020-01-15',
    status: EmployeeStatus.ACTIVE,
    avatar: 'https://picsum.photos/200/200?random=1',
  },
  {
    id: '2',
    firstName: 'James',
    lastName: 'Cameron',
    email: 'james.c@nexus.com',
    role: 'VP of Engineering',
    department: Department.ENGINEERING,
    joinDate: '2020-02-01',
    status: EmployeeStatus.ACTIVE,
    avatar: 'https://picsum.photos/200/200?random=2',
    managerId: '1'
  },
  {
    id: '3',
    firstName: 'Ellen',
    lastName: 'Ripley',
    email: 'ellen.r@nexus.com',
    role: 'Senior Software Engineer',
    department: Department.ENGINEERING,
    joinDate: '2021-03-10',
    status: EmployeeStatus.ACTIVE,
    avatar: 'https://picsum.photos/200/200?random=3',
    managerId: '2'
  },
  {
    id: '4',
    firstName: 'Kyle',
    lastName: 'Reese',
    email: 'kyle.r@nexus.com',
    role: 'Product Manager',
    department: Department.PRODUCT,
    joinDate: '2021-06-15',
    status: EmployeeStatus.ON_LEAVE,
    avatar: 'https://picsum.photos/200/200?random=4',
    managerId: '1'
  },
  {
    id: '5',
    firstName: 'Jean',
    lastName: 'Picard',
    email: 'jean.p@nexus.com',
    role: 'HR Director',
    department: Department.HR,
    joinDate: '2020-05-20',
    status: EmployeeStatus.ACTIVE,
    avatar: 'https://picsum.photos/200/200?random=5',
    managerId: '1'
  },
  {
    id: '6',
    firstName: 'Geordi',
    lastName: 'La Forge',
    email: 'geordi.l@nexus.com',
    role: 'Frontend Developer',
    department: Department.ENGINEERING,
    joinDate: '2022-01-10',
    status: EmployeeStatus.ACTIVE,
    avatar: 'https://picsum.photos/200/200?random=6',
    managerId: '2'
  }
];

export const MOCK_JOBS: JobPosting[] = [
  {
    id: 'j1',
    title: 'Senior React Developer',
    department: Department.ENGINEERING,
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for an experienced React developer to lead our frontend team.',
    requirements: ['React', 'TypeScript', 'Tailwind', '5+ years experience'],
    postedDate: '2023-10-01',
    status: 'Open'
  },
  {
    id: 'j2',
    title: 'HR Specialist',
    department: Department.HR,
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Manage employee relations and benefits.',
    requirements: ['HR Certification', 'Communication Skills', '3+ years experience'],
    postedDate: '2023-10-05',
    status: 'Open'
  }
];

export const MOCK_TASKS: Task[] = [
    {
        id: 't1',
        title: 'Q4 Product Roadmap',
        description: 'Finalize the product strategy for the upcoming quarter.',
        assigneeId: '1',
        status: 'In Progress',
        priority: 'High',
        dueDate: '2023-11-15'
    },
    {
        id: 't2',
        title: 'Update Employee Handbook',
        description: 'Revise policies regarding remote work and benefits.',
        assigneeId: '5',
        status: 'To Do',
        priority: 'Medium',
        dueDate: '2023-11-20'
    },
    {
        id: 't3',
        title: 'Fix Login Bug',
        description: 'Resolve the issue where users are logged out unexpectedly.',
        assigneeId: '3',
        status: 'In Progress',
        priority: 'High',
        dueDate: '2023-11-01'
    },
    {
        id: 't4',
        title: 'Design New Landing Page',
        description: 'Create mockups for the marketing website refresh.',
        assigneeId: '6',
        status: 'Done',
        priority: 'Medium',
        dueDate: '2023-10-25'
    }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
    { id: 'a1', employeeId: '1', date: '2023-10-25', checkIn: '08:55', checkOut: '17:30', status: 'Present' },
    { id: 'a2', employeeId: '2', date: '2023-10-25', checkIn: '09:10', checkOut: '18:00', status: 'Late' },
    { id: 'a3', employeeId: '3', date: '2023-10-25', checkIn: '09:00', checkOut: '17:00', status: 'Present' },
    { id: 'a4', employeeId: '4', date: '2023-10-25', checkIn: '', status: 'Absent' },
    { id: 'a5', employeeId: '5', date: '2023-10-25', checkIn: '08:45', checkOut: '17:15', status: 'Present' },
    { id: 'a6', employeeId: '6', date: '2023-10-25', checkIn: '09:30', checkOut: '18:30', status: 'Late' },
];

export const MOCK_LEAVES: LeaveRequest[] = [
    { id: 'l1', employeeId: '4', type: 'Sick', startDate: '2023-10-25', endDate: '2023-10-26', status: 'Approved', reason: 'Flu' },
    { id: 'l2', employeeId: '6', type: 'Vacation', startDate: '2023-11-20', endDate: '2023-11-25', status: 'Pending', reason: 'Family trip' },
];

export const MOCK_PAYROLL: PayrollRecord[] = [
    // October
    { id: 'p1', employeeId: '1', month: 'October', year: 2023, basicSalary: 12000, allowances: 2000, deductions: 3000, netSalary: 11000, status: 'Paid', paymentDate: '2023-10-30', paymentMethod: 'Bank Transfer' },
    { id: 'p2', employeeId: '2', month: 'October', year: 2023, basicSalary: 10000, allowances: 1500, deductions: 2500, netSalary: 9000, status: 'Paid', paymentDate: '2023-10-30', paymentMethod: 'Bank Transfer' },
    { id: 'p3', employeeId: '3', month: 'October', year: 2023, basicSalary: 8500, allowances: 1000, deductions: 2000, netSalary: 7500, status: 'Pending' },
    { id: 'p4', employeeId: '4', month: 'October', year: 2023, basicSalary: 9000, allowances: 1200, deductions: 2200, netSalary: 8000, status: 'Pending' },
    { id: 'p5', employeeId: '5', month: 'October', year: 2023, basicSalary: 8000, allowances: 1000, deductions: 1800, netSalary: 7200, status: 'Processing' },
    { id: 'p6', employeeId: '6', month: 'October', year: 2023, basicSalary: 7500, allowances: 800, deductions: 1500, netSalary: 6800, status: 'Pending' },
    // September History
    { id: 'p1_sep', employeeId: '1', month: 'September', year: 2023, basicSalary: 12000, allowances: 2000, deductions: 3000, netSalary: 11000, status: 'Paid', paymentDate: '2023-09-30', paymentMethod: 'Bank Transfer' },
    { id: 'p2_sep', employeeId: '2', month: 'September', year: 2023, basicSalary: 10000, allowances: 1500, deductions: 2500, netSalary: 9000, status: 'Paid', paymentDate: '2023-09-30', paymentMethod: 'Bank Transfer' },
    { id: 'p3_sep', employeeId: '3', month: 'September', year: 2023, basicSalary: 8500, allowances: 1000, deductions: 2000, netSalary: 7500, status: 'Paid', paymentDate: '2023-09-30', paymentMethod: 'Check' },
];

export const MOCK_ONBOARDING: OnboardingRecord[] = [
    {
        employeeId: '6', // Geordi
        startDate: '2023-11-01',
        tasks: [
            { id: 'o1', title: 'Sign Employment Contract', category: 'Paperwork', completed: true },
            { id: 'o2', title: 'Submit Tax Forms', category: 'Paperwork', completed: true },
            { id: 'o3', title: 'Setup Company Email', category: 'IT Setup', completed: true },
            { id: 'o4', title: 'Collect Laptop & Badge', category: 'IT Setup', completed: false },
            { id: 'o5', title: 'Join Slack Channels', category: 'IT Setup', completed: true },
            { id: 'o6', title: 'Company Orientation', category: 'Orientation', completed: false },
            { id: 'o7', title: 'Code of Conduct Training', category: 'Policy', completed: false },
            { id: 'o8', title: 'Meet the Team', category: 'Orientation', completed: false },
        ]
    },
    {
        employeeId: '3', // Ellen
        startDate: '2023-10-15',
        tasks: [
            { id: 'o1', title: 'Sign Employment Contract', category: 'Paperwork', completed: true },
            { id: 'o2', title: 'Submit Tax Forms', category: 'Paperwork', completed: true },
            { id: 'o3', title: 'Setup Company Email', category: 'IT Setup', completed: true },
            { id: 'o4', title: 'Collect Laptop & Badge', category: 'IT Setup', completed: true },
            { id: 'o5', title: 'Join Slack Channels', category: 'IT Setup', completed: true },
            { id: 'o6', title: 'Company Orientation', category: 'Orientation', completed: true },
            { id: 'o7', title: 'Code of Conduct Training', category: 'Policy', completed: true },
            { id: 'o8', title: 'Meet the Team', category: 'Orientation', completed: true },
        ]
    },
     {
        employeeId: '4', // Kyle
        startDate: '2023-11-10',
        tasks: [
            { id: 'o1', title: 'Sign Employment Contract', category: 'Paperwork', completed: false },
            { id: 'o2', title: 'Submit Tax Forms', category: 'Paperwork', completed: false },
            { id: 'o3', title: 'Setup Company Email', category: 'IT Setup', completed: false },
            { id: 'o4', title: 'Collect Laptop & Badge', category: 'IT Setup', completed: false },
        ]
    }
];

export const DEPARTMENTS_LIST = Object.values(Department);