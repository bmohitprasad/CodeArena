import { useState } from "react";
import {
  Home,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  BookOpen,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export interface SidebarProps {
  user: string
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("studentId");
    localStorage.removeItem("teacherId");
    navigate("/guest");
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-white dark:bg-[#1a1a2e] border-r border-[#E2E8F0] dark:border-[#333] px-4 py-6 space-y-8 shadow-sm transition-all duration-300 relative flex flex-col justify-between`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white dark:bg-[#2a2a3e] border border-gray-300 dark:border-[#444] rounded-full p-1 shadow hover:bg-gray-100 dark:hover:bg-[#3a3a4e] transition"
        title="Toggle sidebar"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar Links */}
      <div className="space-y-4">
        <SidebarItem icon={<Home />} label="Classes" to={`/${user}/classes`} isOpen={isOpen} />
        <SidebarItem icon={<BookOpen />} label="Assignments" to={`/${user}/assignments`} isOpen={isOpen} />
        <SidebarItem icon={<User />} label="Profile" to={`/${user}/profile`} isOpen={isOpen} />
        <SidebarItem icon={<Settings />} label="Settings" to={`/${user}/settings`} isOpen={isOpen} />
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 transition w-full"
        title="Logout"
      >
        <LogOut />
        {isOpen && <span className="font-medium">Logout</span>}
      </button>
    </aside>
  );
};

const SidebarItem = ({
  icon,
  label,
  to,
  isOpen,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  isOpen: boolean;
}) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-3 py-2 rounded-md text-[#1E293B] dark:text-[#E2E8F0] hover:bg-[#E2E8F0] dark:hover:bg-[#2a2a3e] hover:text-[#2E3A59] dark:hover:text-white transition"
    title={label}
  >
    {icon}
    {isOpen && <span className="font-medium">{label}</span>}
  </Link>
);
