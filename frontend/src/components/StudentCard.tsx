export interface StudentCardProps {
    student_id: number
    name: string
}

export const StudentCard: React.FC<StudentCardProps> = ({
    student_id,
    name
}) => {
    return (
        <div className="p-3 bg-[#F1F5F9] text-sm rounded-lg shadow-sm text-gray-800 border hover:bg-[#E2E8F0] transition">
            <span className="font-medium">{name}</span> 
            <span className="text-xs text-gray-600"> ({student_id})</span>
        </div>
    )
}
