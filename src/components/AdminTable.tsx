"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Play, Timer, Ban, MessageCircle } from "lucide-react";

export interface Appointment {
    id: number;
    queueNumber: number;
    name: string;
    phone: string;
    service: string;
    status: "Waiting" | "Serving" | "Done" | "No-Show";
    waitTime: string;
    email?: string | null;
    gender?: string | null;
    barber?: string | null;
}

interface AdminTableProps {
    appointments: Appointment[];
    onUpdateStatus: (id: number, status: Appointment["status"]) => void;
}

export default function AdminTable({ appointments, onUpdateStatus }: AdminTableProps) {

    const sendWhatsapp = (phone: string, name: string, status: string) => {
        if (!phone) {
            alert("No phone number for this customer.");
            return;
        }
        // Basic cleanup of phone number: remove non-digits
        let cleanPhone = phone.replace(/\D/g, '');
        // If it starts with '0', remove it and add default country code '92' (Pakistan) - strictly assumption as per user context
        if (cleanPhone.startsWith('0')) {
            cleanPhone = '92' + cleanPhone.substring(1);
        }

        let message = "";
        if (status === 'Waiting') {
            message = `Hi ${name}, your appointment at Premium Cuts is confirmed. Please be ready!`;
        } else if (status === 'Serving') {
            message = `Hi ${name}, it is your turn at Premium Cuts! Please come to the chair immediately.`;
        } else if (status === 'No-Show') {
            message = `Hi ${name}, we missed you at Premium Cuts. Your appointment has been cancelled.`;
        }

        const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="space-y-4">
            {/* Mobile View (Cards) */}
            <div className="md:hidden space-y-4">
                {appointments.map((apt) => (
                    <div key={apt.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg space-y-3">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <span className="font-mono text-xl font-bold text-white bg-slate-800 px-2 py-1 rounded inline-block mb-2">
                                    #{apt.queueNumber}
                                </span>
                                <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-white text-lg">{apt.name}</h3>
                                    {apt.gender === 'Female' && <span className="text-pink-400 text-xs bg-pink-500/10 px-1.5 py-0.5 rounded">👩</span>}
                                    {apt.gender === 'Male' && <span className="text-blue-400 text-xs bg-blue-500/10 px-1.5 py-0.5 rounded">👨</span>}
                                </div>
                                {apt.phone && (
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-slate-500 text-sm">{apt.phone}</p>
                                        <button
                                            onClick={() => sendWhatsapp(apt.phone, apt.name, 'Serving')}
                                            className="p-1 bg-green-500/10 rounded-full text-green-500 hover:bg-green-500/20"
                                            title="Message on WhatsApp"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className={`px-2 py-1 rounded-lg text-xs font-bold border uppercase tracking-wider
                                ${apt.status === 'Waiting' ? 'text-slate-400 border-slate-700 bg-slate-800' :
                                    apt.status === 'Serving' ? 'text-amber-500 border-amber-500/20 bg-amber-500/10 animate-pulse' :
                                        apt.status === 'Done' ? 'text-green-500 border-green-500/20 bg-green-500/10' :
                                            'text-red-500 border-red-500/20 bg-red-500/10'}`}>
                                {apt.status}
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm py-2 border-t border-slate-800/50 mt-2">
                            <div className="flex flex-col gap-1">
                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300 w-fit`}>
                                    {apt.service}
                                </span>
                                {apt.barber && <span className="text-xs text-slate-500">Barber: <span className="text-amber-500">{apt.barber}</span></span>}
                            </div>
                            <span className="text-slate-500 text-xs">Wait: {apt.waitTime}</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                            {apt.status === 'Waiting' && (
                                <>
                                    <Button
                                        size="sm"
                                        variant="premium"
                                        onClick={() => {
                                            onUpdateStatus(apt.id, 'Serving');
                                            // sendWhatsapp(apt.phone, apt.name, 'Serving'); // Optional: Auto open? Maybe annoying. Let's keep manual button for now.
                                        }}
                                        className="flex-1 bg-amber-500 hover:bg-amber-400 text-black border-none"
                                    >
                                        Start <Play className="w-3 h-3 ml-1 fill-black" />
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onUpdateStatus(apt.id, 'No-Show')}
                                        className="w-10 px-0 text-red-500 bg-red-500/10 hover:bg-red-500/20"
                                    >
                                        <XCircle className="w-5 h-5" />
                                    </Button>
                                </>
                            )}
                            {apt.status === 'Serving' && (
                                <Button
                                    size="sm"
                                    className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold"
                                    onClick={() => onUpdateStatus(apt.id, 'Done')}
                                >
                                    Finish <CheckCircle className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
                {appointments.length === 0 && (
                    <div className="text-center p-8 text-slate-500 bg-slate-900/50 rounded-xl border border-slate-800/50">
                        <p>No appointments pending.</p>
                    </div>
                )}
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
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
                                        <div className="flex items-center gap-2">
                                            <div className="font-medium text-white text-base">{apt.name}</div>
                                            {apt.gender === 'Female' && <span className="text-pink-400 text-xs bg-pink-500/10 px-1.5 py-0.5 rounded cursor-help" title="Female">👩</span>}
                                            {apt.gender === 'Male' && <span className="text-blue-400 text-xs bg-blue-500/10 px-1.5 py-0.5 rounded cursor-help" title="Male">👨</span>}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                            {apt.phone}
                                            {apt.phone && (
                                                <button
                                                    onClick={() => sendWhatsapp(apt.phone, apt.name, 'Serving')}
                                                    className="hover:text-green-500 transition-colors"
                                                    title="Message on WhatsApp"
                                                >
                                                    <MessageCircle className="w-3.5 h-3.5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1 items-start">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border
                                                ${apt.service === 'Haircut' ? 'bg-blue-500/5 text-blue-400 border-blue-500/10' :
                                                    apt.service === 'Beard' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' :
                                                        'bg-purple-500/5 text-purple-400 border-purple-500/10'}`}>
                                                {apt.service}
                                            </span>
                                            {apt.barber && <span className="text-xs text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">with <span className="text-amber-500 font-bold">{apt.barber}</span></span>}
                                        </div>
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
        </div>
    );
}

function ScissorsIcon({ className }: { className?: string }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>
}
