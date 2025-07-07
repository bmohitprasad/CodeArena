
export const AssignmentCardSkeleton = () => {
    return(
        <div 
            className="block transition-transform hover:scale-[1.02] rounded-xl shadow-sm border border-[#CBD5E1] overflow-hidden bg-white"
        >
            <div className="bg-[#3A506B] text-white px-4 py-3 rounded-t-xl">
                <div className="text-lg font-semibold">Assignment title</div>
            </div>
            <div className="p-4 space-y-2 text-[#1E293B]">
                <p className="text-base">description</p>
                <p className="text-sm text-gray-600">Created At: <span className="font-medium">createdAt</span></p>
                <p className="text-sm text-gray-600">Deadline: <span className="font-medium">deadline</span></p>
            </div>
        </div>
    )
}