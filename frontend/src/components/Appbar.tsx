import { Menu } from "lucide-react"

export const Appbar = () => {
    return (
        <header className="bg-[#2E3A59] text-white px-6 py-4 shadow-md flex items-center justify-between">
            <div className="text-2xl font-bold tracking-wide">ClassRoom</div>
            <div className="md:hidden">
                <Menu className="h-6 w-6" />
            </div>
        </header>
    )
}
