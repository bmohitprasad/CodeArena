// components/AssignmentCard.tsx
import { Link } from "react-router-dom"

export interface AssignmentCardProps {
    id: number
    title: string
    description: string
    createdAt: string
    deadline: string
    user: string
}

export const Assignmentcard: React.FC<AssignmentCardProps> = ({
    id,
    title,
    description,
    createdAt,
    deadline,
    user
}) => {
    return (
        <Link 
            to={`/${user}/class/assignment/${id}`}
            className="block transition-transform hover:scale-[1.02] rounded-xl shadow-sm border border-[#CBD5E1] overflow-hidden bg-white"
        >
            <div className="bg-[#3A506B] text-white px-4 py-3 rounded-t-xl">
                <div className="text-lg font-semibold">Assignment {id}: {title}</div>
            </div>
            <div className="p-4 space-y-2 text-[#1E293B]">
                <p className="text-base">{description}</p>
                <p className="text-sm text-gray-600">Created At: <span className="font-medium">{createdAt.slice(8, 10) + "-" + createdAt.slice(5, 7) + "-" + createdAt.slice(2, 4)}</span></p>
                <p className="text-sm text-gray-600">Deadline: <span className="font-medium">{deadline.slice(8, 10) + "-" + deadline.slice(5, 7) + "-" + deadline.slice(2, 4)}</span></p>
            </div>
        </Link>
    )
}
