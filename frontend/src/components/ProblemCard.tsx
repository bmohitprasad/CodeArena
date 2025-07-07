
export interface ProblemCardProps {
    id: number
    title: string
    content: string
    assignmentId: number
    expectedOutput: string
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
    id,
    title,
    content
}) => {
    return (
        <div className="border rounded-xl bg-white shadow-sm px-4 py-3 transition-transform hover:scale-[1.02]">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl font-semibold text-gray-800">{id}.</span>
                <span className="text-xl font-semibold text-gray-800">{title}</span>
            </div>
            <p className="text-gray-700 text-lg">{content}</p>
        </div>
    )
}
