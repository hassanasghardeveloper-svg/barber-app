"use client";

import { Button } from "@/components/ui/button";
import { Save, Store, Clock, ShieldCheck, Power, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const { register, handleSubmit, setValue, watch } = useForm({
        defaultValues: {
            shopName: "Premium Cuts",
            phone: "",
            openTime: "10:00",
            closeTime: "22:00",
            isQueueOpen: true
        }
    });

    const isQueueOpen = watch("isQueueOpen");

    useEffect(() => {
        fetch('/api/settings')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setValue("shopName", data.shopName);
                    setValue("phone", data.phone);
                    setValue("openTime", data.openTime);
                    setValue("closeTime", data.closeTime);
                    setValue("isQueueOpen", data.isQueueOpen);
                }
            })
            .finally(() => setIsLoading(false));
    }, [setValue]);

    const onSubmit = async (data: any) => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                body: JSON.stringify(data)
            });
            if (res.ok) {
                alert("Settings saved!");
            } else {
                throw new Error("Failed to save");
            }
        } catch (error) {
            alert("Error saving settings");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-slate-500">Loading settings...</div>;

    return (
        <main className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white font-heading">Settings</h1>
                <p className="text-slate-400">Configure your shop preferences.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">

                {/* General Info */}
                <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg"><Store className="w-5 h-5 text-blue-500" /></div>
                        <h2 className="text-lg font-bold text-white">Shop Details</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400 font-medium">Shop Name</label>
                            <input
                                {...register("shopName")}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-slate-400 font-medium">WhatsApp Number</label>
                            <input
                                {...register("phone")}
                                placeholder="For auto-links"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </section>

                {/* Working Hours */}
                <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                        <div className="p-2 bg-amber-500/10 rounded-lg"><Clock className="w-5 h-5 text-amber-500" /></div>
                        <h2 className="text-lg font-bold text-white">Opening Hours</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm text-slate-400 font-medium">Open Time</label>
                            <input type="time" {...register("openTime")} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 hover:cursor-pointer" />
                        </div>
                        <div className="space-y-2 col-span-2">
                            <label className="text-sm text-slate-400 font-medium">Close Time</label>
                            <input type="time" {...register("closeTime")} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-amber-500 hover:cursor-pointer" />
                        </div>
                    </div>
                </section>

                {/* Queue Control */}
                <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                        <div className="p-2 bg-green-500/10 rounded-lg"><ShieldCheck className="w-5 h-5 text-green-500" /></div>
                        <h2 className="text-lg font-bold text-white">Queue Control</h2>
                    </div>

                    <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
                        <div>
                            <p className="text-white font-bold">Accept Online Bookings</p>
                            <p className="text-xs text-slate-500 mt-1">Stops new customers from joining the queue remotely.</p>
                        </div>
                        <div
                            onClick={() => setValue("isQueueOpen", !isQueueOpen)}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full cursor-pointer transition-colors ${isQueueOpen ? "bg-green-500 hover:bg-green-400" : "bg-slate-700"}`}
                        >
                            <span className={`${isQueueOpen ? "translate-x-6" : "translate-x-1"} inline-block h-5 w-5 transform rounded-full bg-white transition shadow-sm`} />
                        </div>
                    </div>
                </section>

                <div className="flex justify-end pt-4">
                    <Button type="submit" variant="premium" className="px-8 h-12 text-lg font-bold shadow-xl shadow-amber-500/10" disabled={isSaving}>
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5 mr-2" /> Save Changes</>}
                    </Button>
                </div>

            </form>
        </main>
    );
}
