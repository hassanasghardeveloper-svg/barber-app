import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
    return (
        <main className="bg-neutral-950 min-h-screen pt-20">
            {/* --- HERO HEADER --- */}
            <section className="relative py-24 text-center bg-neutral-950 overflow-hidden">
                <div className="relative z-10 px-6">
                    <h2 className="text-amber-500 font-bold tracking-[0.4em] uppercase mb-4 text-sm">Grooming Journal</h2>
                    <h1 className="text-5xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter">The Blog</h1>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full mt-6" />
                </div>
            </section>

            <section className="py-16 container mx-auto px-6">
                {/* Featured Post */}
                <div className="mb-20">
                    <div className="group relative rounded-3xl overflow-hidden h-[500px] border border-white/5">
                        <img
                            src="https://images.unsplash.com/photo-1593702295094-aea8cdd39478?q=80&w=2000&auto=format&fit=crop"
                            alt="Featured"
                            className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <span className="inline-block px-3 py-1 bg-amber-500 text-black text-xs font-bold uppercase tracking-wider mb-4 rounded-full">Educational</span>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-tight mb-6">Layrite Barber Education Class Recap</h2>
                            <p className="text-neutral-300 text-lg mb-6 line-clamp-2">Inside the advanced styling workshop held at Premium Cuts Sialkot.</p>
                            <Button className="bg-white text-black hover:bg-neutral-200 rounded-none font-bold uppercase tracking-wide">Read Article</Button>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "5 Iconic Men's Hairstyles", category: "Trending", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=400&fit=crop" },
                        { title: "Mistakes Damaging Your Beard", category: "Barber Style", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop" },
                        { title: "Getting the Haircut You Want", category: "How To", img: "https://images.unsplash.com/photo-1503951914875-452162b7f30a?w=600&h=400&fit=crop" },
                        { title: "Best Barbershop in San Antonio", category: "Reviews", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=400&fit=crop" },
                        { title: "Steaming: Should Men Be Doing It?", category: "Wellness", img: "https://images.unsplash.com/photo-1599351431202-6e0c051cd1a0?w=600&h=400&fit=crop" },
                    ].map((post, i) => (
                        <div key={i} className="group bg-neutral-900 border border-white/5 hover:border-amber-500/50 transition-all rounded-xl overflow-hidden">
                            <div className="h-48 overflow-hidden relative">
                                <span className="absolute top-4 left-4 z-10 px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider">{post.category}</span>
                                <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors leading-tight">{post.title}</h3>
                                <Link href="#" className="inline-flex items-center text-neutral-500 hover:text-white text-sm font-bold uppercase tracking-wider">
                                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
