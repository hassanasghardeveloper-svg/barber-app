"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

export default function KioskPage() {
    const [step, setStep] = useState<"IDLE" | "FORM" | "SUCCESS">("IDLE");
    const [name, setName] = useState("");
    const [service, setService] = useState<"Haircut" | "Beard" | "Both">("Haircut");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would sync with the same backend
        // For now simulating a "Walk-In" added to the queue

        // Simulate API delay
        setTimeout(() => {
            setStep("SUCCESS");

            // Auto reset after 3 seconds for next customer
            setTimeout(() => {
                setStep("IDLE");
                setName("");
                setService("Haircut");
            }, 4000);
        }, 500);
    };

    if (step === "SUCCESS") {
        return (
            <main className="min-h-screen bg-green-600 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                <CheckCircle2 className="w-48 h-48 text-white mb-8 animate-bounce" />
                <h1 className="text-6xl font-black text-white uppercase tracking-tighter">You're In!</h1>
                <p className="text-2xl text-green-100 mt-4 font-medium">Please take a seat.</p>
            </main>
        );
    }

    if (step === "FORM") {
        return (
            <main className="min-h-screen bg-slate-950 flex flex-col p-8">
                <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full justify-center space-y-12">
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Enter Your Details</h1>
                        <p className="text-xl text-slate-400">Quick sign-in for walk-in customers.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-2xl font-bold text-slate-300">Your Name</label>
                            <input
                                autoFocus
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-900 border-2 border-slate-700 rounded-2xl h-24 px-8 text-4xl text-white focus:border-amber-500 outline-none transition-all placeholder:text-slate-700 font-bold"
                                placeholder="Name"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-2xl font-bold text-slate-300">Service</label>
                            <div className="grid grid-cols-3 gap-4">
                                {["Haircut", "Beard", "Both"].map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => setService(s as any)}
                                        className={clsx(
                                            "h-32 rounded-2xl text-2xl font-bold transition-all border-4",
                                            service === s
                                                ? "bg-amber-500 text-black border-amber-500 shadow-xl scale-105"
                                                : "bg-slate-900 text-slate-500 border-slate-800"
                                        )}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-8">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setStep("IDLE")}
                                className="h-24 text-2xl text-slate-500 hover:text-white hover:bg-slate-900 rounded-2xl"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="premium"
                                disabled={!name}
                                className="h-24 text-3xl font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-500/20"
                            >
                                Join Queue
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/50 via-slate-950 to-slate-950" />

            <div className="z-10 text-center space-y-12 max-w-4xl w-full">
                <div className="space-y-4">
                    <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 tracking-tighter uppercase font-heading">
                        Welcome
                    </h1>
                    <p className="text-3xl text-amber-500 font-light tracking-widest uppercase">
                        Premium Cuts & Shaves
                    </p>
                </div>

                <div
                    onClick={() => setStep("FORM")}
                    className="group cursor-pointer mx-auto w-full max-w-lg aspect-square rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-2xl flex flex-col items-center justify-center gap-8 hover:scale-105 hover:border-amber-500/50 transition-all duration-500"
                >
                    <div className="w-32 h-32 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform duration-500">
                        <UserPlus className="w-16 h-16 text-black" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold text-white group-hover:text-amber-400 transition-colors">Join Queue</h2>
                        <p className="text-slate-500 text-lg group-hover:text-slate-400">Tap here to sign in</p>
                    </div>
                </div>

                <p className="text-slate-600 text-sm">Touch screen to begin</p>
            </div>
        </main>
    );
}
