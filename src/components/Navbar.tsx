"use client";

import Link from "next/link";
import { Scissors } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { href: "/", label: "Home" },
        { href: "/services", label: "Services" },
        { href: "/team", label: "Barbers" },
        { href: "/about", label: "About" },
        { href: "/reviews", label: "Reviews" },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <nav className="fixed top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-white/5 shadow-2xl transition-all duration-300">
            <div className="container mx-auto px-6 h-28 flex items-center justify-center relative">

                {/* Left Navigation */}
                <div className="hidden md:flex items-center gap-12 text-sm font-bold tracking-widest uppercase">
                    <Link href="/" className={clsx("hover:text-amber-500 transition-colors", pathname === "/" ? "text-amber-500" : "text-white")}>
                        Home
                    </Link>
                    <Link href="/about" className={clsx("hover:text-amber-500 transition-colors", pathname === "/about" ? "text-amber-500" : "text-white")}>
                        About
                    </Link>
                    <Link href="/services" className={clsx("hover:text-amber-500 transition-colors", pathname === "/services" ? "text-amber-500" : "text-white")}>
                        Services
                    </Link>
                </div>

                {/* Center Badge Logo */}
                <Link href="/" className="mx-12 flex flex-col items-center group">
                    <Scissors className="w-10 h-10 text-amber-500 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="font-heading font-black text-3xl tracking-tighter text-white leading-none group-hover:text-amber-500 transition-colors">
                        PREMIUM<span className="text-amber-500 group-hover:text-white transition-colors">CUTS</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-bold">Sialkot</span>
                </Link>

                {/* Right Navigation */}
                <div className="hidden md:flex items-center gap-12 text-sm font-bold tracking-widest uppercase">
                    <Link href="/team" className={clsx("hover:text-amber-500 transition-colors", pathname === "/team" ? "text-amber-500" : "text-white")}>
                        Team
                    </Link>
                    <Link href="/blog" className={clsx("hover:text-amber-500 transition-colors", pathname === "/blog" ? "text-amber-500" : "text-white")}>
                        Blog
                    </Link>
                    <Link href="/contact" className={clsx("hover:text-amber-500 transition-colors", pathname === "/contact" ? "text-amber-500" : "text-white")}>
                        Contact
                    </Link>
                </div>

                {/* Mobile Menu Icon (Absolute Right) */}
                {/* Note: MobileNav component is handled in layout, but typically we need a hamburger here for mobile. 
                     Since the prompt asks for header 'like that' (desktop reference), we focus on desktop layout.
                     The existing MobileNav is typically fixed at bottom or separate. We leave layout generic for mobile. */}
            </div>
        </nav>
    );
}
