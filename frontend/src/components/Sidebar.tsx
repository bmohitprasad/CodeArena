import React, { useState } from "react";
import {
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  BookOpen,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export interface SidebarProps {
  user: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useTheme();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.clear(); // Cleans up all auth tokens at once
    navigate("/guest");
  };

  /**
   * THEME TOKENS
   * Sidebar should be solid (not gradient) to provide stability.
   */
  const sidebarBg = darkMode 
    ? "bg-[#0F172A] border-slate-800" 
    : "bg-white border-slate-200";

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } ${sidebarBg} border-r px-4 py-6 shadow-sm transition-all duration-300 relative flex flex-col justify-between h-[calc(100vh-64px)] sticky top-16`}
    >
      {/* Toggle Button - Positioned on the border */}
      <button
        onClick={toggleSidebar}
        className={`absolute -right-3 top-6 rounded-full p-1 shadow-md border transition-colors ${
          darkMode 
            ? "bg-[#1E293B] border-slate-700 text-slate-300 hover:text-white" 
            : "bg-white border-slate-200 text-slate-600 hover:text-blue-600"
        }`}
        title="Toggle sidebar"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Navigation Links */}
      <div className="space-y-2">
        <SidebarItem 
          icon={<Home size={22} />} 
          label="Classes" 
          to={`/${user}/classes`} 
          isOpen={isOpen} 
          isActive={location.pathname.includes('classes')}
        />
        <SidebarItem 
          icon={<BookOpen size={22} />} 
          label="Assignments" 
          to={`/${user}/assignments`} 
          isOpen={isOpen} 
          isActive={location.pathname.includes('assignments')}
        />
        <SidebarItem 
          icon={<User size={22} />} 
          label="Profile" 
          to={`/${user}/profile`} 
          isOpen={isOpen} 
          isActive={location.pathname.includes('profile')}
        />
        <SidebarItem 
          icon={<Settings size={22} />} 
          label="Settings" 
          to={`/${user}/settings`} 
          isOpen={isOpen} 
          isActive={location.pathname.includes('settings')}
        />
      </div>

      {/* Logout Section */}
      <div className={`pt-4 border-t ${darkMode ? "border-slate-800" : "border-slate-100"}`}>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 w-full ${
            darkMode 
              ? "text-red-400 hover:bg-red-500/10" 
              : "text-red-600 hover:bg-red-50"
          }`}
          title="Logout"
        >
          <LogOut size={22} />
          {isOpen && <span className="font-semibold">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

interface ItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isOpen: boolean;
  isActive: boolean;
}

const SidebarItem = ({ icon, label, to, isOpen, isActive }: ItemProps) => {
  const { darkMode } = useTheme();

  const activeStyles = isActive 
    ? (darkMode ? "bg-blue-600/20 text-blue-400" : "bg-blue-50 text-blue-600")
    : (darkMode ? "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900");

  return (
    <Link
      to={to}
      className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group ${activeStyles}`}
      title={label}
    >
      <div className={`${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`}>
        {icon}
      </div>
      {isOpen && <span className="font-semibold tracking-wide">{label}</span>}
      
      {/* Active Indicator Dot */}
      {isActive && isOpen && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
      )}
    </Link>
  );
};