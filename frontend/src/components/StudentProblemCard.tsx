import { useNavigate } from "react-router-dom"

export interface StudentProblemCardProps {
    id: number
    title: string
    content: string
    assignmentId: number
    expectedOutput: string
}


export const StudentProblemCard: React.FC<StudentProblemCardProps> = ({
    id,
    title,
    content,
}) => {

    const navigate = useNavigate();

    function handler () {
        navigate(`/student/assignment/problem/${id}`)
    }

    return (
        <div className="border rounded-xl bg-white shadow-sm px-4 py-3 transition-transform hover:scale-[1.02]">
            
            <button onClick={handler}>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl font-semibold text-gray-800">{id}.</span>
                    <span className="text-xl font-semibold text-gray-800">{title}</span>
                </div>
                <p className="text-gray-700 text-lg">{content}</p>
            </button>
        </div>
    )
}
