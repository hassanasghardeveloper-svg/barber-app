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
                <Link href="/" className="mx-16 relative group">
                    <div className="relative w-24 h-24 bg-slate-950 border-4 border-amber-500/30 rounded-full flex items-center justify-center z-10 shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:border-amber-500 group-hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] transition-all duration-500 transform translate-y-4">
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-slate-950 px-2 text-[10px] uppercase font-bold text-amber-500 tracking-widest whitespace-nowrap">Est. 2024</div>
                        <Scissors className="w-10 h-10 text-white group-hover:text-amber-500 transition-colors" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-slate-950 px-2 text-[10px] uppercase font-bold text-amber-500 tracking-widest whitespace-nowrap">Sialkot</div>
                    </div>
                    {/* Decorative Wings/Ribbons (CSS Shapes or Icons) - Optional for complexity, keeping simple but premium */}
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
