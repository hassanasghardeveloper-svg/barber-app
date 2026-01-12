"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

interface BookingCalendarProps {
    selectedDate: Date | undefined;
    onDateSelect: (date: Date) => void;
}

export function BookingCalendar({ selectedDate, onDateSelect }: BookingCalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    // Weekday labels
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="w-full max-w-md mx-auto bg-neutral-900/50 border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                    type="button"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                    {format(currentMonth, "MMMM yyyy")}
                </h2>
                <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                    type="button"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 mb-4">
                {weekDays.map((day) => (
                    <div key={day} className="text-center text-xs font-bold text-neutral-500 uppercase tracking-widest">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
                {days.map((day, idx) => {
                    const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isTodayDate = isToday(day);

                    return (
                        <button
                            key={day.toString()}
                            onClick={() => onDateSelect(day)}
                            type="button"
                            className={clsx(
                                "aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all relative overflow-hidden group",
                                !isCurrentMonth && "text-neutral-700 opacity-50",
                                isSelected
                                    ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] scale-105 z-10"
                                    : "text-neutral-300 hover:bg-white/10",
                                isTodayDate && !isSelected && "border border-amber-500/50 text-amber-500"
                            )}
                        >
                            {format(day, "d")}
                            {isSelected && (
                                <div className="absolute inset-0 bg-white/20 animate-pulse rounded-xl" />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 text-center">
                <p className="text-xs text-neutral-500 uppercase tracking-widest">
                    {selectedDate
                        ? `Selected: ${format(selectedDate, "PPPP")}`
                        : "Please select a date"}
                </p>
            </div>
        </div>
    );
}
