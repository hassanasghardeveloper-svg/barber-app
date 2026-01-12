"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash, DollarSign, Clock, Scissors } from "lucide-react";

interface Service {
    id: number;
    name: string;
    duration: number;
    price: number;
    category: string;
}

export default function ServicesManager() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // New Service Form State
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newDuration, setNewDuration] = useState("30");
    const [newCategory, setNewCategory] = useState("Male");

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (error) {
            console.error("Failed to fetch services", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newName,
                    price: newPrice,
                    duration: newDuration,
                    category: newCategory
                })
            });

            if (res.ok) {
                setNewName("");
                setNewPrice("");
                setIsAdding(false);
                fetchServices(); // Refresh list
            }
        } catch (error) {
            alert("Failed to add service");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this service?")) return;

        try {
            await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
            fetchServices();
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
                <div>
                    <h2 className="text-2xl font-heading font-bold text-white">Services Menu</h2>
                    <p className="text-slate-400">Manage prices and options.</p>
                </div>
                <Button
                    onClick={() => setIsAdding(!isAdding)}
                    variant="premium"
                >
                    <Plus className="w-4 h-4 mr-2" /> Add Service
                </Button>
            </div>

            {isAdding && (
                <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl animate-in fade-in slide-in-from-top-4">
                    <form onSubmit={handleAddService} className="grid md:grid-cols-5 gap-4 items-end">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Service Name</label>
                            <input
                                required
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 h-12 text-white"
                                placeholder="e.g. Premium Haircut"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Price ($)</label>
                            <input
                                required
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 h-12 text-white"
                                placeholder="25"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Duration (min)</label>
                            <select
                                value={newDuration}
                                onChange={(e) => setNewDuration(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 h-12 text-white"
                            >
                                <option value="15">15 min</option>
                                <option value="30">30 min</option>
                                <option value="45">45 min</option>
                                <option value="60">60 min</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
                            <select
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 h-12 text-white"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Both">General</option>
                            </select>
                        </div>
                        <Button type="submit" className="h-12 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl">
                            Save
                        </Button>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                    <div key={service.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-between items-center group hover:border-slate-600 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
                                ${service.category === 'Male' ? 'bg-blue-500/10 text-blue-400' :
                                    service.category === 'Female' ? 'bg-pink-500/10 text-pink-400' : 'bg-amber-500/10 text-amber-500'}`}>
                                <Scissors className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">{service.name}</h3>
                                <div className="flex gap-3 text-sm text-slate-400">
                                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {service.price}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {service.duration}m</span>
                                    <span className="px-1.5 py-0.5 rounded text-[10px] uppercase font-bold bg-slate-800 border border-slate-700">{service.category}</span>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={() => handleDelete(service.id)}
                            variant="ghost"
                            className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl h-10 w-10 p-0 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <Trash className="w-4 h-4" />
                        </Button>
                    </div>
                ))}

                {services.length === 0 && !loading && (
                    <div className="col-span-2 text-center p-12 text-slate-500 border border-slate-800 rounded-2xl border-dashed">
                        No services found. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
