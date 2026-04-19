import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { Assignmentcard } from "../../components/AssignmentCard";
import { AssignmentCardSkeleton } from "../../components/skeleton/AssignmentCardSkeleton";
import { Assignments } from "../../hooks";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export const StudentAssignments = () => {
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id || "0");
  const { loading, assignments } = Assignments({ class_id: classId });
  const { darkMode } = useTheme();

  const pageBg = darkMode ? "bg-[#1E293B]" : "bg-[#F5F7FA]";
  const headingColor = darkMode ? "text-white" : "text-[#2E3A59]";

  return (
    <div className={`min-h-screen flex flex-col ${pageBg} transition-colors duration-300`}>
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student" />
        <main className="flex-1 p-6 max-w-6xl mx-auto space-y-6">
          <h1 className={`text-4xl font-extrabold ${headingColor} mb-4 tracking-tight`}>
            Assignments
          </h1>

          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <AssignmentCardSkeleton key={i} />
              ))}
            </div>
          ) : assignments.length === 0 ? (
            <div className={`text-center py-20 ${darkMode ? "text-slate-500" : "text-gray-500"} select-none text-lg italic`}>
              No assignments found for this class.
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {assignments.map((a) => (
                <Assignmentcard
                  key={a.id}
                  id={a.id}
                  user="student"
                  title={a.title}
                  description={a.description}
                  createdAt={a.createdAt}
                  deadline={a.deadline}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};