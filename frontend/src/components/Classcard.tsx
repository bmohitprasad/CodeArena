import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

export interface ClassCardProps {
    class_id: number
    name: string
    joinCode: string
    user: string
    teacher: string
}

export const Classcard: React.FC<ClassCardProps> = ({ class_id, name, joinCode, user, teacher }) => {
    const { darkMode } = useTheme();
    const cardBg = darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-[#CBD5E1]";

    return (
        <Link 
            to={`/${user}/class/${class_id}`}
            className={`max-w-110 block transition-all hover:shadow-lg hover:-translate-y-1 rounded-xl border overflow-hidden ${cardBg}`}
        >
            <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-[#3A506B]'} px-4 py-4 text-white flex justify-between items-center`}>
                <div className="text-xl font-bold truncate">{name}</div>
                <div className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase tracking-widest">ID: {class_id}</div>
            </div>
            <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Join Code</span>
                    <span className={`font-mono font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{joinCode}</span>
                </div>
                {user === "student" && (
                    <div className={`pt-2 border-t ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Instructor: <span className={`${darkMode ? 'text-slate-200' : 'text-slate-800'} font-medium`}>{teacher}</span>
                        </p>
                    </div>
                )}
            </div>
        </Link>
    )
}