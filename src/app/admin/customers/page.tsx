"use client";

import { useState } from "react";
import { Search, Star, Phone, Calendar } from "lucide-react";

const MOCK_CUSTOMERS = [
    { id: 1, name: "Ahmed Ali", phone: "050 123 4567", visits: 12, lastVisit: "2024-01-15", type: "VIP" },
    { id: 2, name: "John Smith", phone: "052 987 6543", visits: 4, lastVisit: "2024-02-01", type: "Regular" },
    { id: 3, name: "Maria Garcia", phone: "055 555 5555", visits: 1, lastVisit: "2024-02-10", type: "New" },
    { id: 4, name: "Sami Yusuf", phone: "050 999 8888", visits: 25, lastVisit: "2024-01-20", type: "VIP" },
];

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCustomers = MOCK_CUSTOMERS.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <main className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white font-heading">Customers</h1>
                    <p className="text-slate-400">Database of {MOCK_CUSTOMERS.length} clients.</p>
                </div>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search name or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-80 bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:border-amber-500 outline-none transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {filteredCustomers.map((customer) => (
                    <div key={customer.id} className="group bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-center hover:bg-slate-800 hover:border-slate-700 transition-all cursor-pointer">
                        <div className="flex gap-5 items-center w-full sm:w-auto">
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg
                                ${customer.type === 'VIP' ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400'}`}>
                                {customer.name[0]}
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg flex items-center gap-2 group-hover:text-amber-500 transition-colors">
                                    {customer.name}
                                    {customer.type === "VIP" && <Star className="w-4 h-4 text-amber-500 fill-amber-500" />}
                                </h3>
                                <p className="text-slate-500 text-sm flex items-center gap-2">
                                    <Phone className="w-3 h-3" /> {customer.phone}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-8 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-4 sm:pt-0">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Visits</p>
                                <p className="text-white font-bold text-xl">{customer.visits}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase font-semibold">Last Visit</p>
                                <div className="flex items-center gap-1 text-slate-300 font-medium">
                                    <Calendar className="w-3 h-3 text-slate-500" /> {customer.lastVisit}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${customer.type === "VIP"
                                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                                        : "bg-slate-800 text-slate-400 border border-slate-700"
                                    }`}>
                                    {customer.type}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
