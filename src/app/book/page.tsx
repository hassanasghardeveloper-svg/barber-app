"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Check, User, Phone, CheckCircle2, Scissors, Sparkles, Clock, CalendarX, AlertCircle, MessageCircle } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence, Variants } from "framer-motion";

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

const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            staggerChildren: 0.1
        }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

export default function BookingPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [queueData, setQueueData] = useState<{ number: number; waitTime: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isShopClosed, setIsShopClosed] = useState(false);
    const [loadingSettings, setLoadingSettings] = useState(true);
    const [shopPhone, setShopPhone] = useState("");

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

    useEffect(() => {
        async function checkSettings() {
            try {
                const res = await fetch('/api/settings');
                if (res.ok) {
                    const settings = await res.json();
                    if (settings.phone) setShopPhone(settings.phone);

                    // Check if manually closed
                    if (settings.isQueueOpen === false) {
                        setIsShopClosed(true);
                        setLoadingSettings(false);
                        return;
                    }

                    // Check time
                    if (settings.closeTime) {
                        const now = new Date();
                        const [hours, minutes] = settings.closeTime.split(':').map(Number);
                        const closeTime = new Date();
                        closeTime.setHours(hours, minutes, 0);

                        // If close time is tomorrow (e.g. crossing midnight), handle logic appropriately
                        // simplified for same-day close
                        if (now > closeTime) {
                            setIsShopClosed(true);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            } finally {
                setLoadingSettings(false);
            }
        }
        checkSettings();
    }, []);

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

            // 3. Trigger Email Notification
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
            if (error.message.includes("We are closed") || error.message.includes("queue is currently closed")) {
                setIsShopClosed(true);
            } else {
                // Set form error or general error
                form.setError("root", { message: error.message });
            }
        } finally {
            setIsLoading(false);
        }
    }

    if (loadingSettings) {
        return (
            <main className="flex-grow flex items-center justify-center p-4 min-h-[600px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-slate-800 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-slate-400 font-medium animate-pulse">Checking shop status...</p>
                </div>
            </main>
        );
    }

    // Closed State
    if (isShopClosed) {
        return (
            <motion.main
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-grow flex items-center justify-center p-4 min-h-[600px]"
            >
                <div className="max-w-md w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0" />

                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/5">
                        <CalendarX className="w-10 h-10 text-red-500/80" />
                    </div>

                    <h2 className="text-3xl font-heading font-bold text-white mb-3">Shop is Closed</h2>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        We're currently recharging our clippers. <br />
                        Please come back during our opening hours <br />
                        <span className="text-amber-500 font-semibold">10:00 AM - 10:00 PM</span>
                    </p>

                    <div className="space-y-3">
                        <Link href="/" className="block w-full">
                            <Button variant="outline" className="w-full text-slate-300 border-slate-700/50 hover:bg-slate-800 hover:text-white h-12 rounded-xl transition-all duration-300">
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/status" className="block w-full">
                            <Button className="w-full h-12 rounded-xl text-amber-500 hover:bg-amber-500/10" variant="ghost">
                                Check Queue Status
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.main>
        );
    }

    // Success State
    if (isSubmitted && queueData) {
        return (
            <motion.main
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-grow flex items-center justify-center p-4 min-h-[600px]"
            >
                <div className="max-w-md w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl text-center relative overflow-hidden">
                    {/* Success Confetti Effect could go here */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/5 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/30 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]"
                    >
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </motion.div>

                    <h2 className="text-3xl font-heading font-bold text-white mb-2">You're on the list!</h2>
                    <p className="text-slate-400 mb-8 text-sm">A confirmation email has been sent to you.</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/50 flex flex-col items-center justify-center">
                            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-2">Queue Number</p>
                            <p className="text-5xl font-heading font-bold text-amber-500 tracking-tighter">#{queueData.number}</p>
                        </div>
                        <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-800/50 flex flex-col items-center justify-center">
                            <p className="text-slate-500 text-[10px] uppercase tracking-widest font-bold mb-2">Est. Wait</p>
                            <div className="flex items-center gap-1.5 text-blue-400">
                                <Clock className="w-4 h-4" />
                                <p className="text-xl font-bold">{queueData.waitTime}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {shopPhone && (
                            <Button
                                onClick={() => {
                                    const message = `Hi, I just booked appointment #${queueData.number} for ${form.getValues("name")}.`;
                                    window.open(`https://wa.me/${shopPhone}?text=${encodeURIComponent(message)}`, '_blank');
                                }}
                                className="w-full h-14 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl shadow-lg shadow-green-500/20"
                            >
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Send to WhatsApp
                            </Button>
                        )}
                        <Link href="/status" className="block w-full">
                            <Button className="w-full h-14 text-base font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]" variant="premium">
                                Track Live Status
                            </Button>
                        </Link>
                        <Link href="/" className="block w-full">
                            <Button variant="ghost" className="w-full text-slate-500 hover:text-white hover:bg-white/5 h-12 rounded-xl">
                                Return Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.main>
        );
    }

    // Default Booking Form
    return (
        <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden min-h-screen">
            {/* Ambient Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-lg w-full z-10"
            >
                <div className="bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">
                    {/* Header */}
                    <div className="bg-slate-950/30 p-8 pb-6 text-center relative border-b border-white/5">
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                        <h1 className="text-3xl md:text-4xl font-bold text-white font-heading tracking-tight">
                            Secure Your Spot
                        </h1>
                        <p className="text-slate-400 text-sm mt-3 font-light">
                            Premium grooming experience awaits.
                        </p>
                    </div>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-8">
                        {/* Personal Info Group */}
                        <div className="space-y-5">
                            <motion.div variants={itemVariants} className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
                                    <input
                                        {...form.register("name")}
                                        type="text"
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl h-14 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                {form.formState.errors.name && (
                                    <p className="flex items-center gap-1 text-red-400 text-xs ml-1 mt-1">
                                        <AlertCircle className="w-3 h-3" /> {form.formState.errors.name.message}
                                    </p>
                                )}
                            </motion.div>

                            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Phone <span className="text-slate-600 font-normal normal-case">(Optional)</span></label>
                                    <div className="relative group">
                                        <Phone className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                        <input
                                            {...form.register("phone")}
                                            type="tel"
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl h-14 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                                            placeholder="03xx xxxx"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Email</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-4 w-5 h-5 flex items-center justify-center pointer-events-none">
                                            <span className="text-slate-500 group-focus-within:text-amber-500 transition-colors font-serif italic text-lg">@</span>
                                        </div>
                                        <input
                                            {...form.register("email")}
                                            type="email"
                                            className="w-full bg-slate-950/50 border border-slate-800 rounded-2xl h-14 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all font-medium"
                                            placeholder="you@gmail.com"
                                        />
                                    </div>
                                    {form.formState.errors.email && (
                                        <p className="flex items-center gap-1 text-red-400 text-xs ml-1 mt-1">
                                            <AlertCircle className="w-3 h-3" /> {form.formState.errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        {/* Service Selection */}
                        <motion.div variants={itemVariants} className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Select Service</label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { id: "Haircut", icon: Scissors, label: "Haircut" },
                                    { id: "Beard", icon: User, label: "Beard" },
                                    { id: "Both", icon: Sparkles, label: "Full Deal" }
                                ].map((item) => {
                                    const isSelected = form.watch("service") === item.id;
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => form.setValue("service", item.id as any)}
                                            className={clsx(
                                                "relative group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl transition-all duration-300 border",
                                                isSelected
                                                    ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_-5px_rgba(245,158,11,0.5)] scale-[1.02]"
                                                    : "bg-slate-950/50 text-slate-400 border-slate-800 hover:border-slate-600 hover:bg-slate-900"
                                            )}
                                        >
                                            <Icon className={clsx("w-6 h-6 transition-transform", isSelected ? "scale-110" : "group-hover:scale-110")} />
                                            <span className="text-xs font-bold uppercase tracking-wide">{item.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-4">
                            <Button
                                type="submit"
                                variant="premium"
                                className="w-full h-14 text-base font-bold rounded-2xl shadow-xl shadow-amber-500/10 hover:shadow-amber-500/25 transition-all active:scale-[0.98]"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting ? (
                                    <span className="flex items-center gap-3">
                                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                        Processing Order...
                                    </span>
                                ) : "Confirm Appointment"}
                            </Button>
                            {form.formState.errors.root && (
                                <div className="p-3 mt-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-2 text-red-400 text-xs">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <p>{form.formState.errors.root.message}</p>
                                </div>
                            )}
                            <p className="text-center text-[10px] text-slate-600 mt-5">
                                By booking, you agree to our <span className="underline cursor-pointer hover:text-slate-400">Terms of Service</span>.
                            </p>
                        </motion.div>
                    </form>
                </div>
            </motion.div>
        </main>
    );
}
