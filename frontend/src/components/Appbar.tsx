import { Menu, LogOut, Moon, Sun, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const Appbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { darkMode, toggleDarkMode } = useTheme();

    const isLoggedIn: boolean = !!localStorage.getItem("authToken") || !!localStorage.getItem("jwt");
    const user: string | null = localStorage.getItem("userRole")?.toLowerCase() || (localStorage.getItem("jwt") ? "student" : null);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("studentId");
        localStorage.removeItem("jwt");
        localStorage.removeItem("teacherId");
        navigate("/guest");
    };

    const handleBrandClick = () => {
        if (isLoggedIn) {
            if (user === "student" || localStorage.getItem("jwt")) navigate("/student/classes");
            else if (user === "teacher") navigate("/teacher/classes");
        } else {
            navigate("/guest");
        }
    };

    const isGuest = location.pathname === "/guest";

    const bgClass = darkMode 
        ? "bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border-b border-slate-700" 
        : "bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#2563EB] border-b border-blue-700";

    const dropdownBg = darkMode
        ? "bg-[#1E293B] border-slate-700"
        : "bg-white border-slate-200 text-slate-900";

    return (
        <header className={`w-full ${bgClass} text-white px-6 py-3 shadow-xl flex items-center justify-between sticky top-0 z-50 transition-all duration-300`}>
            {/* Logo/Brand */}
            <button
                onClick={handleBrandClick}
                className="text-2xl font-bold tracking-tight hover:opacity-80 transition cursor-pointer flex items-center gap-2"
            >
                {/* <div className="bg-white p-1 rounded-lg">
                    <span className="text-[#2563EB] font-black">C</span>
                </div> */}
                <span>Code<span className={darkMode ? "text-[#3B82F6]" : "text-blue-100"}>Arena</span></span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
                <button
                    onClick={toggleDarkMode}
                    title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors border border-white/10"
                >
                    {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-100" />}
                </button>

                <div className="h-6 w-[1px] bg-white/20 mx-2" />

                {isGuest && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => navigate("/student/auth")}
                            className="px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition"
                        >
                            Student Login
                        </button>
                        <button
                            onClick={() => navigate("/teacher/auth")}
                            className="px-4 py-2 text-sm font-bold bg-white text-[#2563EB] rounded-lg hover:bg-blue-50 transition shadow-md"
                        >
                            Teacher Portal
                        </button>
                    </div>
                )}
                
                {isLoggedIn && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(`/${user || "student"}/profile`)}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-lg transition"
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-500/10 hover:bg-red-500/20 text-red-200 rounded-lg transition border border-red-500/20"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex md:hidden items-center gap-2">
                <button 
                    onClick={toggleDarkMode} 
                    className="p-2"
                    title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-white" />}
                </button>
                <button 
                    onClick={() => setShowMenu(!showMenu)} 
                    className="p-2"
                    title="Toggle menu"
                    aria-label="Toggle menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Dropdown */}
            {showMenu && (
                <div className={`absolute top-16 right-6 w-56 rounded-xl shadow-2xl p-2 md:hidden border ${dropdownBg} animate-in fade-in zoom-in duration-200`}>
                   {/* Mobile links go here - ensure text colors match dropdownBg */}
                   {isLoggedIn ? (
                       <>
                           <button 
                                onClick={() => {navigate(`/${user}/profile`); setShowMenu(false)}}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}
                            >
                                <User className="h-4 w-4" /> Profile
                           </button>
                           <button 
                                onClick={() => { handleLogout(); setShowMenu(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 ${darkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
                            >
                                <LogOut className="h-4 w-4" /> Logout
                           </button>
                       </>
                   ) : (
                       <>
                           <button 
                                onClick={() => { navigate("/student/auth"); setShowMenu(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}
                            >
                                Student Login
                           </button>
                           <button 
                                onClick={() => { navigate("/teacher/auth"); setShowMenu(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}
                            >
                                Teacher Portal
                           </button>
                       </>
                   )}
                </div>
            )}
        </header>
    );
};