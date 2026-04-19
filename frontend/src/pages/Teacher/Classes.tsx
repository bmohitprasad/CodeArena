import { useState } from "react"
import { Appbar } from "../../components/Appbar"
import { Classcard } from "../../components/Classcard"
import { ClasscardSkeleton } from "../../components/skeleton/ClasscardSkeleton"
import { teacherClasses } from "../../hooks"
import { Sidebar } from "../../components/Sidebar"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useTheme } from "../../context/ThemeContext"

export const Classes = () => {
    const { loading, classes, fetchClasses } = teacherClasses()
    const [newClassName, setNewClassName] = useState("")
    const { darkMode } = useTheme();
    const pageBg = darkMode ? "bg-[#1E293B]" : "bg-gray-50";
    const teacherId = localStorage.getItem("teacherId")

    const handleCreateClass = async () => {
        await axios.post(`${BACKEND_URL}/api/v1/admin/${teacherId}/create-class`, 
            { className: newClassName }, 
            {
              headers: {
                Authorization: localStorage.getItem("jwt") || ""
              }
            }
        )
        setNewClassName("") 
        fetchClasses() // <-- this will refetch the class list immediately!
    }

    return (
        <div className={`min-h-screen flex flex-col ${pageBg}`}>
            <Appbar />
            <div className="flex flex-1">
                <Sidebar user="teacher" />
                <div className="flex-1 p-6 space-y-8">
                    {/* Create Class Header */}
                    <div className={`${darkMode ? 'bg-[#0F172A]' : 'bg-white'} p-6 rounded-2xl border ${darkMode ? 'border-slate-800' : 'border-slate-200'} shadow-sm flex gap-4 items-center`}>
                        <div className="flex-1">
                          <label htmlFor="new-class-name" className={`text-sm font-bold uppercase mb-2 block ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Classroom Factory</label>
                          <Input
                              id="new-class-name"
                              title="Class Name"
                              placeholder="e.g. Advanced Data Structures"
                              value={newClassName}
                              onChange={(e) => setNewClassName(e.target.value)}
                              className={darkMode ? "bg-slate-900 border-slate-700 text-white" : ""}
                          />
                        </div>
                        <Button onClick={handleCreateClass} className="mt-6 px-8 bg-blue-600">Create Class</Button>
                    </div>

                    {/* Classes Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">                        {loading
                            ? [...Array(6)].map((_, i) => (
                                  <ClasscardSkeleton key={i} />
                              ))
                            : classes.map((c) => (
                                  <div key={c.class_id} className="relative group">
                                      <Classcard
                                          user="teacher"
                                          class_id={c.class_id}
                                          name={c.name}
                                          teacher=""
                                          joinCode={c.joinCode}
                                      />
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
