import { Button } from "@/components/ui/button";
import { Scissors, Trophy, History } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-20">
            <div className="container mx-auto px-6">

                {/* Hero */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest">
                            Since 2024
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white font-heading leading-tight">
                            Redefining the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                Sialkot Grooming
                            </span> Scene
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Premium Cuts wasn't built to be just another barber shop. It was built to check a box that was missing in Sialkot:
                            A place where traditional mastery meets modern luxury, without the chaos of waiting in line.
                        </p>
                        <div className="pt-4">
                            <Link href="/book">
                                <Button size="lg" className="bg-white text-black hover:bg-amber-500 font-bold rounded-full px-8">
                                    Experience The Difference
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-blue-500/20 rounded-3xl blur-2xl" />
                        <div className="relative h-[500px] w-full bg-slate-900 rounded-3xl border border-white/10 overflow-hidden group">
                            {/* Placeholder visual */}
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                                <Scissors className="w-32 h-32 text-slate-800" />
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1503951914875-befbb7135952?w=800&q=80"
                                alt="Shop Interior"
                                className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5">
                        <Trophy className="w-10 h-10 text-amber-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">Excellence First</h3>
                        <p className="text-slate-400">We don't rush. Every cut allows for distinct attention to detail to ensure you look your absolute best.</p>
                    </div>
                    <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5">
                        <History className="w-10 h-10 text-amber-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">Respect Your Time</h3>
                        <p className="text-slate-400">Our digital booking system is our promise to you. You book for 3:00 PM, you sit at 3:00 PM.</p>
                    </div>
                    <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5">
                        <Scissors className="w-10 h-10 text-amber-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">Master Craftsmen</h3>
                        <p className="text-slate-400">Our barbers are vetted experts. We train constantly to stay ahead of global trends.</p>
                    </div>
                </div>

            </div>
        </main>
    );
}
