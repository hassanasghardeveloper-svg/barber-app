import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, Calendar, Trophy, Scissors } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="bg-neutral-950 min-h-screen pt-20">

            {/* --- HERO HEADER --- */}
            <section className="relative py-32 text-center bg-neutral-950 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1599351431202-6e0c051cd1a0?q=80&w=2000&auto=format&fit=crop"
                        alt="About Hero"
                        className="w-full h-full object-cover opacity-20 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
                </div>
                <div className="relative z-10 px-6">
                    <h2 className="text-amber-500 font-bold tracking-[0.4em] uppercase mb-4 text-sm">Who We Are</h2>
                    <h1 className="text-5xl md:text-8xl font-black font-heading text-white uppercase tracking-tighter">About Us</h1>
                </div>
            </section>

            {/* --- STORY SECTION --- */}
            <section className="py-20 bg-neutral-950">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-block border-l-4 border-amber-500 pl-4">
                                <h3 className="text-3xl text-white font-bold uppercase leading-tight">
                                    Finally, a better place for a <br />
                                    <span className="text-amber-500">Busy Man</span> to get a haircut.
                                </h3>
                            </div>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                Founded in 2024, Premium Cuts was born out of a frustration with the typical barbershop experience.
                                We wanted to create a space that combines the efficiency of digital booking with the timeless art of traditional grooming.
                            </p>
                            <p className="text-neutral-400 text-lg leading-relaxed">
                                Located on Paris Road in the heart of Sialkot, we are more than just a shop; we are a community hub for gentlemen who value their appearance and their time.
                            </p>
                        </div>
                        <div className="relative h-[400px] border-8 border-neutral-900 shadow-2xl overflow-hidden rounded-lg group">
                            <img
                                src="https://images.unsplash.com/photo-1503951914875-452162b7f30a?q=80&w=2070&auto=format&fit=crop"
                                alt="Shop Interior"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-black/80 backdrop-blur-sm p-6 border border-amber-500/50">
                                <h4 className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-2">Since 2024</h4>
                                <h3 className="text-white font-black text-2xl uppercase">Sialkot's Finest</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STATS STRIP --- */}
            <section className="py-16 bg-neutral-900 border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Satisfied Clients", value: "2,003" },
                            { label: "Years Experience", value: "7+" },
                            { label: "Professional Barbers", value: "12" },
                            { label: "Awards Won", value: "21" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-3xl md:text-5xl font-black text-green-500 mb-2">{stat.value}</div>
                                <div className="text-white uppercase tracking-widest text-[10px] md:text-xs font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TEAM PREVIEW --- */}
            <section className="py-24 bg-neutral-950 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-black text-white uppercase font-heading mb-12">Our Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Muneeb", role: "Owner / Barber", img: "https://images.unsplash.com/photo-1580518337843-f959e992563b?w=500&h=600&fit=crop" },
                            { name: "Jordan", role: "Stylist", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&h=600&fit=crop" },
                            { name: "Davies", role: "Barber", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&h=600&fit=crop" }
                        ].map((member, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-xl h-[400px]">
                                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-6 pt-20 translate-y-2 group-hover:translate-y-0 transition-transform">
                                    <h3 className="text-white font-bold text-xl uppercase">{member.name}</h3>
                                    <p className="text-amber-500 text-xs font-bold uppercase tracking-wider">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
