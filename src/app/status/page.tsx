"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Loader2, User, Clock, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatusPage() {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<any>(null);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!query.trim()) {
            alert("Please enter your Phone, Email, or Queue Number.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch('/api/appointments');
            const data = await res.json();

            // Find user's appointment (search by Phone OR Email OR Queue Number)
            // Normalize input queries
            const cleanQuery = query.toLowerCase().trim();
            const isQueueNumber = !isNaN(Number(cleanQuery)) && cleanQuery !== "";

            const myAppts = data.filter((a: any) =>
                (a.phone && a.phone.includes(cleanQuery)) ||
                (a.email && a.email.toLowerCase().includes(cleanQuery)) ||
                (isQueueNumber && a.queueNumber === Number(cleanQuery))
            );

            // Sort by ID desc if not already
            const myAppt = myAppts.length > 0 ? myAppts[0] : null; // data is sorted desc

            if (!myAppt) {
                alert("No appointment found for this phone, email, or queue number.");
                setIsLoading(false);
                return;
            }

            // Find current serving
            const servingAppt = data.find((a: any) => a.status === 'Serving');
            const currentServingNum = servingAppt ? servingAppt.queueNumber :
                data.find((a: any) => a.status === 'Done')?.queueNumber || 0;

            // Calculate people ahead
            // Filter appointments that are "Waiting" (or "Serving") and have queueNumber < myNumber
            const ahead = data.filter((a: any) =>
                (a.status === 'Waiting' || a.status === 'Serving') &&
                a.queueNumber < myAppt.queueNumber
            ).length;

            setStatus({
                name: myAppt.name,
                queueNumber: myAppt.queueNumber,
                currentServing: currentServingNum || (myAppt.queueNumber - ahead - 1), // fallback
                estWait: myAppt.status === 'Waiting' ? ahead * 15 : 0,
                state: myAppt.status.toLowerCase(), // waiting, serving, done
                peopleAhead: ahead // Store this to display
            });
        } catch (error) {
            console.error(error);
            alert("Error checking status");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="flex-grow flex flex-col items-center justify-center p-6 relative overflow-hidden min-h-screen">
            {/* Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />
            </div>

            <div className="w-full max-w-md space-y-8 z-10 relative">

                {!status ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl"
                    >
                        <div className="text-center space-y-2 mb-8">
                            <h1 className="text-3xl font-heading font-bold text-white">Check Your Status</h1>
                            <p className="text-slate-400 text-sm">Enter your details to track your cut.</p>
                        </div>

                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="relative group">
                                <Search className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Phone, Email, or Queue #..."
                                    className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl h-14 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                                />
                            </div>
                            <Button type="submit" variant="premium" className="w-full h-14 rounded-2xl font-bold text-lg shadow-lg shadow-amber-500/20" disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" /> Checking...
                                    </span>
                                ) : "Track Status"}
                            </Button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden"
                    >
                        {/* Progress Bar Background */}
                        <div className="absolute top-0 left-0 h-1 w-full bg-slate-800/50">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                            />
                        </div>

                        <div className="flex justify-between items-start mb-8 pt-4">
                            <div>
                                <h3 className="text-2xl font-heading font-bold text-white tracking-tight">{status.name}</h3>
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 font-medium bg-slate-950/30 px-2 py-1 rounded-md w-fit">
                                    <Clock className="w-3 h-3 text-amber-500" /> Updated just now
                                </div>
                            </div>
                            <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20">
                                {status.state}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="text-center p-5 bg-slate-950/50 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                                <p className="text-slate-500 text-[10px] uppercase mb-1 font-bold tracking-widest">Your Ticket</p>
                                <p className="text-4xl font-heading font-bold text-white">#{status.queueNumber}</p>
                            </div>
                            <div className="text-center p-5 bg-slate-950/50 rounded-2xl border border-slate-800/50 backdrop-blur-sm">
                                <p className="text-slate-500 text-[10px] uppercase mb-1 font-bold tracking-widest">Now Serving</p>
                                <p className="text-4xl font-heading font-bold text-slate-500">#{status.currentServing}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm px-1">
                                <span className="text-slate-400 font-medium">Estimated Wait Time</span>
                                <span className="text-white font-bold text-lg tracking-tight">{status.estWait} mins</span>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20 text-blue-200 text-sm text-center font-medium">
                                <span className="block text-xs uppercase text-blue-400/70 mb-1 tracking-widest font-bold">Queue Position</span>
                                <span className="text-xl text-white font-bold">{status.queueNumber - status.currentServing}</span> people ahead of you
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            className="w-full mt-6 text-slate-400 hover:text-white hover:bg-white/5 h-12 rounded-xl"
                            onClick={() => setStatus(null)}
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Check Another Number
                        </Button>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
