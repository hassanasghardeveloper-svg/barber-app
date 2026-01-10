import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    color?: "default" | "amber" | "blue" | "green";
}

export default function StatsCard({ title, value, icon: Icon, trend, trendUp, color = "default" }: StatsCardProps) {
    const colors = {
        default: "text-slate-300",
        amber: "text-amber-500",
        blue: "text-blue-500",
        green: "text-green-500"
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
                <div className={`p-2 bg-slate-950 rounded-xl border border-slate-800 ${colors[color]}`}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
            <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
                {trend && (
                    <span className={`text-xs font-bold px-2 py-1 rounded-full mb-1 ${trendUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                        {trend}
                    </span>
                )}
            </div>
        </div>
    );
}
