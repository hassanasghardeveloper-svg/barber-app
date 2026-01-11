import Link from "next/link";
import { Scissors } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <div className="p-2 bg-amber-500 rounded-lg group-hover:bg-amber-400 transition-colors">
                        <Scissors className="w-5 h-5 text-slate-950" />
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                        Premium<span className="text-amber-500">Cuts</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center space-x-6">
                    <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/book" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Book Now
                    </Link>
                    <Link href="/status" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                        Queue Status
                    </Link>
                </div>

                <div className="flex items-center gap-4">

                    <Link href="/book" className="hidden md:block bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-md text-sm font-bold shadow-lg shadow-amber-500/20 transition-all">
                        Book Appointment
                    </Link>
                </div>
            </div>
        </nav>
    );
}
