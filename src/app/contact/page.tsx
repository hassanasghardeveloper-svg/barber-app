import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-4">
                        Visit <span className="text-amber-500">Premium Cuts</span>
                    </h1>
                    <p className="text-slate-400">We are conveniently located in the heart of Sialkot.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        Paris Road, Near City Hardware,<br />
                                        Sialkot, Pakistan 51310
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Contact</h3>
                                    <p className="text-slate-400">
                                        +92 300 1234567<br />
                                        booking@premiumcuts.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Hours</h3>
                                    <div className="text-slate-400 space-y-1">
                                        <p className="flex justify-between w-48"><span>Mon - Sat:</span> <span className="text-white">10:00 AM - 10:00 PM</span></p>
                                        <p className="flex justify-between w-48"><span>Sunday:</span> <span className="text-white">12:00 PM - 9:00 PM</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link href="/book" className="block">
                            <Button size="lg" className="w-full h-14 bg-white text-black hover:bg-amber-500 font-bold rounded-2xl text-lg">
                                Book an Appointment Now
                            </Button>
                        </Link>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-full min-h-[400px] bg-slate-800 rounded-3xl overflow-hidden grayscale invert border border-slate-700 relative group">
                        {/* Embed Google Map here in production */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108000.0!2d74.5!3d32.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f1e0955555555%3A0x1234567890abcdef!2sSialkot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            loading="lazy"
                            className="absolute inset-0 border-0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </main>
    );
}
