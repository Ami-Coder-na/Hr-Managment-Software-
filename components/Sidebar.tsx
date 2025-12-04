import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Award, 
  Network,
  LogOut,
  Settings,
  Menu,
  CheckSquare,
  CalendarClock,
  Banknote,
  GraduationCap
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'attendance', label: 'Attendance & Leave', icon: CalendarClock },
    { id: 'tasks', label: 'Task Management', icon: CheckSquare },
    { id: 'payroll', label: 'Payroll', icon: Banknote },
    { id: 'onboarding', label: 'Onboarding', icon: GraduationCap },
    { id: 'recruitment', label: 'Recruitment', icon: Briefcase },
    { id: 'performance', label: 'Performance', icon: Award },
    { id: 'orgchart', label: 'Org Chart', icon: Network },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col h-screen sticky top-0 border-r border-slate-800/50 shadow-xl z-20">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            N
        </div>
        <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-none">Nexus</h1>
            <span className="text-xs font-medium text-indigo-400 tracking-wider uppercase">HR System</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 mt-4">Menu</p>
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400' 
                  : 'hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full" />
              )}
              <item.icon size={20} className={isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-slate-800/50 space-y-1 mt-auto">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-colors">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
        </button>
        
        <div className="mt-4 flex items-center gap-3 px-3 py-3 bg-slate-900/50 rounded-xl border border-slate-800/50">
            <div className="relative">
                <img src="https://picsum.photos/id/64/100/100" className="w-9 h-9 rounded-full border border-slate-700" alt="Admin" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">Alex Morgan</p>
                <p className="text-xs text-slate-500 truncate">Senior Admin</p>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;