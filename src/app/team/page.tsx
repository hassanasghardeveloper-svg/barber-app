import { Instagram, Twitter } from "lucide-react";

export default function TeamPage() {
    const barbers = [
        {
            name: "Muneeb",
            role: "Owner / Master Barber",
            image: "https://images.unsplash.com/photo-1580518337843-f959e992563b?w=600&h=800&fit=crop",
            specialty: "Precision Fades & Beards"
        },
        {
            name: "Jordan",
            role: "Senior Stylist",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=800&fit=crop",
            specialty: "Scissor Cuts & Texture"
        },
        {
            name: "Davies",
            role: "Barber",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop",
            specialty: "Classic Gentleman Cuts"
        },
        {
            name: "Haroon",
            role: "Stylist",
            image: "https://images.unsplash.com/photo-1599351431202-6e0c051cd1a0?w=600&h=800&fit=crop",
            specialty: "Hot Towel Shaves"
        }
    ];

    return (
        <main className="bg-neutral-950 min-h-screen pt-20">
            {/* --- HERO HEADER --- */}
            <section className="relative py-24 text-center bg-neutral-950 overflow-hidden">
                <div className="relative z-10 px-6">
                    <h2 className="text-amber-500 font-bold tracking-[0.4em] uppercase mb-4 text-sm">Expert Staff</h2>
                    <h1 className="text-5xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter">Our Team</h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-6" />
                </div>
            </section>

            <section className="py-16 container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    {barbers.map((barber, i) => (
                        <div key={i} className="group relative bg-neutral-900 border border-white/5 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-2">
                            {/* Image Container */}
                            <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img src={barber.image} alt={barber.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Info */}
                            <div className="p-6 text-center bg-gradient-to-t from-neutral-950 to-neutral-900">
                                <h3 className="text-2xl font-black text-white uppercase mb-1">{barber.name}</h3>
                                <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">{barber.role}</p>
                                <div className="w-8 h-0.5 bg-white/20 mx-auto mb-4" />
                                <div className="flex justify-center gap-4 text-neutral-500">
                                    <Instagram className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                                    <Twitter className="w-4 h-4 hover:text-white transition-colors cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
