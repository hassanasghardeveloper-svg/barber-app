import Link from "next/link";
import { Scissors, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1 space-y-6">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl">
                                <Scissors className="w-5 h-5 text-black" />
                            </div>
                            <span className="font-heading font-bold text-xl text-white">
                                Premium<span className="text-amber-500">Cuts</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Elevating the art of grooming. Experience a cut above the rest with our master barbers and premium environment.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-all"><Instagram className="w-4 h-4" /></a>
                            <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-all"><Facebook className="w-4 h-4" /></a>
                            <a href="#" className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-amber-500 hover:bg-slate-800 transition-all"><Twitter className="w-4 h-4" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
                            <li><Link href="/services" className="hover:text-amber-500 transition-colors">Services</Link></li>
                            <li><Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
                            <li><Link href="/book" className="hover:text-amber-500 transition-colors">Book Appointment</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>Haircuts & Styling</li>
                            <li>Beard Trimming</li>
                            <li>Hot Towel Shave</li>
                            <li>Facial Treatments</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Visit Us</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                                <span>Paris Road<br />Sialkot, Pakistan</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                                <span>+92 300 1234567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                                <span>booking@premiumcuts.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; 2024 Premium Cuts. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
