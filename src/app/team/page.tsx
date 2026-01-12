import { Button } from "@/components/ui/button";
import { Instagram, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TeamPage() {
    const barbers = [
        {
            name: "Ali Hassan",
            role: "Master Barber",
            specialty: "Skin Fades & Beards",
            experience: "12 Years",
            image: "https://images.unsplash.com/photo-1580518337843-f959e992563b?w=800&q=80",
            instagram: "ali_cuts"
        },
        {
            name: "Zain Ahmed",
            role: "Senior Stylist",
            specialty: "Scissor Cuts & Styling",
            experience: "8 Years",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80",
            instagram: "zain_style"
        },
        {
            name: "Bilal Khan",
            role: "Grooming Expert",
            specialty: "Hot Towel Shaves",
            experience: "15 Years",
            image: "https://images.unsplash.com/photo-1599351431202-6e0c051cd1a0?w=800&q=80",
            instagram: "bk_barber"
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BarberShop",
        "name": "Premium Cuts Sialkot",
        "employees": barbers.map(b => ({
            "@type": "Person",
            "name": b.name,
            "jobTitle": b.role,
            "knowsAbout": b.specialty
        }))
    };

    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading">
                        Meet The <span className="text-amber-500">Masters</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        The talented hands behind your new look. Our team combines decades of experience with modern techniques.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {barbers.map((barber, i) => (
                        <div key={i} className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-500">
                            {/* Image Placeholder - In real app use local images or reliable URLs */}
                            <div className="h-96 w-full relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                <img
                                    src={barber.image}
                                    alt={barber.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-90" />
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-8">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold text-white mb-1">{barber.name}</h3>
                                    <p className="text-amber-500 font-medium tracking-wide">{barber.role}</p>
                                </div>

                                <div className="space-y-2 text-sm text-slate-400 mb-6">
                                    <p className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-500" /> {barber.specialty}</p>
                                    <p className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">XP</div> {barber.experience}</p>
                                </div>

                                <div className="flex gap-4">
                                    <Link href="/book">
                                        <Button className="w-full bg-white text-black hover:bg-amber-500 font-bold">
                                            Book {barber.name.split(' ')[0]}
                                        </Button>
                                    </Link>
                                    <Button size="icon" variant="outline" className="border-slate-700 text-slate-400 hover:text-white hover:border-white">
                                        <Instagram className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
