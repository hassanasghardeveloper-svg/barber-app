"use client";

import clsx from "clsx";
import { Clock } from "lucide-react";

interface TimeSlotPickerProps {
    selectedTime: string | undefined;
    onTimeSelect: (time: string) => void;
}

export function TimeSlotPicker({ selectedTime, onTimeSelect }: TimeSlotPickerProps) {
    // Generate static slots for demo (Every 30 mins from 12:00 PM to 8:00 PM for example)
    // Client requested: "12 - 12:30", "12:30 - 1:00", etc.
    const slots = [
        "10:00 AM - 10:30 AM",
        "10:30 AM - 11:00 AM",
        "11:00 AM - 11:30 AM",
        "11:30 AM - 12:00 PM",
        "12:00 PM - 12:30 PM",
        "12:30 PM - 01:00 PM",
        "01:00 PM - 01:30 PM",
        "01:30 PM - 02:00 PM",
        "02:00 PM - 02:30 PM",
        "02:30 PM - 03:00 PM",
        "03:00 PM - 03:30 PM",
        "03:30 PM - 04:00 PM",
        "04:00 PM - 04:30 PM",
        "04:30 PM - 05:00 PM",
        "05:00 PM - 05:30 PM",
        "05:30 PM - 06:00 PM",
        "06:00 PM - 06:30 PM",
        "06:30 PM - 07:00 PM",
        "07:00 PM - 07:30 PM",
        "07:30 PM - 08:00 PM",
        "08:00 PM - 08:30 PM",
        "08:30 PM - 09:00 PM",
        "09:00 PM - 09:30 PM",
        "09:30 PM - 10:00 PM",
    ];

    return (
        <div className="w-full max-w-md mx-auto mt-6">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" /> Available Slots
            </h3>

            <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {slots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                        <button
                            key={slot}
                            type="button"
                            onClick={() => onTimeSelect(slot)}
                            className={clsx(
                                "py-3 px-4 rounded-xl border text-xs font-bold transition-all text-center",
                                isSelected
                                    ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                                    : "bg-neutral-900/50 text-neutral-400 border-white/10 hover:bg-neutral-800 hover:text-white"
                            )}
                        >
                            {slot}
                        </button>
                    );
                })}
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05); 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2); 
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(245, 158, 11, 0.5); 
                }
            `}</style>
        </div>
    );
}
