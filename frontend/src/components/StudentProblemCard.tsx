import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export interface StudentProblemCardProps {
  serial: number;        
  id: number;            
  title: string;
  content: string;
  assignmentId: number;
  expectedOutput: string;
  isSubmitted: boolean;
}

export const StudentProblemCard: React.FC<StudentProblemCardProps> = ({ serial, id, title, content, isSubmitted }) => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <div className={`border rounded-2xl shadow-sm transition-all hover:scale-[1.02] relative group overflow-hidden ${
        darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-slate-200"
    }`}>
      <button onClick={() => navigate(`/student/assignment/problem/${id}`)} className="w-full text-left p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <span className={`text-2xl font-black opacity-20 ${darkMode ? 'text-white' : 'text-black'}`}>
              {serial.toString().padStart(2, '0')}
            </span>
            <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </span>
          </div>

          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
              isSubmitted
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                : "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse-subtle"
            }`}
          >
            {isSubmitted ? "RESOLVED" : "PENDING"}
          </span>
        </div>

        <p className={`text-sm leading-relaxed line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            {content}
        </p>
        
        <div className="mt-4 text-blue-500 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            Open Editor →
        </div>
      </button>
    </div>
  );
};
