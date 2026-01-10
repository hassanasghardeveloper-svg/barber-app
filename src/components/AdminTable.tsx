"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Play, Timer, Ban } from "lucide-react";

export interface Appointment {
    id: number;
    queueNumber: number;
    name: string;
    phone: string;
    service: string;
    status: "Waiting" | "Serving" | "Done" | "No-Show";
    waitTime: string;
}

interface AdminTableProps {
    appointments: Appointment[];
    onUpdateStatus: (id: number, status: Appointment["status"]) => void;
}

export default function AdminTable({ appointments, onUpdateStatus }: AdminTableProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-400">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-950/50 border-b border-slate-800">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Queue #</th>
                            <th className="px-6 py-4 font-semibold">Customer</th>
                            <th className="px-6 py-4 font-semibold">Service</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {appointments.map((apt) => (
                            <tr key={apt.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-mono text-lg font-bold text-white bg-slate-800 px-2 py-1 rounded">
                                        #{apt.queueNumber}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-white text-base">{apt.name}</div>
                                    <div className="text-xs text-slate-500 mt-0.5">{apt.phone}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border
                                        ${apt.service === 'Haircut' ? 'bg-blue-500/5 text-blue-400 border-blue-500/10' :
                                            apt.service === 'Beard' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' :
                                                'bg-purple-500/5 text-purple-400 border-purple-500/10'}`}>
                                        {apt.service}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center gap-2 font-medium
                                        ${apt.status === 'Waiting' ? 'text-slate-400' :
                                            apt.status === 'Serving' ? 'text-amber-500 animate-pulse' :
                                                apt.status === 'Done' ? 'text-green-500' : 'text-red-500'}`}>

                                        {apt.status === 'Waiting' && <Timer className="w-4 h-4" />}
                                        {apt.status === 'Serving' && <ScissorsIcon className="w-4 h-4" />}
                                        {apt.status === 'Done' && <CheckCircle className="w-4 h-4" />}
                                        {apt.status === 'No-Show' && <Ban className="w-4 h-4" />}

                                        {apt.status}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {apt.status === 'Waiting' && (
                                            <>
                                                <Button
                                                    size="sm"
                                                    variant="premium"
                                                    onClick={() => onUpdateStatus(apt.id, 'Serving')}
                                                    className="h-9 px-3 text-xs bg-amber-500 hover:bg-amber-400 border-none text-black"
                                                >
                                                    Start <Play className="w-3 h-3 ml-1 fill-black" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => onUpdateStatus(apt.id, 'No-Show')}
                                                    className="h-9 w-9 p-0 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                                                    title="Mark No-Show"
                                                >
                                                    <XCircle className="w-5 h-5" />
                                                </Button>
                                            </>
                                        )}
                                        {apt.status === 'Serving' && (
                                            <Button
                                                size="sm"
                                                className="h-9 px-4 bg-green-600 hover:bg-green-500 text-white font-bold"
                                                onClick={() => onUpdateStatus(apt.id, 'Done')}
                                            >
                                                Finish <CheckCircle className="w-4 h-4 ml-2" />
                                            </Button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {appointments.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="p-3 bg-slate-800 rounded-full">
                                            <Timer className="w-6 h-6 text-slate-600" />
                                        </div>
                                        <p>No appointments in queue.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function ScissorsIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>
}
