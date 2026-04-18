import { Menu, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export const Appbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    const isLoggedIn = !!localStorage.getItem("authToken");
    const user = localStorage.getItem("userRole");

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("studentId");
        localStorage.removeItem("jwt");
        navigate("/guest");
    };

    const handleBrandClick = () => {
        if (isLoggedIn) {
            if (user === "STUDENT") navigate("/student/home");
            else if (user === "TEACHER") navigate("/teacher/home");
        } else {
            navigate("/guest");
        }
    };

    const isGuest = location.pathname === "/guest";

    return (
        <header className="w-full bg-gradient-to-r from-[#2E3A59] to-[#1E293B] text-white px-6 py-4 shadow-md flex items-center justify-between sticky top-0 z-50">
            {/* Logo/Brand */}
            <button
                onClick={handleBrandClick}
                className="text-2xl font-bold tracking-wide hover:text-[#93C5FD] transition cursor-pointer"
            >
                Code<span className="text-[#3B82F6]">Arena</span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
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
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                        title="Logout"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="md:hidden"
                aria-label="Toggle menu"
                title="Toggle menu"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Mobile Dropdown */}
            {showMenu && (
                <div className="absolute top-16 right-6 bg-[#1E293B] rounded-lg shadow-lg p-4 space-y-2 md:hidden">
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
                        <button
                            onClick={() => {
                                handleLogout();
                                setShowMenu(false);
                            }}
                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};