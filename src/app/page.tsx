import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="flex-grow flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[20%] w-[60vw] h-[60vw] bg-blue-500/5 rounded-full blur-[120px] animate-blob" />
                <div className="absolute bottom-[-10%] right-[20%] w-[60vw] h-[60vw] bg-amber-500/5 rounded-full blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] bg-purple-500/5 rounded-full blur-[120px] animate-blob animation-delay-4000" />
            </div>

            <div className="z-10 max-w-3xl space-y-8 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-8">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-heading text-white">
                        Book Your Haircut <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                            Without Waiting
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto">
                        No lines, no stress. Just book a slot and come exactly when it’s your turn.
                        Premium grooming for the modern gentleman.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    <Link href="/book">
                        <Button size="lg" variant="premium" className="w-full sm:w-auto min-w-[200px] text-lg font-bold shadow-xl shadow-amber-500/20">
                            Book Appointment
                        </Button>
                    </Link>
                    <Link href="/status">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[200px] border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white">
                            Check Queue
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
