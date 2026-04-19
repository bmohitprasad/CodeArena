import { useTheme } from "../../context/ThemeContext";

export const AssignmentCardSkeleton = () => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`w-full h-36 rounded-xl border animate-pulse overflow-hidden ${
      darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-slate-200"
    }`}>
      {/* Header Bar Skeleton */}
      <div className={`h-11 w-full ${darkMode ? "bg-slate-800/50" : "bg-[#3A506B]/20"}`} />
      
      {/* Body Content Skeleton */}
      <div className="p-4 space-y-4">
        <div className={`h-4 w-3/4 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
        <div className="flex gap-4">
          <div className={`h-3 w-24 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
          <div className={`h-3 w-24 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
        </div>
      </div>
    </div>
  );
};