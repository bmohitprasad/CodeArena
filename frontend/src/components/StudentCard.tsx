import { useTheme } from "../context/ThemeContext";

export interface StudentCardProps {
    student_id: number
    name: string
}

export const StudentCard: React.FC<StudentCardProps> = ({ student_id, name }) => {
    const { darkMode } = useTheme();
    return (
        <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
            darkMode 
                ? "bg-slate-900/50 border-slate-800 text-slate-200 hover:border-slate-600" 
                : "bg-[#F1F5F9] border-slate-200 text-gray-800 hover:bg-[#E2E8F0]"
        }`}>
            <span className="font-bold text-sm tracking-tight">{name}</span> 
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${darkMode ? 'bg-black/40 text-slate-500' : 'bg-white text-gray-400'}`}>
                #{student_id}
            </span>
        </div>
    )
}