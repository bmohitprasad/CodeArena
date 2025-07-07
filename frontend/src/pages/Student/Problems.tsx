import { useParams } from "react-router-dom"
import { Appbar } from "../../components/Appbar"
import { Sidebar } from "../../components/Sidebar"
import { Problems } from "../../hooks"
import { ProblemCardSkeleton } from "../../components/skeleton/ProblemsCardSkeleton"
import { StudentProblemCard } from "../../components/StudentProblemCard"

export const StudentProblems = () => {
  const { id } = useParams<{ id: string }>()
  const assignment_id = parseInt(id || "0")
  const refresh = true;
  const { loading, problems } = Problems({ assignment_id, refresh });

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
      <Appbar />
      <div className="flex flex-1">
        <Sidebar user="student"  />
        <div className="text-4xl p-4 font-bold text-[#2E3A59]">
          Problems
        </div>
        <main className="flex-1 p-6 flex gap-6">
          <div className="flex-1 space-y-4">
            {loading
              ? [...Array(6)].map((_, i) => <ProblemCardSkeleton key={i} />)
              : problems.map((p) => (
                  <StudentProblemCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    content={p.content}
                    assignmentId={p.assignmentId}
                    expectedOutput={p.expectedOutput}
                  />
                ))}
          </div>
        </main>
      </div>
    </div>
  )
}
