"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Lock, AlertCircle } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Login failed");
                return;
            }

            // Success
            router.push("/admin/dashboard");
            router.refresh(); // Refresh to update server components/middleware state
        } catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
            <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="flex justify-center mb-8">
                    <div className="p-4 bg-amber-500/10 rounded-2xl ring-1 ring-amber-500/20">
                        <Lock className="w-8 h-8 text-amber-500" />
                    </div>
                </div>

                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white font-heading">Admin Access</h1>
                    <p className="text-slate-400 text-sm mt-2">Manage your shop and queue.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 ml-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl h-12 px-4 text-white focus:border-amber-500 outline-none transition-colors"
                            placeholder="admin@barber.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400 ml-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl h-12 px-4 text-white focus:border-amber-500 outline-none transition-colors"
                            placeholder="••••••"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <Button type="submit" variant="premium" className="w-full h-12 text-lg font-bold rounded-xl mt-4">
                        Login to Dashboard
                    </Button>
                </form>
            </div>
        </main>
    );
}
