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
    phone: z.string().min(8, "Phone number must be valid"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    service: z.enum(["Haircut", "Beard", "Both"]),
    updates: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function BookingPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [queueData, setQueueData] = useState<{ number: number; waitTime: string } | null>(null);

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
        // Simulate API call and Email Trigger
        console.log(values);

        // Calculate Mock Data
        const mockQueueNum = Math.floor(Math.random() * 10) + 40;
        const mockWait = "35 mins";

        // Trigger Email Notification (Non-blocking)
        if (values.email) {
            fetch('/api/notify', {
                method: 'POST',
                body: JSON.stringify({
                    type: 'confirmation',
                    email: values.email,
                    name: values.name,
                    queueNumber: mockQueueNum,
                    waitTime: mockWait
                })
            });
        }

        setTimeout(() => {
            setQueueData({
                number: mockQueueNum,
                waitTime: mockWait,
            });
            setIsSubmitted(true);
        }, 800);
    }

    if (isSubmitted && queueData) {
        return (
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl text-center animate-in zoom-in duration-500">
                    <div className="mx-auto w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/20">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">You're Ordered!</h2>
                    <p className="text-slate-400 mb-8">We've saved your spot. Please arrive shortly.</p>

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
        <main className="flex-grow flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-slate-800/30 p-8 border-b border-slate-800 text-center">
                    <h1 className="text-2xl font-bold text-white font-heading">Secure Your Spot</h1>
                    <p className="text-slate-400 text-sm mt-1">Join the line from the comfort of your home.</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
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
                            <label className="text-sm font-medium text-slate-300 ml-1">Phone Number</label>
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
                            <label className="text-sm font-medium text-slate-300 ml-1">Email <span className="text-slate-600 font-normal">(Optional for updates)</span></label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                                <input
                                    {...form.register("email")}
                                    type="email"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl h-12 pl-10 pr-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all placeholder:text-slate-600"
                                    placeholder="you@email.com"
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
