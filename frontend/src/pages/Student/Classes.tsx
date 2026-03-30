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
// import { useNavigate } from "react-router-dom"

export const StudentClasses = () => {
    const [joinCode, setJoinCode] = useState("")
    const [isJoining, setIsJoining] = useState(false)
    const student_id = localStorage.getItem("studentId")
    const { loadingClasses, classes} = studentClasses({student_id: Number(student_id)})

    // const navigate = useNavigate();

    const handleJoinClass = async () => {
        if (!joinCode.trim() || isJoining) return

        try {
            setIsJoining(true)
            await axios.post(
                `${BACKEND_URL}/api/v1/student/join`,
                {
                    joinCode: joinCode,
                    roll_num: Number(student_id)
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("jwt") || ""
                    }
                }
            )

            // clear input (optional since we reload)
            setJoinCode("")

            // reload to fetch updated classes
            location.reload()
        } catch (err) {
            // handle error — you can replace this with your toast/notification
            console.error("Failed to join class:", err)
            alert("Failed to join class. Please check the code and try again.")
            setIsJoining(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="fixed top-0 left-0 right-0 z-50">
                <Appbar />
            </div>
            <div className="flex flex-1">
                <Sidebar user="student"/>
                <div className="flex-1 p-6 space-y-6">
                    {/* Join Class */}
                    <div className="flex gap-2 items-start">
                        <Input
                            placeholder="Class Code"
                            value={joinCode}
                            onChange={(e) => {
                            setJoinCode(e.target.value)
                            }}
                        />

                        <Button
                            onClick={handleJoinClass}
                            disabled={isJoining || !joinCode.trim()}
                        >
                            {isJoining ? (
                            <span className="inline-flex items-center">
                                <svg
                                className="animate-spin h-4 w-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                                </svg>
                                Joining...
                            </span>
                            ) : (
                            "Join"
                            )}
                        </Button>
                        </div>
                        <p className="mt-1 text-lg text-slate-700">
                            Use code 1AYLBP as a class code, for demo...
                        </p>


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
                                          joinCode={c.class.joinCode}
                                          teacher={c.class.teacher.name}
                                      />
                                  </div>
                              ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
