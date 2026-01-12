"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Check, User, CheckCircle2, Scissors, Sparkles, MessageCircle, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import { format } from "date-fns";

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
    bookingDate: z.date({ required_error: "Please select a date" }),
    bookingTime: z.string({ required_error: "Please select a time" }),
});

type FormValues = z.infer<typeof formSchema>;

const stepVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

// --- HARDCODED SERVICES PER USER REQUEST ---
const MALE_SERVICES = [
    { id: "Signature Haircut", label: "Signature Haircut - $30" },
    { id: "Skin Fade", label: "Skin Fade - $35" },
    { id: "Beard Sculpt & Shape", label: "Beard Sculpt & Shape - $25" },
    { id: "Hot Towel Shave", label: "Hot Towel Shave - $40" },
    { id: "The Full Works", label: "The Full Works - $65" },
];

const FEMALE_SERVICES = [
    { id: "Style Cut & Finish", label: "Style Cut & Finish - $45" },
    { id: "Dry Cut", label: "Dry Cut - $35" },
    { id: "Fringe Trim", label: "Fringe Trim - $15" },
    { id: "Blow Dry & Style", label: "Blow Dry & Style - $40" },
    { id: "Color Consultation", label: "Color Consultation - Free" },
];

export default function BookingPage() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [queueData, setQueueData] = useState<{ number: number; waitTime: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Form Setup
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            service: "", // User must select
            gender: "Male",
            barber: "Any Professional",
            // bookingDate & bookingTime are undefined initially
        },
    });

    const selectedGender = form.watch("gender");
    const selectedDate = form.watch("bookingDate");
    const selectedTime = form.watch("bookingTime");

    async function onSubmit(values: FormValues) {
        setIsLoading(true);
        try {
            // Include formatted Date/Time in a way the API can hopefully understand (or just store as metadata for now)
            const payload = {
                ...values,
                appointmentDate: format(values.bookingDate, "yyyy-MM-dd"),
                appointmentTime: values.bookingTime,
            };

            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to book");
            }

            const newAppt = await res.json();

            // Trigger Email
            fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'confirmation',
                    email: values.email,
                    name: values.name,
                    queueNumber: newAppt.queueNumber,
                    waitTime: `${format(values.bookingDate, "MMM d")} @ ${values.bookingTime}` // Override waitTime with actual slot
                })
            });

            setQueueData({
                number: newAppt.queueNumber,
                waitTime: `${format(values.bookingDate, "MMM d")} @ ${values.bookingTime}`,
            });
            setIsSubmitted(true);
        } catch (error: any) {
            form.setError("root", { message: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    // --- Success State ---
    if (isSubmitted && queueData) {
        return (
            <main className="flex-grow flex items-center justify-center p-4 min-h-screen bg-neutral-950">
                <div className="max-w-md w-full bg-neutral-900 border border-white/10 rounded-[2rem] p-8 shadow-2xl text-center relative overflow-hidden">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-green-500/30">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </motion.div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">Booking Confirmed!</h2>
                    <p className="text-neutral-400 mb-8 text-sm">See you on <span className="text-amber-500 font-bold">{queueData.waitTime}</span></p>

                    <Link href="/"><Button variant="ghost" className="w-full text-neutral-500 hover:text-white">Return Home</Button></Link>
                </div>
            </main>
        );
    }

    // --- Wizard Form ---
    return (
        <main className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            {/* Background Blob */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-lg z-10 relative">
                <div className="bg-neutral-900/80 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/5 overflow-hidden flex flex-col min-h-[600px]">

                    {/* Header */}
                    <div className="bg-neutral-950/50 p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="w-10">
                            {step > 1 && (
                                <button onClick={prevStep} className="p-2 hover:bg-white/5 rounded-full transition-colors -ml-2 text-white">
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                        <div className="text-center">
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Step {step} of 4</span>
                            <h2 className="text-lg font-bold text-white mt-0.5">
                                {step === 1 && "Select Gender"}
                                {step === 2 && "Choose Barber"}
                                {step === 3 && "Pick a Time"}
                                {step === 4 && "Final Details"}
                            </h2>
                        </div>
                        <div className="w-10" />
                    </div>

                    <div className="p-6 md:p-8 flex-grow flex flex-col">
                        <AnimatePresence mode="wait">

                            {/* STEP 1: GENDER */}
                            {step === 1 && (
                                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-4 flex-grow justify-center">
                                    <button onClick={() => { form.setValue("gender", "Male"); nextStep(); }} className="flex-1 bg-neutral-800/50 hover:bg-neutral-800 border-2 border-transparent hover:border-amber-500 rounded-2xl p-6 transition-all group text-left">
                                        <div className="bg-blue-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20">
                                            <User className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Gentlemen</h3>
                                        <p className="text-neutral-500 text-sm">Classic cuts, fades & shaves</p>
                                    </button>
                                    <button onClick={() => { form.setValue("gender", "Female"); nextStep(); }} className="flex-1 bg-neutral-800/50 hover:bg-neutral-800 border-2 border-transparent hover:border-pink-500 rounded-2xl p-6 transition-all group text-left">
                                        <div className="bg-pink-500/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-500/20">
                                            <User className="w-6 h-6 text-pink-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-1">Ladies</h3>
                                        <p className="text-neutral-500 text-sm">Styling, cuts & treatments</p>
                                    </button>
                                </motion.div>
                            )}

                            {/* STEP 2: BARBER */}
                            {step === 2 && (
                                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col gap-4 flex-grow">
                                    <button onClick={() => { form.setValue("barber", "Any Professional"); nextStep(); }} className="w-full p-6 bg-amber-500 text-black font-bold rounded-2xl flex items-center gap-4 hover:brightness-110 transition-all">
                                        <div className="bg-black/10 p-2 rounded-lg"><Sparkles className="w-5 h-5" /></div>
                                        <div className="text-left">
                                            <div className="leading-tight text-lg">Any Professional</div>
                                            <div className="text-xs opacity-70 font-normal">Maximum Availability</div>
                                        </div>
                                    </button>

                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                        {(selectedGender === "Male" ? ["Ali", "Hassan", "Ahmed"] : ["Sarah", "Fatima"]).map((name) => (
                                            <button key={name} onClick={() => { form.setValue("barber", name); nextStep(); }} className="p-4 bg-neutral-800 hover:bg-neutral-700 border border-white/5 rounded-xl flex flex-col items-center gap-3 transition-all">
                                                <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center text-white font-bold">{name[0]}</div>
                                                <span className="text-white font-bold text-sm">{name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: SCHEDULE (NEW) */}
                            {step === 3 && (
                                <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col flex-grow">
                                    <div className="flex-grow overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                                        <BookingCalendar
                                            selectedDate={selectedDate}
                                            onDateSelect={(date) => form.setValue("bookingDate", date)}
                                        />

                                        {selectedDate && (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                <TimeSlotPicker
                                                    selectedTime={selectedTime}
                                                    onTimeSelect={(time) => form.setValue("bookingTime", time)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        <Button
                                            onClick={nextStep}
                                            className="w-full bg-white text-black hover:bg-neutral-200 font-bold"
                                            disabled={!selectedDate || !selectedTime}
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: DETAILS & CONFIRM */}
                            {step === 4 && (
                                <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col flex-grow h-full">
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full gap-4">

                                        {/* Service Selection */}
                                        <div className="space-y-3 mb-2">
                                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider ml-1">Select Service</label>
                                            <div className="grid grid-cols-1 gap-2 max-h-[160px] overflow-y-auto custom-scrollbar pr-2">
                                                {(selectedGender === "Male" ? MALE_SERVICES : FEMALE_SERVICES).map((svc) => (
                                                    <button
                                                        key={svc.id}
                                                        type="button"
                                                        onClick={() => form.setValue("service", svc.id)}
                                                        className={clsx(
                                                            "p-3 rounded-xl border text-sm font-bold text-left transition-all",
                                                            form.watch("service") === svc.id
                                                                ? "bg-amber-500 text-black border-amber-500"
                                                                : "bg-neutral-800 text-neutral-400 border-white/5 hover:bg-neutral-700 hover:text-white"
                                                        )}
                                                    >
                                                        {svc.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Inputs */}
                                        <div className="space-y-3">
                                            <input {...form.register("name")} className="w-full bg-neutral-800 border border-white/10 rounded-xl h-12 px-4 text-white focus:border-amber-500 outline-none text-sm" placeholder="Your Full Name *" />
                                            {form.formState.errors.name && <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>}

                                            <input {...form.register("phone")} className="w-full bg-neutral-800 border border-white/10 rounded-xl h-12 px-4 text-white focus:border-amber-500 outline-none text-sm" placeholder="Phone Number" />

                                            <input {...form.register("email")} className="w-full bg-neutral-800 border border-white/10 rounded-xl h-12 px-4 text-white focus:border-amber-500 outline-none text-sm" placeholder="Email Address *" />
                                            {form.formState.errors.email && <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>}
                                        </div>

                                        {/* Summary */}
                                        <div className="bg-neutral-800/50 p-3 rounded-xl text-xs text-neutral-400 flex justify-between items-center mt-auto">
                                            <span>
                                                {format(selectedDate, "MMM d")} @ {selectedTime}
                                            </span>
                                            <span className="text-amber-500 font-bold">{form.watch("service")}</span>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full h-14 bg-amber-500 text-black hover:bg-amber-400 font-bold text-lg rounded-xl shadow-lg shadow-amber-500/20"
                                            disabled={form.formState.isSubmitting || !form.watch("service")}
                                        >
                                            {form.formState.isSubmitting ? "Book Appointment..." : "Confirm Booking"}
                                        </Button>
                                    </form>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }
            `}</style>
        </main>
    );
}
