import { Menu, LogOut, Moon, Sun, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const Appbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : false;
    });

    const isLoggedIn = !!localStorage.getItem("authToken") || !!localStorage.getItem("jwt");
    const user = localStorage.getItem("userRole") || (localStorage.getItem("jwt") ? "student" : null);

    // Apply dark mode to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

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
        ? "bg-gradient-to-r from-[#1a1a2e] to-[#16213e]" 
        : "bg-gradient-to-r from-[#2E3A59] to-[#1E293B]";

    return (
        <header className={`w-full ${bgClass} text-white px-6 py-4 shadow-lg flex items-center justify-between sticky top-0 z-50 transition-colors duration-300`}>
            {/* Logo/Brand */}
            <button
                onClick={handleBrandClick}
                className="text-2xl font-bold tracking-wide hover:text-[#93C5FD] transition cursor-pointer"
                title="Go to home"
            >
                Code<span className="text-[#3B82F6]">Arena</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 hover:bg-white/10 rounded-lg transition"
                    title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {isGuest && (
                    <>
                        <button
                            onClick={() => navigate("/student/auth")}
                            className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                        >
                            Student Login
                        </button>
                        <button
                            onClick={() => navigate("/teacher/auth")}
                            className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition"
                        >
                            Teacher Login
                        </button>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <button
                            onClick={() => navigate(`/${user || "student"}/profile`)}
                            className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                            title="View profile"
                        >
                            <User className="h-4 w-4" />
                            Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-white hover:bg-red-500/20 rounded-lg transition"
                            title="Logout"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="flex md:hidden items-center gap-2">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 hover:bg-white/10 rounded-lg transition"
                    title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-2 hover:bg-white/10 rounded-lg transition"
                    aria-label="Toggle menu"
                    title="Toggle menu"
                >
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            {/* Mobile Dropdown */}
            {showMenu && (
                <div className={`absolute top-16 right-6 rounded-lg shadow-lg p-4 space-y-2 md:hidden border border-white/10 ${
                    darkMode 
                        ? "bg-[#1a1a2e]" 
                        : "bg-[#2a3a52]"
                }`}>
                    {isGuest && (
                        <>
                            <button
                                onClick={() => {
                                    navigate("/student/auth");
                                    setShowMenu(false);
                                }}
                                className="w-full text-left px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                            >
                                Student Login
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/teacher/auth");
                                    setShowMenu(false);
                                }}
                                className="w-full text-left px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition"
                            >
                                Teacher Login
                            </button>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <button
                                onClick={() => {
                                    navigate(`/${user || "student"}/profile`);
                                    setShowMenu(false);
                                }}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                            >
                                <User className="h-4 w-4" />
                                Profile
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setShowMenu(false);
                                }}
                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-white hover:bg-red-500/20 rounded-lg transition"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </header>
    );
};
