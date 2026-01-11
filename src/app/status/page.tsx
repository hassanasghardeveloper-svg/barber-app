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
        setIsLoading(true);
        try {
            const res = await fetch('/api/appointments');
            const data = await res.json();

            // Find user's appointment (search by Phone OR Email)
            // Normalize input queries
            const cleanQuery = query.toLowerCase().trim();

            const myAppts = data.filter((a: any) =>
                (a.phone && a.phone.includes(cleanQuery)) ||
                (a.email && a.email.toLowerCase().includes(cleanQuery))
            );

            // Sort by ID desc if not already
            const myAppt = myAppts.length > 0 ? myAppts[0] : null; // data is sorted desc

            if (!myAppt) {
                alert("No appointment found for this phone or email.");
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
        <main className="flex-grow flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md space-y-8">

                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-heading font-bold text-white">Live Queue Status</h1>
                    <p className="text-slate-400">Enter your Phone or Email to check your turn.</p>
                </div>

                {!status ? (
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Phone or Email..."
                            className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-4 text-white focus:border-amber-500 outline-none h-14 text-lg"
                        />
                        <Button type="submit" variant="premium" className="h-14 w-14 rounded-xl p-0" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin text-black" /> : <Search className="text-black" />}
                        </Button>
                    </form>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
                    >
                        {/* Progress Bar Background */}
                        <div className="absolute top-0 left-0 h-1 w-full bg-slate-800">
                            <div className="h-full bg-amber-500 w-[75%]" />
                        </div>

                        <div className="flex justify-between items-start mb-8 pt-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{status.name}</h3>
                                <div className="flex items-center gap-1 text-sm text-slate-400 mt-1">
                                    <Clock className="w-3 h-3" /> Updated just now
                                </div>
                            </div>
                            <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                                {status.state}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="text-center p-4 bg-slate-950 rounded-2xl border border-slate-800/50">
                                <p className="text-slate-500 text-xs uppercase mb-1 font-semibold">Your Ticket</p>
                                <p className="text-4xl font-bold text-white">#{status.queueNumber}</p>
                            </div>
                            <div className="text-center p-4 bg-slate-950 rounded-2xl border border-slate-800/50">
                                <p className="text-slate-500 text-xs uppercase mb-1 font-semibold">Now Serving</p>
                                <p className="text-4xl font-bold text-slate-500">#{status.currentServing}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Estimated Wait</span>
                                <span className="text-white font-bold text-lg">{status.estWait} mins</span>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-300 text-sm text-center">
                                There are <span className="font-bold text-white">{status.queueNumber - status.currentServing} people</span> ahead of you.
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            className="w-full mt-6 text-slate-500 hover:text-white"
                            onClick={() => setStatus(null)}
                        >
                            Check Another Number
                        </Button>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
