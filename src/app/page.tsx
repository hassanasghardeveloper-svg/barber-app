import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin, Phone, Scissors, Trophy, User, Calendar } from "lucide-react";

export default function Home() {
    return (
        <main className="flex-col bg-neutral-950">

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop"
                        alt="Barber Shop Background"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                </div>

                <div className="relative z-10 text-center space-y-6 px-4 max-w-5xl mx-auto mt-20">
                    <div className="inline-block border-b-2 border-amber-500 pb-2 mb-4">
                        <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-xs md:text-base">Est. 2024 • Sialkot</span>
                    </div>

                    <h1 className="text-5xl md:text-9xl font-black font-heading text-white uppercase tracking-tighter leading-[0.9]">
                        Best Barber <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-700 drop-shadow-2xl">
                            Shop
                        </span>
                    </h1>

                    <p className="text-neutral-300 text-sm md:text-2xl font-light max-w-2xl mx-auto tracking-wide">
                        Where traditional mastery meets modern luxury.
                    </p>

                    <div className="pt-8 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full px-6 md:px-0">
                        <Link href="/book" className="w-full sm:w-auto">
                            <Button className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg md:text-xl uppercase tracking-widest rounded-none border-2 border-amber-500 transition-all hover:scale-105">
                                Book Now
                            </Button>
                        </Link>
                        <Link href="/services" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg md:text-xl uppercase tracking-widest rounded-none transition-all bg-transparent">
                                View Menu
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Info Strip - Hidden on Mobile to save space, visible on Desktop */}
                <div className="absolute bottom-0 w-full bg-neutral-900/80 backdrop-blur-md border-t border-white/10 py-6 hidden md:block">
                    <div className="container mx-auto flex justify-center gap-16 text-neutral-300 text-sm font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-3">
                            <MapPin className="text-amber-500 w-5 h-5" /> Paris Road, Sialkot
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="text-amber-500 w-5 h-5" /> Mon-Sat: 10am - 10pm
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="text-amber-500 w-5 h-5" /> +92 300 1234567
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TEAM CIRCLES --- */}
            <section className="py-20 md:py-24 bg-neutral-950 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-amber-500 font-bold tracking-widest uppercase mb-4 text-xs md:text-sm">Our Talent</h2>
                    <h3 className="text-3xl md:text-4xl text-white font-bold font-heading mb-12 md:mb-16 uppercase">Meet the Masters</h3>

                    <div className="flex flex-wrap justify-center gap-12">
                        {[
                            { name: "Ali Hassan", role: "Master Barber", img: "https://images.unsplash.com/photo-1580518337843-f959e992563b?w=400&h=400&fit=crop" },
                            { name: "Zain Ahmed", role: "Stylist", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=400&fit=crop" },
                            { name: "Bilal Khan", role: "Beard Expert", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" }
                        ].map((member, i) => (
                            <div key={i} className="group flex flex-col items-center gap-6">
                                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full p-1 border-2 border-amber-500/30 group-hover:border-amber-500 transition-colors">
                                    <div className="w-full h-full rounded-full overflow-hidden relative">
                                        <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg md:text-xl text-white font-bold uppercase">{member.name}</h4>
                                    <p className="text-amber-500 text-xs md:text-sm tracking-wider uppercase">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- LIGHT SERVICES SECTION (The "Torn Paper" Effect) --- */}
            <section className="py-20 md:py-32 bg-[#F5F5F0] text-neutral-900 relative">
                {/* Top Jagged Edge (CSS substitute) */}
                <div className="absolute top-0 left-0 w-full h-12 md:h-16 bg-neutral-950" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 20%)" }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-12 md:mb-16">
                        <Scissors className="w-10 h-10 md:w-12 md:h-12 mx-auto text-amber-600 mb-6" />
                        <h2 className="text-3xl md:text-5xl font-black font-heading uppercase tracking-tight mb-4">Premium Menu</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-20 gap-y-8 md:gap-y-12 max-w-5xl mx-auto">
                        {/* Service Item */}
                        {[
                            { name: "Classic Haircut", price: "$25", desc: "Consultation, cut, wash & style" },
                            { name: "Skin Fade", price: "$30", desc: "Razor sharp fade with hot towel" },
                            { name: "Beard Sculpting", price: "$15", desc: "Shape up, trim & oil treatment" },
                            { name: "Hot Towel Shave", price: "$35", desc: "Traditional straight razor shave" },
                            { name: "Full Service", price: "$55", desc: "Haircut + Beard + Facial" },
                            { name: "Kid's Cut", price: "$20", desc: "For the little gentlemen (Under 12)" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col group">
                                <div className="flex items-end justify-between font-bold text-lg md:text-xl uppercase mb-2 border-b-2 border-neutral-200 pb-2 group-hover:border-amber-500 transition-colors">
                                    <span>{item.name}</span>
                                    <span className="text-amber-600">{item.price}</span>
                                </div>
                                <p className="text-neutral-500 italic text-xs md:text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12 md:mt-16">
                        <Link href="/services">
                            <Button className="h-12 md:h-14 px-8 md:px-10 bg-black text-white hover:bg-neutral-800 font-bold uppercase tracking-widest text-sm md:text-lg rounded-none">
                                View Full Price List
                            </Button>
                        </Link>
                    </div>
                </div>
                {/* Bottom Jagged Edge */}
                <div className="absolute bottom-0 left-0 w-full h-12 md:h-16 bg-neutral-950" style={{ clipPath: "polygon(0 80%, 100% 0, 100% 100%, 0 100%)" }}></div>
            </section>

            {/* --- STATS & IMAGES --- */}
            <section className="py-20 md:py-24 bg-neutral-950 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-white/10 pb-12 md:pb-20 mb-12 md:mb-20">
                        {[
                            { icon: User, num: "2,000+", label: "Happy Clients" },
                            { icon: Calendar, num: "5+", label: "Years Serving" },
                            { icon: Trophy, num: "12", label: "Awards Won" },
                            { icon: Scissors, num: "21", label: "Barbers" },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-4">
                                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-amber-500 mx-auto" />
                                <div className="text-3xl md:text-5xl font-black text-white">{stat.num}</div>
                                <div className="text-neutral-400 uppercase tracking-widest text-[10px] md:text-xs font-bold">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        <div className="bg-neutral-900 p-8 md:p-20 flex flex-col justify-center items-start text-left space-y-6">
                            <h3 className="text-amber-500 font-bold uppercase tracking-widest text-sm">About Us</h3>
                            <h2 className="text-3xl md:text-6xl font-black text-white font-heading leading-tight">
                                MORE THAN JUST <br /> A HAIRCUT
                            </h2>
                            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
                                We believe grooming is an essential part of being a gentleman.
                                Our shop is fashioned as a haven where you can relax, network, and walk out looking your absolute best.
                            </p>
                            <Link href="/about">
                                <Button className="text-amber-500 hover:text-white variant-link p-0 uppercase font-bold tracking-widest border-b border-amber-500 rounded-none pb-1 h-auto hover:no-underline text-sm md:text-base">
                                    Read Our Story
                                </Button>
                            </Link>
                        </div>
                        <div className="h-[300px] md:h-[500px] relative">
                            <img
                                src="https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=2070&auto=format&fit=crop"
                                alt="Barber Working"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA with MAP BG --- */}
            <section className="relative py-24 md:py-40 flex items-center justify-center">
                {/* Map Background Placeholder */}
                <div className="absolute inset-0 z-0 bg-neutral-900 opacity-50">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=2074&q=80" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <div className="bg-neutral-950/90 p-8 md:p-20 border border-amber-500/30 backdrop-blur-sm">
                        <h2 className="text-3xl md:text-6xl font-black text-white font-heading uppercase mb-4 md:mb-8">
                            Ready for the <span className="text-amber-500 block md:inline">Experience?</span>
                        </h2>
                        <p className="text-neutral-400 text-base md:text-xl mb-8 md:mb-10 max-w-xl mx-auto">
                            Stop waiting in lines. Book your seat with the best barbers in Sialkot today.
                        </p>
                        <Link href="/book" className="block w-full sm:w-auto">
                            <Button className="w-full sm:w-auto h-16 md:h-20 px-8 md:px-16 bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg md:text-2xl uppercase tracking-widest rounded-none shadow-[0_0_50px_rgba(245,158,11,0.3)] hover:shadow-[0_0_80px_rgba(245,158,11,0.5)] transition-all transform hover:-translate-y-1">
                                Book Appointment
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
