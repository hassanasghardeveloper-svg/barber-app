import Link from "next/link";
import { Scissors, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react";

// Helper component for social icons
const SocialIcon = ({ icon: Icon }: { icon: React.ElementType }) => (
    <a href="#" className="p-2 bg-neutral-900 rounded-full text-neutral-400 hover:text-amber-500 hover:bg-neutral-800 transition-all">
        <Icon className="w-4 h-4" />
    </a>
);

export default function Footer() {
    return (
        <footer className="bg-neutral-950 border-t border-neutral-900 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="p-2 bg-neutral-900 rounded-lg group-hover:bg-amber-500 transition-colors">
                                <Scissors className="w-5 h-5 text-white group-hover:text-black" />
                            </div>
                            <span className="font-heading font-bold text-xl text-white">
                                Premium<span className="text-amber-500">Cuts</span>
                            </span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Elevating the art of grooming in Sialkot. Precision cuts, luxury service, and a modern booking experience.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={Instagram} />
                            <SocialIcon icon={Facebook} />
                            <SocialIcon icon={Twitter} />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Explore</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/about" className="hover:text-amber-500 transition-colors">About Us</Link></li>
                            <li><Link href="/team" className="hover:text-amber-500 transition-colors">Our Team</Link></li>
                            <li><Link href="/services" className="hover:text-amber-500 transition-colors">Services Menu</Link></li>
                            <li><Link href="/blog" className="hover:text-amber-500 transition-colors">Grooming Blog</Link></li>
                        </ul>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            <li><Link href="/book" className="hover:text-amber-500 transition-colors">Haircut & Style</Link></li>
                            <li><Link href="/book" className="hover:text-amber-500 transition-colors">Beard Sculpting</Link></li>
                            <li><Link href="/book" className="hover:text-amber-500 transition-colors">Hot Towel Shave</Link></li>
                            <li><Link href="/book" className="hover:text-amber-500 transition-colors">Facial Treatments</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6">Contact</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
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
                                <span>booking@premiumcuts.pk</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
                    <p>© 2024 Premium Cuts Sialkot. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/admin/login" className="hover:text-white transition-colors">Staff Login</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
