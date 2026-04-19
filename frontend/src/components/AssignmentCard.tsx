import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

export interface AssignmentCardProps {
    id: number
    title: string
    description: string
    createdAt: string
    deadline: string
    user: string
}

export const Assignmentcard: React.FC<AssignmentCardProps> = ({ id, title, description, createdAt, deadline, user }) => {
    const { darkMode } = useTheme();
    
    const cardBg = darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-[#CBD5E1]";
    const headerBg = darkMode ? "bg-slate-800/50" : "bg-[#3A506B]";
    const textColor = darkMode ? "text-slate-300" : "text-[#1E293B]";

    return (
        <Link 
            to={`/${user}/class/assignment/${id}`}
            className={`block transition-all hover:scale-[1.01] rounded-xl shadow-sm border overflow-hidden ${cardBg}`}
        >
            <div className={`${headerBg} text-white px-4 py-3 border-b ${darkMode ? 'border-slate-700' : 'border-transparent'}`}>
                <div className="text-lg font-bold tracking-tight">{title}</div>
            </div>
            <div className={`p-4 space-y-2 ${textColor}`}>
                <p className="text-base line-clamp-2 opacity-90">{description}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs opacity-70">
                    <p>Created: <span className="font-mono">{createdAt.slice(8, 10)}-{createdAt.slice(5, 7)}-{createdAt.slice(2, 4)}</span></p>
                    <p>Deadline: <span className={`font-mono font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                        {deadline.slice(8, 10)}-{deadline.slice(5, 7)}-{deadline.slice(2, 4)}
                    </span></p>
                </div>
            </div>
        </Link>
    )
}