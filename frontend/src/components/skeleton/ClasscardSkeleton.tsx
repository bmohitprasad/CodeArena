import { useTheme } from "../../context/ThemeContext";

export const ClasscardSkeleton = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`rounded-xl border shadow-sm animate-pulse overflow-hidden ${
      darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-slate-200"
    }`}>
      {/* Top Bar */}
      <div className={`h-14 w-full ${darkMode ? "bg-blue-900/20" : "bg-[#3A506B]/20"}`} />
      
      {/* Info Rows */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <div className={`h-3 w-16 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
          <div className={`h-3 w-12 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
        </div>
        <div className={`h-3 w-24 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
      </div>
    </div>
  );
};