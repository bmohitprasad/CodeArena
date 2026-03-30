import { Appbar } from "../../components/Appbar";
import { Sidebar } from "../../components/Sidebar";
import { Assignmentcard } from "../../components/AssignmentCard";
import { AssignmentCardSkeleton } from "../../components/skeleton/AssignmentCardSkeleton";
import { Assignments} from "../../hooks";
import { useParams } from "react-router-dom";
// import ClassroomChat from "../../components/ClassroomChat";

export const StudentAssignments = () => {
  const { id } = useParams<{ id: string }>();
  const classId = parseInt(id || "0");
  const { loading, assignments } = Assignments({ class_id: classId });

  // const token = localStorage.getItem('jwt') || '';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Appbar />
      </div>
      <div className="flex flex-1">
        <Sidebar user="student" />
        <main className="flex-1 p-6 max-w-6xl mx-auto space-y-6">
          <h1 className="text-4xl font-extrabold text-[#2E3A59] mb-4">Assignments</h1>

          {/* Assignments List */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <AssignmentCardSkeleton key={i} />
              ))}
            </div>
          ) : assignments.length === 0 ? (
            <div className="text-center py-20 text-gray-500 select-none text-lg italic">
              No assignments found.
            </div>
          ) : (
            <div className="space-y-4">
              {assignments.map((a) => (
                <Assignmentcard
                  key={a.id}
                  id={a.id}
                  user="student"
                  title={a.title}
                  description={a.description}
                  createdAt={a.createdAt}
                  deadline={a.deadline}
                  // className="transition-shadow hover:shadow-lg"
                />
              ))}
            </div>
            
          )}
        </main>
        {/* // After the assignments list */}
          {/* <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#2E3A59] mb-3">Classroom Chat</h2>
            <div className="max-w-4xl">
              <ClassroomChat roomId={`class-${classId}`} token={token} />
            </div>
          </div> */}
      </div>
    </div>
  );
};
