import { useState } from "react"
import { Appbar } from "../../components/Appbar"
import { Classcard } from "../../components/Classcard"
import { ClasscardSkeleton } from "../../components/skeleton/ClasscardSkeleton"
import { studentClasses } from "../../hooks"
import { Sidebar } from "../../components/Sidebar"
import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useNavigate } from "react-router-dom"

export const StudentClasses = () => {
    const [joinCode, setJoinCode] = useState("")
    const student_id = localStorage.getItem("studentId")
    const { loadingClasses, classes} = studentClasses({student_id: Number(student_id)})

    const navigate = useNavigate();

    const handleJoinClass = async () => {
        await axios.post(`${BACKEND_URL}/api/v1/student/join`, 
            {
                joinCode: joinCode,
                roll_num: Number(student_id)
            }, 
            {
              headers: {
                Authorization: localStorage.getItem("jwt") || ""
              }
            }
          ).then(() => {
            setJoinCode(""); 
        });

        navigate("/student/classes")
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Appbar />
            <div className="flex flex-1">
                <Sidebar user="student"/>
                <div className="flex-1 p-6 space-y-6">
                    {/* Create Class */}
                    <div className="flex gap-2">
                        <Input
                            placeholder="Class Code"
                            value={joinCode}
                            onChange={(e) => {
                                setJoinCode(e.target.value)
                            }}
                        />
                        <Button onClick={handleJoinClass}>Join</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loadingClasses
                            ? [...Array(6)].map((_, i) => (
                                  <ClasscardSkeleton key={i} />
                              ))
                            : classes.map((c) => (
                                  <div key={c.class_id} className="relative group">
                                      <Classcard 
                                          user = "student"
                                          class_id={c.class_id}
                                          name={c.class.name}
                                          joinCode={c.class.teacher.name}
                                      />
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
