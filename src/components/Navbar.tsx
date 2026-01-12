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
        { href: "/gallery", label: "Gallery" },
        { href: "/team", label: "Team" },
    ];

    return (
        <nav className="fixed top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                        <div className="relative p-2.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl group-hover:scale-105 transition-transform">
                            <Scissors className="w-5 h-5 text-black" />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-heading font-bold text-xl tracking-tight text-white leading-none group-hover:text-amber-400 transition-colors">
                            Premium<span className="text-amber-500">Cuts</span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold group-hover:text-slate-400 transition-colors">
                            Grooming Lens
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "text-sm font-medium transition-all hover:text-amber-500 relative py-1",
                                pathname === link.href ? "text-amber-500" : "text-slate-300"
                            )}
                        >
                            {link.label}
                            {pathname === link.href && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full animate-in fade-in zoom-in duration-300" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/status">
                        <button className="text-sm font-bold text-slate-400 hover:text-white transition-colors">
                            Check Queue
                        </button>
                    </Link>
                    <Link href="/book">
                        <button className="bg-white hover:bg-slate-200 text-black px-6 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all transform hover:-translate-y-0.5">
                            Book Now
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
