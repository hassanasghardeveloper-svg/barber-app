"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Clock, User } from "lucide-react";
import clsx from "clsx";

export default function MobileNav() {
    const pathname = usePathname();

    const tabs = [
        { name: "Home", href: "/", icon: Home },
        { name: "Book", href: "/book", icon: CalendarDays },
        { name: "Status", href: "/status", icon: Clock },
        // { name: "Profile", href: "/profile", icon: User }, // Reserved for future
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800 pb-safe">
            <div className="flex justify-around items-center h-16">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.href;
                    const Icon = tab.icon;
                    return (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                isActive ? "text-amber-500" : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <Icon className={clsx("w-6 h-6 transition-transform", isActive && "scale-110")} />
                            <span className="text-[10px] font-medium tracking-wide">{tab.name}</span>
                            {isActive && (
                                <span className="absolute bottom-1 w-1 h-1 bg-amber-500 rounded-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
