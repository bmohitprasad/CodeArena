import { Link } from "react-router-dom"

export interface ClassCardProps {
    class_id: number
    name: string
    joinCode: string
    user: string
}

export const Classcard: React.FC<ClassCardProps> = ({
    class_id,
    name,
    joinCode,
    user
}) => {
    return (
        <Link 
            to={`/${user}/class/${class_id}`}
            className="max-w-110 block transition-transform hover:scale-[1.02] rounded-xl shadow-sm border border-[#CBD5E1] overflow-hidden bg-white"
        >
            {/* Top Bar */}
            <div className="bg-[#3A506B] px-4 py-3 text-white rounded-t-xl flex justify-between">
                <div className="text-lg font-semibold truncate flex">
                    {name}
                </div>
            </div>
            <div className="p-4 space-y-2 text-[#1E293B]">
                <p className="text-sm text-gray-600">
                    Join Code: <span className="font-medium">{joinCode}</span>
                </p>
                <p className="text-sm text-gray-600">
                    Class ID: <span className="font-medium">{class_id}</span>
                </p>
            </div>
        </Link>
    )
}
