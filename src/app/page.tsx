import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Clock, ShieldCheck, Trophy, ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <main className="flex-col relative overflow-hidden">

            {/* --- Hero Section --- */}
            <section className="relative min-h-[90vh] flex items-center justify-center p-6 text-center overflow-hidden">
                {/* Background Blobs (Premium) */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />
                    <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
                </div>

                <div className="z-10 max-w-4xl space-y-8 animate-in fade-in zoom-in duration-1000 slide-in-from-bottom-8 mt-16 md:mt-0">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold uppercase tracking-widest mb-4">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="text-white ml-1 mr-1">4.9/5</span>
                        <span className="opacity-70">from 500+ Reviews</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight font-heading text-white leading-[1.1]">
                        Best Barber Shop <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-600">
                            in New York City
                        </span>
                    </h1>

                    <p className="text-lg md:text-2xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Precision cuts, master barbers, and a seamless online booking experience. <br />
                        <span className="text-amber-500 font-medium">Walk-ins welcome, appointments preferred.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center w-full pt-8 scale-100 hover:scale-[1.02] transition-transform duration-500">
                        <Link href="/book">
                            <Button size="lg" className="h-16 px-10 rounded-full text-xl font-bold bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] transition-all">
                                Book Appointment
                            </Button>
                        </Link>
                        <Link href="/services">
                            <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-xl font-medium border-slate-700 text-white hover:bg-white/5 hover:border-white/20 transition-all">
                                View Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- Features Grid --- */}
            <section className="py-24 bg-slate-950/50 relative border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Trophy,
                                title: "Master Barbers",
                                desc: "Our team consists of award-winning stylists with over 10 years of experience."
                            },
                            {
                                icon: Clock,
                                title: "Zero Wait Time",
                                desc: "Our smart digital queue system ensures you sit in the chair the moment you arrive."
                            },
                            {
                                icon: ShieldCheck,
                                title: "Premium Products",
                                desc: "We use only top-tier grooming products that treat your skin and hair with respect."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-amber-500/30 transition-all hover:bg-slate-900 hover:shadow-2xl">
                                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-7 h-7 text-black" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-lg">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA Strip --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-600/5"></div>
                <div className="container mx-auto px-6 relative text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-heading">Ready for your upgrade?</h2>
                    <Link href="/book">
                        <Button className="h-14 px-8 rounded-full text-lg font-bold bg-white text-black hover:bg-slate-200">
                            Book Your Spot Now <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </div>
            </section>

        </main>
    );
}
