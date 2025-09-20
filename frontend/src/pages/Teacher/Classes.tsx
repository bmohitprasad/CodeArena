import { useState } from "react"
import { Appbar } from "../../components/Appbar"
import { Classcard } from "../../components/Classcard"
import { ClasscardSkeleton } from "../../components/skeleton/ClasscardSkeleton"
import { teacherClasses } from "../../hooks"
import { Sidebar } from "../../components/Sidebar"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
// import { Dialog, DialogContent, DialogTrigger } from "../../components/ui/Dialog"
import axios from "axios"
import { BACKEND_URL } from "../../config"

export const Classes = () => {
    const { loading, classes, fetchClasses } = teacherClasses()
    const [newClassName, setNewClassName] = useState("")
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
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Appbar />
            <div className="flex flex-1">
                <Sidebar user="teacher" />
                <div className="flex-1 p-6 space-y-6">
                    {/* Create Class */}
                    <div className="flex gap-2">
                        <Input
                            placeholder="New class name"
                            value={newClassName}
                            //@ts-ignore
                            onChange={(e) => setNewClassName(e.target.value)}
                        />
                        <Button onClick={handleCreateClass}>Create</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading
                            ? [...Array(6)].map((_, i) => (
                                  <ClasscardSkeleton key={i} />
                              ))
                            : classes.map((c) => (
                                  <div key={c.class_id} className="relative group">
                                      <Classcard
                                          user="teacher"
                                          class_id={c.class_id}
                                          name={c.name}
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
