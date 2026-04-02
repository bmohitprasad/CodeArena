import { Sidebar } from "../../components/Sidebar";
import { Appbar } from "../../components/Appbar"

export const SubmissionPage = () => {
  return (
      <div className="min-h-screen flex flex-col bg-[#F5F7FA]">
        <Appbar />
        <div className="flex flex-1">
          <Sidebar user = "student"/>
          <div className="text-4xl p-4 font-bold text-[#2E3A59]">
            Submissions
          </div>
        </div>
      </div>
    )
}