import { Loader2 } from "lucide-react"

export default function LoadScreen(){
    return (
        <div className="z-10 fixed flex-col gap-3 inset-0 flex items-center justify-center bg-gray-300">
            <Loader2 className="animate-spin" size="100" />
            <span className="text-4xl text-slate-900 font-extrabold">Yükleniyor</span>
        </div>
    )
}