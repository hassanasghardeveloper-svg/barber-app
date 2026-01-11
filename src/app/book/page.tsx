"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Check, User, Phone, CheckCircle2, Scissors } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().optional(),
    email: z.string()
        .min(1, "Email is required for updates")
        .email("Invalid email address")
        .refine((email) => email.toLowerCase().endsWith("@gmail.com") || email.toLowerCase().endsWith("@outlook.com"), {
            message: "Only @gmail.com or @outlook.com addresses are accepted",
        }),
    service: z.enum(["Haircut", "Beard", "Both"]),
    updates: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [queueData, setQueueData] = useState<{ number: number; waitTime: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            service: "Haircut",
            updates: false,
        },
    });

    async function onSubmit(values: FormValues) {
        setIsLoading(true);
        try {
            // 1. Create Appointment in DB
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to book");
            }

            const newAppt = await res.json();

            // 2. Mock Wait Time
            const mockWait = "30-45 mins";

            // 3. Trigger Email Notification (Always sent since email is required)
            fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'confirmation',
                    email: values.email,
                    name: values.name,
                    queueNumber: newAppt.queueNumber,
                    waitTime: mockWait
                })
            });

            setQueueData({
                number: newAppt.queueNumber,
                waitTime: mockWait,
            });
            setIsSubmitted(true);
        } catch (error: any) {
            alert(error.message || "Booking failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    if (isSubmitted && queueData) {
        return (
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl text-center animate-in zoom-in duration-500">
                    <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/20">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">You're Ordered!</h2>
                    <p className="text-slate-400 mb-8">Confirmation sent to your email.</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                            <p className="text-slate-500 text-xs uppercase tracking-wider mb-1 font-semibold">Queue Number</p>
                            <p className="text-4xl font-bold text-amber-500">#{queueData.number}</p>
                        </div>
                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
                            <p className="text-slate-500 text-xs uppercase tracking-wider mb-1 font-semibold">Est. Wait</p>
                            <p className="text-4xl font-bold text-blue-500">{queueData.waitTime}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link href="/status" className="block w-full">
                            <Button className="w-full h-12 text-lg" variant="premium">Track Status Live</Button>
                        </Link>
                        <Link href="/" className="block w-full">
                            <Button variant="ghost" className="w-full text-slate-500 hover:text-white">Back to Home</Button>
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Blob for aesthetics */}
            <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] animate-blob animation-delay-2000 pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-blob pointer-events-none" />

            <div className="max-w-md w-full glass backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/5 overflow-hidden z-10 animate-in slide-in-from-bottom-4 duration-700">
                <div className="bg-slate-900/50 p-8 border-b border-white/5 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
                    <h1 className="text-3xl font-bold text-white font-heading text-glow">Secure Your Spot</h1>
                    <p className="text-slate-400 text-sm mt-2">Join the line from the comfort of your home.</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Full Name <span className="text-amber-500">*</span></label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input
                                    {...form.register("name")}
                                    type="text"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl h-12 pl-10 pr-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="e.g. Hassan Ali"
                                />
                            </div>
                            {form.formState.errors.name && (
                                <p className="text-red-400 text-xs ml-1">{form.formState.errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Phone Number <span className="text-slate-600 font-normal">(Optional)</span></label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input
                                    {...form.register("phone")}
                                    type="tel"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl h-12 pl-10 pr-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="05x xxx xxxx"
                                />
                            </div>
                            {form.formState.errors.phone && (
                                <p className="text-red-400 text-xs ml-1">{form.formState.errors.phone.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email <span className="text-amber-500">*</span></label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input
                                    {...form.register("email")}
                                    type="email"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl h-12 pl-10 pr-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="you@gmail.com"
                                />
                            </div>
                            {form.formState.errors.email && (
                                <p className="text-red-400 text-xs ml-1">{form.formState.errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Select Service</label>
                            <div className="grid grid-cols-3 gap-3">
                                {["Haircut", "Beard", "Both"].map((service) => (
                                    <button
                                        key={service}
                                        type="button"
                                        onClick={() => form.setValue("service", service as any)}
                                        className={clsx(
                                            "h-12 rounded-xl text-sm font-medium transition-all border",
                                            form.watch("service") === service
                                                ? "bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/20 scale-[1.02]"
                                                : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                                        )}
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button type="submit" variant="premium" className="w-full h-14 text-lg font-bold rounded-xl" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Processing...
                                </span>
                            ) : "Confirm Appointment"}
                        </Button>
                        <p className="text-center text-xs text-slate-500 mt-4">
                            By booking, you agree to our Terms of Service.
                        </p>
                    </div>
                </form>
            </div>
        </main>
    );
}
