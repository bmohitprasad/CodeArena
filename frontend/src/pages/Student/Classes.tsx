import { useState } from "react";
import { Appbar } from "../../components/Appbar";
import { Classcard } from "../../components/Classcard";
import { ClasscardSkeleton } from "../../components/skeleton/ClasscardSkeleton";
import { studentClasses } from "../../hooks";
import { Sidebar } from "../../components/Sidebar";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useTheme } from "../../context/ThemeContext";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export const StudentClasses = () => {
    const [joinCode, setJoinCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);
    const { darkMode } = useTheme();
    
    const student_id = localStorage.getItem("studentId");
    const { loadingClasses, classes } = studentClasses({ student_id: Number(student_id) });
    const pageBg = darkMode ? "bg-[#1E293B]" : "bg-gray-50";
    const subTextColor = darkMode ? "text-slate-400" : "text-slate-700";

    const handleJoinClass = async () => {
        if (!joinCode.trim() || isJoining) return;
        try {
            setIsJoining(true);
            await axios.post(
                `${BACKEND_URL}/api/v1/student/join`,
                { joinCode: joinCode, roll_num: Number(student_id) },
                { headers: { Authorization: localStorage.getItem("jwt") || "" } }
            );
            setJoinCode("");
            window.location.reload(); 
        } catch (err) {
            console.error("Failed to join class:", err);
            alert("Failed to join class. Please check the code.");
            setIsJoining(false);
        }
    };

    return (
        <div className={`min-h-screen ${pageBg} flex flex-col transition-colors duration-300`}>
            <Appbar />
            <div className="flex flex-1">
                <Sidebar user="student"/>
                <div className="flex-1 p-6 space-y-6">
                    {/* Join Class Section */}
                    <div className="max-w-xl">
                        <div className="flex gap-2 items-start">
                            <Input
                                placeholder="Enter Class Code (e.g. B9BA7S)"
                                title="Class Code"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value)}
                                className={darkMode ? "bg-[#0F172A] border-slate-700 text-white" : "bg-white"}
                            />
                            <Button
                                onClick={handleJoinClass}
                                disabled={isJoining || !joinCode.trim()}
                                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-lg"
                            >
                                {isJoining ? "Joining..." : "Join Class"}
                            </Button>
                        </div>
                        <p className={`mt-2 text-sm font-medium ${subTextColor} opacity-80`}>
                            Pro-tip: Use code <span className="text-blue-500 font-bold">B9BA7S</span> to test the demo.
                        </p>
                    </div>

                    {/* Classes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
                        {loadingClasses
                            ? [...Array(6)].map((_, i) => (
                                  <ClasscardSkeleton key={i} />
                              ))
                            : classes.map((c) => (
                                  <div key={c.class_id} className="relative group transition-transform hover:-translate-y-1">
                                      <Classcard 
                                          user="student"
                                          class_id={c.class_id}
                                          name={c.class.name}
                                          joinCode={c.class.joinCode}
                                          teacher={c.class.teacher.name}
                                      />
                                  </div>
                              ))}
                    </div>

                    {!loadingClasses && classes.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 opacity-50">
                            <div className="text-6xl mb-4">🏫</div>
                            <p className={`${subTextColor} text-lg font-medium`}>You haven't joined any classes yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};