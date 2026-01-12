"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Check, User, Phone, CheckCircle2, Scissors, Sparkles, Clock, CalendarX, AlertCircle, MessageCircle, ArrowLeft, Users } from "lucide-react";
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
    service: z.string(),
    gender: z.enum(["Male", "Female"]),
    barber: z.string(),
    updates: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const stepVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

export default function BookingPage() {
    const [step, setStep] = useState(1);
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
            gender: "Male" as any, // Default, but user will pick
            barber: "Any Professional",
            updates: false,
        },
    });

    // Watch values for conditional rendering
    const selectedGender = form.watch("gender");

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
            const mockWait = "30-45 mins";

            // Trigger Email (Optimistic)
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
                form.setError("root", { message: error.message });
            }
        } finally {
            setIsLoading(false);
        }
    }

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    // --- Loading & Closed States ---
    if (loadingSettings) {
        return (
            <main className="flex-grow flex items-center justify-center p-4 min-h-[600px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-slate-800 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-amber-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                </div>
            </main>
        );
    }

    if (isShopClosed) {
        return (
            <main className="flex-grow flex items-center justify-center p-4 min-h-[600px]">
                <div className="max-w-md w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl text-center relative overflow-hidden">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/5">
                        <CalendarX className="w-10 h-10 text-red-500/80" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-3">Shop is Closed</h2>
                    <p className="text-slate-400 mb-8">Please come back during our opening hours <span className="text-amber-500 font-semibold">10:00 AM - 10:00 PM</span></p>
                    <Link href="/"><Button variant="outline" className="w-full">Back to Home</Button></Link>
                </div>
            </main>
        );
    }

    // --- Success State ---
    if (isSubmitted && queueData) {

        // Helper to ensure phone number format is International
        const formatShopPhone = (phone: string) => {
            let clean = phone.replace(/\D/g, ''); // Remove all non-digits
            // If it starts with '03', likely Pakistan local format: replace '0' with '92'
            if (clean.startsWith('03')) {
                clean = '92' + clean.substring(1);
            }
            // If it's still missing '92' but is 10 digits (e.g. 3001234567), prepend 92
            if (clean.length === 10 && !clean.startsWith('92')) {
                clean = '92' + clean;
            }
            return clean;
        };

        const whatsappLink = shopPhone
            ? `https://wa.me/${formatShopPhone(shopPhone)}?text=${encodeURIComponent(`Hi, I just booked appointment #${queueData.number} for ${form.getValues("name")}.`)}`
            : "";

        return (
            <main className="flex-grow flex items-center justify-center p-4 min-h-[600px]">
                <div className="max-w-md w-full bg-slate-900/40 backdrop-blur-2xl border border-slate-800/80 rounded-[2rem] p-8 shadow-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/5 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/30">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </motion.div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">You're on the list!</h2>
                    <p className="text-slate-400 mb-8 text-sm">A confirmation email has been sent.</p>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Queue #</p>
                            <p className="text-4xl font-bold text-amber-500">#{queueData.number}</p>
                        </div>
                        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
                            <p className="text-slate-500 text-[10px] uppercase font-bold mb-1">Est. Wait</p>
                            <p className="text-xl font-bold text-blue-400 pt-2">{queueData.waitTime}</p>
                        </div>
                    </div>
                    {shopPhone && (
                        <Button
                            onClick={() => window.open(whatsappLink, '_blank')}
                            className="w-full mb-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl"
                        >
                            <MessageCircle className="w-5 h-5 mr-2" /> Send to WhatsApp
                        </Button>
                    )}
                    <Link href="/status"><Button className="w-full mb-3" variant="premium">Track Status</Button></Link>
                    <Link href="/"><Button variant="ghost" className="w-full text-slate-500">Return Home</Button></Link>
                </div>
            </main>
        );
    }

    // --- Wizard Form ---
    return (
        <main className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 pb-24 md:pb-4 bg-slate-950/50 md:bg-transparent md:static md:inset-auto md:z-auto md:min-h-screen">
            {/* Background (Fixed for mobile) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen animate-blob" />
            </div>

            <div className="w-full max-w-lg z-10 flex flex-col h-full md:h-auto justify-center md:block relative">
                <div className="bg-slate-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/5 overflow-hidden flex flex-col h-full md:h-auto md:min-h-[500px]">

                    {/* Progress Header */}
                    <div className="bg-slate-950/50 p-6 border-b border-white/5 flex items-center justify-between shrink-0">
                        <div className="w-10">
                            {step > 1 && (
                                <button onClick={prevStep} className="p-2 hover:bg-white/5 rounded-full transition-colors -ml-2">
                                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                                </button>
                            )}
                        </div>

                        <div className="text-center">
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Step {step} of 3</span>
                            <h2 className="text-lg font-bold text-white mt-0.5">
                                {step === 1 && "Choose Gender"}
                                {step === 2 && "Select Barber"}
                                {step === 3 && "Final Details"}
                            </h2>
                        </div>
                        <div className="w-10" />
                    </div>

                    <div className="p-6 md:p-8 flex-grow flex flex-col overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: GENDER */}
                            {step === 1 && (
                                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-4 flex-grow h-full justify-center">
                                    <button
                                        onClick={() => { form.setValue("gender", "Male"); nextStep(); }}
                                        className="group relative flex-1 max-h-[200px] w-full bg-slate-800/50 hover:bg-slate-800 border-2 border-slate-700 hover:border-amber-500 rounded-3xl transition-all flex items-center justify-center px-6"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="bg-blue-500/20 p-4 rounded-2xl group-hover:bg-blue-500/30 transition-colors shrink-0">
                                                <User className="w-8 h-8 text-blue-400" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">Male</h3>
                                                <p className="text-slate-400 text-sm">Haircuts & trimming</p>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => { form.setValue("gender", "Female"); nextStep(); }}
                                        className="group relative flex-1 max-h-[200px] w-full bg-slate-800/50 hover:bg-slate-800 border-2 border-slate-700 hover:border-pink-500 rounded-3xl transition-all flex items-center justify-center px-6"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="bg-pink-500/20 p-4 rounded-2xl group-hover:bg-pink-500/30 transition-colors shrink-0">
                                                <User className="w-8 h-8 text-pink-400" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-2xl font-bold text-white group-hover:text-pink-500 transition-colors">Female</h3>
                                                <p className="text-slate-400 text-sm">Styling & treatments</p>
                                            </div>
                                        </div>
                                    </button>
                                </motion.div>
                            )}

                            {/* STEP 2: BARBER */}
                            {step === 2 && (
                                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col flex-grow h-full justify-center space-y-4">
                                    <p className="text-slate-400 text-sm text-center mb-2">Select a professional or choose 'Any'.</p>

                                    <button
                                        onClick={() => { form.setValue("barber", "Any Professional"); nextStep(); }}
                                        className="w-full p-6 bg-amber-500 text-black font-bold rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-between group hover:brightness-110 transition-all shrink-0"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="bg-black/10 p-2 rounded-xl shrink-0"><Sparkles className="w-6 h-6" /></div>
                                            <div className="text-left">
                                                <div className="text-lg leading-tight">Any Professional</div>
                                                <div className="text-xs opacity-75 font-normal">Fastest service (Recommended)</div>
                                            </div>
                                        </div>
                                        <ArrowLeft className="w-5 h-5 rotate-180 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-grow content-start">
                                        {(selectedGender === "Male" ? ["Ali", "Hassan", "Ahmed"] : ["Sarah", "Fatima"]).map((name) => (
                                            <button
                                                key={name}
                                                onClick={() => { form.setValue("barber", name); nextStep(); }}
                                                className="aspect-square p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-2xl transition-all flex flex-col items-center justify-center gap-2 text-center"
                                            >
                                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-lg font-bold text-slate-300">
                                                    {name[0]}
                                                </div>
                                                <span className="font-bold text-white text-sm">{name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: DETAILS */}
                            {step === 3 && (
                                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col flex-grow h-full">
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full gap-4">
                                        {/* Services */}
                                        <div className="space-y-2 shrink-0">
                                            <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Select Service</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {(selectedGender === "Male"
                                                    ? [
                                                        { id: "Haircut", label: "Haircut" },
                                                        { id: "Beard", label: "Beard Trim" },
                                                        { id: "Both", label: "Full Package" },
                                                        { id: "Facial", label: "Facial" }
                                                    ]
                                                    : [
                                                        { id: "Haircut", label: "Haircut" },
                                                        { id: "BlowDry", label: "Blow Dry" },
                                                        { id: "Styling", label: "Hair Styling" },
                                                        { id: "Treatment", label: "Treatment" }
                                                    ]
                                                ).map((item) => {
                                                    const isSelected = form.watch("service") === item.id;
                                                    return (
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            onClick={() => form.setValue("service", item.id as any)}
                                                            className={clsx(
                                                                "p-3 rounded-xl border text-xs md:text-sm font-bold transition-all h-12 flex items-center justify-center text-center leading-tight",
                                                                isSelected
                                                                    ? "bg-amber-500 text-black border-amber-500"
                                                                    : "bg-slate-950/50 text-slate-400 border-slate-800 hover:bg-slate-900"
                                                            )}
                                                        >
                                                            {item.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Inputs */}
                                        <div className="space-y-4 flex-grow content-center">
                                            <div className="space-y-1">
                                                <input {...form.register("name")} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl h-12 px-4 text-white focus:border-amber-500 outline-none text-sm placeholder:text-slate-600" placeholder="Your Full Name *" />
                                                {form.formState.errors.name && <p className="text-red-400 text-xs">{form.formState.errors.name.message}</p>}
                                            </div>
                                            <div className="space-y-3">
                                                <input {...form.register("phone")} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl h-12 px-4 text-white focus:border-amber-500 outline-none text-sm placeholder:text-slate-600" placeholder="Phone (Optional)" type="tel" />
                                                <div>
                                                    <input {...form.register("email")} className="w-full bg-slate-950/50 border border-slate-800 rounded-xl h-12 px-4 text-white focus:border-amber-500 outline-none text-sm placeholder:text-slate-600" placeholder="Email *" type="email" />
                                                    {form.formState.errors.email && <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>}
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="premium"
                                            className="w-full h-14 text-base font-bold rounded-2xl shadow-xl shadow-amber-500/10 shrink-0 mt-auto"
                                            disabled={form.formState.isSubmitting}
                                        >
                                            {form.formState.isSubmitting ? "Processing..." : "Confirm Booking"}
                                        </Button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
