import { useState } from "react";
import {
  // Calendar,
  Home,
  // BookOpenCheck,
  // ClipboardList,
  // Archive,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
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
    navigate(`/${user}/home`);
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-white border-r border-[#E2E8F0] px-4 py-6 space-y-8 shadow-sm transition-all duration-300 relative flex flex-col justify-between`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100 transition"
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Sidebar Links */}
      <div className="space-y-4">
        <SidebarItem icon={<Home />} label="Home" to={`/${user}/classes`} isOpen={isOpen} />
        {/* <SidebarItem icon={<Calendar />} label="Calendar" to="/admin/classes" isOpen={isOpen} />
        <SidebarItem icon={<BookOpenCheck />} label="Enrolled" to="/admin/classes" isOpen={isOpen} />
        <SidebarItem icon={<ClipboardList />} label="To do" to="/admin/classes" isOpen={isOpen} />
        <SidebarItem icon={<Archive />} label="Archived classes" to="/admin/classes" isOpen={isOpen} /> */}
        <SidebarItem icon={<Settings />} label="Settings" to={`/${user}/settings`}isOpen={isOpen} />
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-100 hover:text-red-700 transition"
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
    className="flex items-center gap-3 px-3 py-2 rounded-md text-[#1E293B] hover:bg-[#E2E8F0] hover:text-[#2E3A59] transition"
  >
    {icon}
    {isOpen && <span className="font-medium">{label}</span>}
  </Link>
);
