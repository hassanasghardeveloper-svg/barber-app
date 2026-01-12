import { PrismaClient } from '@prisma/client';
import { Button } from "@/components/ui/button";
import { Scissors, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const prisma = new PrismaClient();

// This function ensures the page is revalidated (refreshed) every 60 seconds
export const revalidate = 60;

export default async function ServicesPage() {
    // Fetch real data from the database
    const services = await prisma.service.findMany({
        orderBy: { name: 'asc' }
    });

    // SEO Descriptions Map (Since DB only has names, we enhance them here for SEO)
    const getServiceDescription = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('haircut')) return "Experience a precision haircut tailored to your face shape and style. Includes consultation, shampoo, and styling with premium products.";
        if (lower.includes('beard')) return "Expert beard sculpting and trimming. We define your lines and shape your beard to perfection, finished with beard oil.";
        if (lower.includes('shave')) return "Traditional hot towel shave using a straight razor. The ultimate relaxation experience for the closest, smoothest shave possible.";
        if (lower.includes('facial')) return "Rejuvenating facial treatment to cleanse pores and hydrate your skin. Perfect for removing city dust and relaxing.";
        return "Professional grooming service performed by our expert barbers using top-tier tools and products.";
    };

    return (
        <main className="min-h-screen bg-slate-950 pt-24 pb-16">

            {/* SEO Header */}
            <div className="container mx-auto px-6 mb-16 text-center">
                <h1 className="text-4xl md:text-6xl font-bold font-heading text-white mb-6">
                    Premium Services <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                        & Pricing Menu
                    </span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Transparent pricing for world-class grooming. Choose your service and book online instantly.
                </p>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.length > 0 ? (
                        services.map((service) => (
                            <div key={service.id} className="group relative bg-slate-900/50 border border-white/5 rounded-3xl p-8 hover:border-amber-500/30 transition-all hover:bg-slate-900 overflow-hidden">
                                {/* Hover Glow */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-amber-500/30 transition-colors">
                                        <Scissors className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold text-white font-mono">${service.price}</span>
                                        <span className="text-xs text-slate-500 font-bold tracking-wider uppercase">{service.duration} mins</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">{service.name}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                    {getServiceDescription(service.name)}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Available
                                    </div>
                                    <Link href="/book">
                                        <Button size="sm" className="rounded-full bg-white text-black hover:bg-amber-500 hover:text-black font-bold transition-all transform group-hover:translate-x-1">
                                            Book Now <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 border border-dashed border-slate-800 rounded-3xl">
                            <Scissors className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white">Menu Updating...</h3>
                            <p className="text-slate-500">Our services are currently being updated. Please check back later.</p>
                        </div>
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 p-8 md:p-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-3xl relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Not sure what to choose?</h2>
                        <p className="text-amber-100">Book a consultation with our master barbers.</p>
                    </div>
                    <div className="relative z-10 flex gap-4">
                        <Link href="/contact">
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-amber-700 h-12 px-8 rounded-full font-bold backdrop-blur-sm">
                                Contact Us
                            </Button>
                        </Link>
                        <Link href="/book">
                            <Button className="bg-black text-white hover:bg-slate-900 h-12 px-8 rounded-full font-bold shadow-xl">
                                Book Appointment
                            </Button>
                        </Link>
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-12 -mb-12 pointer-events-none" />
                </div>
            </div>
        </main>
    );
}
