import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="bg-neutral-950 min-h-screen pt-20">
            {/* --- HERO HEADER --- */}
            <section className="relative py-24 text-center bg-neutral-950 overflow-hidden">
                <div className="relative z-10 px-6">
                    <h2 className="text-amber-500 font-bold tracking-[0.4em] uppercase mb-4 text-sm">Location & Support</h2>
                    <h1 className="text-5xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter">Contact Us</h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-6" />
                </div>
            </section>

            <section className="py-16 container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-0 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">

                    {/* Left: Contact Info & Form */}
                    <div className="bg-neutral-900 p-12 md:p-16">
                        <h2 className="text-3xl font-black text-white uppercase mb-8">Get In Touch</h2>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-neutral-800 rounded-lg text-amber-500">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase">Sialkot Downtown</h4>
                                    <p className="text-neutral-400">Paris Road, Sialkot 51310, Pakistan</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-neutral-800 rounded-lg text-amber-500">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase">Phone</h4>
                                    <p className="text-neutral-400">+92 300 1234567</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-neutral-800 rounded-lg text-amber-500">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold uppercase">Email</h4>
                                    <p className="text-neutral-400">booking@premiumcuts.pk</p>
                                </div>
                            </div>
                        </div>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input placeholder="First Name" className="w-full bg-neutral-800 border border-neutral-700 h-12 px-4 text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none rounded-md" />
                                <input placeholder="Last Name" className="w-full bg-neutral-800 border border-neutral-700 h-12 px-4 text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none rounded-md" />
                            </div>
                            <input placeholder="Email Address" className="w-full bg-neutral-800 border border-neutral-700 h-12 px-4 text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none rounded-md" />
                            <textarea placeholder="Message" className="w-full bg-neutral-800 border border-neutral-700 min-h-[120px] p-4 text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none rounded-md" />
                            <Button className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-black font-bold uppercase tracking-widest rounded-none">
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Right: Map */}
                    <div className="relative min-h-[500px] bg-neutral-800">
                        <img
                            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=2000&q=80"
                            alt="Map Location"
                            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative">
                                <div className="w-4 h-4 bg-amber-500 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                <MapPin className="w-12 h-12 text-amber-500 relative z-10 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
