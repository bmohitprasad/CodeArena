import { useTheme } from "../../context/ThemeContext";

export const ProblemCardSkeleton = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`p-6 rounded-2xl border animate-pulse space-y-4 ${
      darkMode ? "bg-[#0F172A] border-slate-800" : "bg-white border-slate-200"
    }`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          {/* Serial placeholder */}
          <div className={`h-6 w-6 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
          {/* Title placeholder */}
          <div className={`h-6 w-48 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
        </div>
        {/* Status pill placeholder */}
        <div className={`h-6 w-20 rounded-full ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
      </div>

      {/* Content lines */}
      <div className="space-y-2">
        <div className={`h-3 w-full rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
        <div className={`h-3 w-5/6 rounded ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />
      </div>
    </div>
  );
};