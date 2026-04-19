import React from "react";
import { useTheme } from "../context/ThemeContext";

export interface ProblemCardProps {
  serial: number;          
  id: number;              
  title: string;
  content: string;
  assignmentId: number;
  expectedOutput?: string | null;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  serial,
  title,
  content
}) => {
  const { darkMode } = useTheme();

  // THEME TOKENS
  const cardBg = darkMode 
    ? "bg-[#0F172A] border-slate-800 hover:border-slate-700" 
    : "bg-white border-slate-200 hover:border-slate-300";
  
  const titleColor = darkMode ? "text-white" : "text-slate-800";
  const contentColor = darkMode ? "text-slate-400" : "text-slate-600";
  const serialColor = darkMode ? "text-slate-700" : "text-slate-300";

  return (
    <div className={`group border rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-md ${cardBg}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          {/* Large faded serial number for that "Platform" look */}
          <span className={`text-2xl font-black italic select-none transition-colors ${serialColor}`}>
            {serial.toString().padStart(2, '0')}
          </span>
          
          <div className="space-y-1">
            <h3 className={`text-lg font-bold tracking-tight transition-colors ${titleColor}`}>
              {title}
            </h3>
            <div className="flex gap-2">
               <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  Question
               </span>
            </div>
          </div>
        </div>

        {/* Action hint for teachers */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
             Managed by you
           </span>
        </div>
      </div>

      <p className={`text-sm leading-relaxed ${contentColor}`}>
        {content}
      </p>
      
      {/* Subtle bottom bar for structural depth */}
      <div className={`mt-5 pt-4 border-t flex items-center gap-4 ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase">Live on Student Dashboard</span>
        </div>
      </div>
    </div>
  );
};