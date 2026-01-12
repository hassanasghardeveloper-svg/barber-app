import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Scissors, Watch, Zap, Star } from "lucide-react";

export const revalidate = 60;

export default function ServicesPage() {
    return (
        <main className="bg-neutral-950 min-h-screen pt-20">

            {/* --- HERO HEADER --- */}
            <section className="relative py-24 bg-neutral-950 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop"
                        alt="Services Hero"
                        className="w-full h-full object-cover grayscale"
                    />
                </div>
                <div className="absolute inset-0 bg-neutral-950/80" />

                <div className="relative z-10 container mx-auto px-6">
                    <h2 className="text-amber-500 font-bold tracking-[0.3em] uppercase mb-4 text-sm animate-in fade-in slide-in-from-bottom-4 duration-700">Premium Menu</h2>
                    <h1 className="text-5xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Our <span className="text-amber-500">Services</span>
                    </h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                </div>
            </section>

            {/* --- ICON GRID --- */}
            <section className="py-20 bg-neutral-900 border-y border-neutral-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: Scissors, label: "Haircut", desc: "Precision styling" },
                            { icon: Zap, label: "Skin Fade", desc: "Razor sharp finish" },
                            { icon: Watch, label: "Beard Trim", desc: "Sculpt & Condition" },
                            { icon: Star, label: "Royal Shave", desc: "Hot towel therapy" },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-6 border border-white/5 rounded-2xl hover:bg-neutral-800/50 hover:border-amber-500/30 transition-all group">
                                <item.icon className="w-10 h-10 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-bold uppercase tracking-wider mb-1">{item.label}</h3>
                                <p className="text-neutral-500 text-xs">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PRICING LIST (Light Paper Effect) --- */}
            <section className="py-32 bg-[#F5F5F0] text-neutral-900 relative">
                {/* Top Jagged Edge */}
                <div className="absolute top-0 left-0 w-full h-16 bg-neutral-900" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 20%)" }}></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center p-3 bg-neutral-900 rounded-full mb-6">
                            <Scissors className="w-6 h-6 text-amber-500" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black font-heading uppercase tracking-tight mb-4">Grooming & Styling</h2>
                        <p className="text-neutral-500 max-w-xl mx-auto">Expertly curated services for gentlemen and ladies.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-24 gap-y-16 max-w-6xl mx-auto">
                        {/* Men's Section */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black uppercase text-neutral-900 border-l-4 border-amber-500 pl-4 mb-8">For Gentlemen</h3>
                            {[
                                { name: "Signature Haircut", price: "$30", desc: "Consultation, wash, cut & style with product." },
                                { name: "Skin Fade", price: "$35", desc: "Zero/Double zero fade with foil finisher." },
                                { name: "Beard Sculpt & Shape", price: "$25", desc: "Line up, trim, and beard oil application." },
                                { name: "Hot Towel Shave", price: "$40", desc: "Traditional straight razor shave with essential oils." },
                                { name: "The Full Works", price: "$65", desc: "Haircut + Beard + Facial Treatment." },
                            ].map((service, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline border-b border-neutral-300 pb-2 mb-2 group-hover:border-amber-500 transition-colors">
                                        <h4 className="font-bold text-lg uppercase tracking-wide">{service.name}</h4>
                                        <span className="font-bold text-amber-600 text-xl">{service.price}</span>
                                    </div>
                                    <p className="text-neutral-500 text-sm italic">{service.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Ladies Section */}
                        <div className="space-y-8">
                            <h3 className="text-2xl font-black uppercase text-neutral-900 border-l-4 border-amber-500 pl-4 mb-8">For Ladies</h3>
                            {[
                                { name: "Style Cut & Finish", price: "$45", desc: "Consultation, shampoo, condition, cut & blow dry." },
                                { name: "Dry Cut", price: "$35", desc: "Precision dry styling for maintenance." },
                                { name: "Fringe Trim", price: "$15", desc: "Quick tidy up for bangs/fringe." },
                                { name: "Blow Dry & Style", price: "$40", desc: "Volumizing blow dry for any occasion." },
                                { name: "Color Consultation", price: "Free", desc: "Expert advice on your next look." },
                            ].map((service, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-baseline border-b border-neutral-300 pb-2 mb-2 group-hover:border-amber-500 transition-colors">
                                        <h4 className="font-bold text-lg uppercase tracking-wide">{service.name}</h4>
                                        <span className="font-bold text-amber-600 text-xl">{service.price}</span>
                                    </div>
                                    <p className="text-neutral-500 text-sm italic">{service.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Jagged Edge */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-neutral-950" style={{ clipPath: "polygon(0 80%, 100% 0, 100% 100%, 0 100%)" }}></div>
            </section>

            {/* --- CTA --- */}
            <section className="py-24 bg-neutral-950 text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-black text-white font-heading uppercase mb-8">
                        Ready to Look <span className="text-amber-500">Sharp?</span>
                    </h2>
                    <Link href="/book">
                        <Button className="h-16 px-12 bg-amber-500 text-black hover:bg-amber-400 font-bold text-xl uppercase tracking-widest rounded-none shadow-[0_0_50px_rgba(245,158,11,0.2)] hover:shadow-[0_0_80px_rgba(245,158,11,0.4)] transition-all">
                            Book Appointment
                        </Button>
                    </Link>
                </div>
            </section>

        </main>
    );
}
