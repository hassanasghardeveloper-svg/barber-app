"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/StatsCard";
import AdminTable, { Appointment } from "@/components/AdminTable";
import { Users, Timer, BadgeCheck, UserX, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAppointments = async () => {
        try {
            const res = await fetch('/api/appointments');
            const data = await res.json();

            if (!Array.isArray(data)) {
                console.error("API returned non-array data:", data);
                // If specific error from API
                if (data.error) {
                    console.error("Server Error:", data.error);
                }
                return;
            }

            // Transform data to match UI needs
            // Calculate wait times dynamically for "Waiting" customers
            let waitingCount = 0;
            const formatted = data.map((appt: any) => {
                let waitTime = "-";
                if (appt.status === "Waiting") {
                    waitTime = `${waitingCount * 15} min`;
                    waitingCount++;
                }
                return { ...appt, waitTime };
            });
            setAppointments(formatted);
        } catch (error) {
            console.error("Failed to fetch", error);
        } finally {
            setLoading(false);
        }
    };

    // Poll for updates every 5 seconds
    useEffect(() => {
        fetchAppointments();
        const interval = setInterval(fetchAppointments, 5000);
        return () => clearInterval(interval);
    }, []);

    // Derived stats
    const todayTotal = appointments.length;
    const waitingCount = appointments.filter(a => a.status === 'Waiting').length;
    const serving = appointments.find(a => a.status === 'Serving');
    const doneCount = appointments.filter(a => a.status === 'Done').length;

    const handleUpdateStatus = async (id: number, status: Appointment["status"]) => {
        // Optimistic UI update
        const oldAppointments = [...appointments];
        const newAppointments = appointments.map(a => a.id === id ? { ...a, status } : a);
        setAppointments(newAppointments);

        try {
            // Update status in DB
            await fetch(`/api/appointments/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ status })
            });

            const targetAppt = appointments.find(a => a.id === id);

            // Trigger Notifications based on status change
            if (status === 'Serving' && targetAppt?.email) {
                // "Your turn" email
                fetch('/api/notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'notification',
                        email: targetAppt.email,
                        name: targetAppt.name,
                        queueNumber: targetAppt.queueNumber
                    })
                });
            } else if (status === 'No-Show' && targetAppt?.email) {
                // "Missed appointment" email
                fetch('/api/notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'cancellation', // New type
                        email: targetAppt.email,
                        name: targetAppt.name,
                        queueNumber: targetAppt.queueNumber
                    })
                });
            }

            fetchAppointments(); // Re-sync
        } catch (e) {
            setAppointments(oldAppointments); // Revert on error
            alert("Failed to update");
        }
    };

    const handleNextCustomer = async () => {
        // 1. Mark current serving as Done
        if (serving) {
            await fetch(`/api/appointments/${serving.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: 'Done' })
            });
        }

        // 2. Find next waiting
        const nextCustomer = appointments.find(a => a.status === 'Waiting');

        if (nextCustomer) {
            // 3. Mark next as Serving
            await fetch(`/api/appointments/${nextCustomer.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: 'Serving' })
            });

            // 4. Send Email
            if (nextCustomer.email) {
                fetch('/api/notify', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 'notification',
                        email: nextCustomer.email,
                        name: nextCustomer.name,
                        queueNumber: nextCustomer.queueNumber
                    })
                });
            }

            fetchAppointments();
        } else {
            alert("No waiting customers!");
        }
    };

    return (
        <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 relative z-30">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-white">Dashboard</h1>
                    <p className="text-slate-400">Overview of today's queue.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Current Serving Indicator */}
                    <div className="flex items-center gap-4 bg-slate-950 px-6 py-3 rounded-2xl border border-slate-800 shadow-inner">
                        <div className="text-right">
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Serving</p>
                            <p className="text-2xl font-bold text-amber-500 font-mono">#{serving?.queueNumber || '--'}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full ${serving ? 'bg-amber-500 animate-pulse' : 'bg-slate-700'}`} />
                    </div>

                    <Button
                        onClick={handleNextCustomer}
                        variant="premium"
                        className="h-auto py-3 px-8 text-lg shadow-xl shadow-amber-500/10 font-bold"
                        disabled={loading || (waitingCount === 0 && !serving)}
                    >
                        Next Customer <Armchair className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard title="Waiting" value={waitingCount} icon={Timer} trend="Peak time" trendUp={false} color="amber" />
                <StatsCard title="Completed" value={doneCount} icon={BadgeCheck} color="green" />
                <StatsCard title="Total Visits" value={todayTotal} icon={Users} trend="+12%" trendUp={true} color="blue" />
                <StatsCard title="No-Shows" value={0} icon={UserX} trend="Low" trendUp={true} />
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white px-2">Queue Management</h2>
                {loading ? (
                    <div className="text-center p-12 text-slate-500">Loading appointments...</div>
                ) : (
                    <AdminTable appointments={appointments} onUpdateStatus={handleUpdateStatus} />
                )}
            </div>

        </main>
    );
};

export default AdminDashboard;
