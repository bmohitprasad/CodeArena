import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { Assignmentcard } from "../../components/AssignmentCard";
import { AssignmentCardSkeleton } from "../../components/skeleton/AssignmentCardSkeleton";
import { Assignments} from "../../hooks";
import { useParams } from "react-router-dom";

export const StudentAssignments = () => {
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id || "0");
  const { loading, assignments } = Assignments({ class_id: classId });
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student" />
        <div className="text-4xl p-4 font-bold text-[#2E3A59]">
          Assignments
        </div>
        {/* Assignments List */}
        <main className="flex-1 py-6 pr-6 flex flex-col items-center">
          <div className="w-full max-w-4xl space-y-4">
            {loading
              ? [...Array(6)].map((_, i) => <AssignmentCardSkeleton key={i} />)
              : assignments.map((a) => (
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
        </main>
      </div>
      </div>
  );
};
