
export const ProblemCardSkeleton = () =>{
    return (
        <div className="mb-3 pl-2 py-2 transition-transform hover:scale-[1.02]">
            <div>
                <div className="flex">
                    <div className="mr-2 font-semibold text-xl text-gray-700">
                        id
                    </div>
                    <div className="font-semibold text-xl text-gray-700">
                        title
                    </div>
                </div>
            </div>
            <div className="text-lg">
                content
            </div>
        </div>
    )
}