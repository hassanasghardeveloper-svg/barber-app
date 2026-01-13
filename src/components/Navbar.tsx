"use client";

import { useState } from "react";
import Link from "next/link";
import { Scissors, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/team", label: "Team" },
        { href: "/about", label: "About" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
    ];

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="fixed top-0 z-[100] w-full bg-neutral-950/90 backdrop-blur-md border-b border-white/5 shadow-2xl transition-all duration-300">
            <div className="container mx-auto px-6 h-20 md:h-28 flex items-center justify-between md:justify-center relative">

                {/* --- MOBILE: Hamburger Button --- */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:text-amber-500">
                        {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </Button>
                </div>

                {/* --- DESKTOP: Left Nav --- */}
                <div className="hidden md:flex items-center gap-12 text-sm font-bold tracking-widest uppercase">
                    <Link href="/" className={clsx("hover:text-amber-500 transition-colors", pathname === "/" ? "text-amber-500" : "text-white")}>Home</Link>
                    <Link href="/about" className={clsx("hover:text-amber-500 transition-colors", pathname === "/about" ? "text-amber-500" : "text-white")}>About</Link>
                    <Link href="/services" className={clsx("hover:text-amber-500 transition-colors", pathname === "/services" ? "text-amber-500" : "text-white")}>Services</Link>
                </div>

                {/* --- CENTER: Logo (Visible on both) --- */}
                <Link href="/" className="flex flex-col items-center group mx-auto md:mx-12" onClick={() => setIsMobileMenuOpen(false)}>
                    <Scissors className="w-8 h-8 md:w-10 md:h-10 text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="font-heading font-black text-2xl md:text-3xl tracking-tighter text-white leading-none group-hover:text-amber-500 transition-colors">
                        PREMIUM<span className="text-amber-500 group-hover:text-white transition-colors">CUTS</span>
                    </span>
                    <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-neutral-500 font-bold">Sialkot</span>
                </Link>

                {/* --- DESKTOP: Right Nav --- */}
                <div className="hidden md:flex items-center gap-12 text-sm font-bold tracking-widest uppercase">
                    <Link href="/team" className={clsx("hover:text-amber-500 transition-colors", pathname === "/team" ? "text-amber-500" : "text-white")}>Team</Link>
                    <Link href="/blog" className={clsx("hover:text-amber-500 transition-colors", pathname === "/blog" ? "text-amber-500" : "text-white")}>Blog</Link>
                    <Link href="/contact" className={clsx("hover:text-amber-500 transition-colors", pathname === "/contact" ? "text-amber-500" : "text-white")}>Contact</Link>
                </div>

                {/* --- MOBILE: Placeholder for right balance (optional) or Book button --- */}
                <div className="md:hidden w-10">
                    {/* Empty div to balance flex justify-between if needed, or put a small book icon here */}
                </div>
            </div>

            {/* --- MOBILE MENU OVERLAY --- */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 top-20 md:top-28 bottom-0 bg-black z-50 flex flex-col items-center pt-12 space-y-8 md:hidden border-t border-white/10 overflow-y-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={clsx(
                                "text-2xl font-black uppercase tracking-widest transition-colors",
                                pathname === link.href ? "text-amber-500" : "text-white hover:text-amber-500"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="w-16 h-1 bg-white/10 rounded-full" />
                    <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="bg-amber-500 text-black font-bold uppercase tracking-widest px-8 py-6 text-lg rounded-none hover:bg-amber-400">
                            Book Now
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    );
}
