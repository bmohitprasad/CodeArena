
export const ClasscardSkeleton = () => {
    return (
        <div 
            className="transition-transform hover:scale-[1.02] rounded-xl shadow-md overflow-hidden group"
        >
            <div className="bg-[#3A506B] px-4 py-3 text-white">
                <div className="text-lg font-semibold truncate">Class name</div>
            </div>
            <div className="bg-white p-4 space-y-1 text-gray-800">
                <p className="text-sm text-gray-600">Join Code: <span className="font-medium">joinCode</span></p>
                <p className="text-sm text-gray-500">Class ID: class_id</p>
            </div>
        </div>
    )
}