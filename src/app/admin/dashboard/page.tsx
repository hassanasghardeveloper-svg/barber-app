"use client";

import { useState } from "react";
import StatsCard from "@/components/StatsCard";
import AdminTable, { Appointment } from "@/components/AdminTable";
import { Users, Timer, BadgeCheck, UserX, Armchair } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock Data
const INITIAL_DATA: Appointment[] = [
    { id: 1, queueNumber: 101, name: "Ahmed Ali", phone: "0501234567", service: "Haircut", status: "Serving", waitTime: "0 min" },
    { id: 2, queueNumber: 102, name: "Khalid Omer", phone: "0559876543", service: "Beard", status: "Waiting", waitTime: "15 min" },
    { id: 3, queueNumber: 103, name: "John Smith", phone: "0521112222", service: "Both", status: "Waiting", waitTime: "30 min" },
    { id: 4, queueNumber: 104, name: "Mike Ross", phone: "0504445555", service: "Haircut", status: "Waiting", waitTime: "45 min" },
    { id: 5, queueNumber: 99, name: "Sarah J", phone: "0506667777", service: "Haircut", status: "Done", waitTime: "-" },
];

export default function AdminDashboard() {
    const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_DATA);

    // Derived stats
    const todayTotal = appointments.length;
    const waitingCount = appointments.filter(a => a.status === 'Waiting').length;
    const serving = appointments.find(a => a.status === 'Serving');
    const doneCount = appointments.filter(a => a.status === 'Done').length;

    const handleUpdateStatus = (id: number, status: Appointment["status"]) => {
        // Optimization: If starting a new service, mark the current "Serving" as "Done" automatically?
        // Let's keep it manual or smart. Smart is better.
        let newApps = [...appointments];

        if (status === 'Serving') {
            // Mark currently serving as done
            newApps = newApps.map(a =>
                (a.status === 'Serving' && a.id !== id) ? { ...a, status: 'Done' } : a
            );
        }

        newApps = newApps.map(a => a.id === id ? { ...a, status } : a);
        setAppointments(newApps);
    };

    const handleNextCustomer = () => {
        // Complete current
        let newApps = appointments.map(a =>
            a.status === 'Serving' ? { ...a, status: 'Done' as const } : a
        );

        // Find next waiting manually
        const nextIdx = newApps.findIndex(a => a.status === 'Waiting');

        if (nextIdx !== -1) {
            newApps[nextIdx] = { ...newApps[nextIdx], status: 'Serving' };

            // Trigger "Your Turn" Email
            const customer = newApps[nextIdx];
            if (customer.name !== "Walk-in") {
                // Mock email
                const mockEmail = `demo@example.com`;
                fetch('/api/notify', {
                    method: 'POST',
                    body: JSON.stringify({
                        type: 'notification',
                        email: mockEmail,
                        name: customer.name,
                        queueNumber: customer.queueNumber
                    })
                });
            }

        } else {
            alert("No waiting customers!");
        }

        setAppointments(newApps);
    };

    return (
        <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
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
                        disabled={waitingCount === 0 && !serving}
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
                <AdminTable appointments={appointments} onUpdateStatus={handleUpdateStatus} />
            </div>

        </main>
    );
}
