import { useNavigate } from "react-router-dom";

export interface StudentProblemCardProps {
  serial: number;        // 👈 UI serial number
  id: number;            // 👈 DB id
  title: string;
  content: string;
  assignmentId: number;
  expectedOutput: string;
  isSubmitted: boolean;
}

export const StudentProblemCard: React.FC<StudentProblemCardProps> = ({
  serial,
  id,
  title,
  content,
  isSubmitted,
}) => {
  const navigate = useNavigate();

  function handler() {
    navigate(`/student/assignment/problem/${id}`);
  }

  return (
    <div className="border rounded-2xl shadow-sm px-6 py-5 transition-transform hover:scale-[1.02] bg-white relative">
      <button onClick={handler} className="w-full text-left">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              {serial}.
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {title}
            </span>
          </div>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isSubmitted
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {isSubmitted ? "Submitted" : "Not Submitted"}
          </span>
        </div>

        <p className="text-gray-700 text-md">{content}</p>
      </button>
    </div>
  );
};
