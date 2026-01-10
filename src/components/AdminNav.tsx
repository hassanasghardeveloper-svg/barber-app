"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut, MonitorSmartphone } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminNav() {
    const pathname = usePathname();

    return (
        <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar mask-gradient">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                                        isActive
                                            ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20"
                                            : "text-slate-400 hover:text-white hover:bg-slate-800"
                                    )}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{link.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-4 pl-4 border-l border-slate-800 ml-4">
                        <Link href="/" className="text-sm text-slate-500 hover:text-red-400 flex items-center gap-2" title="Logout">
                            <LogOut className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
