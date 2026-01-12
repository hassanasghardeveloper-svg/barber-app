import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function BlogPage() {
    const posts = [
        {
            slug: "top-men-hair-trends-sialkot-2024",
            title: "Top 5 Men's Hair Trends in Sialkot for 2024",
            excerpt: "From the textured crop to the classic skin fade, discover what styles are dominating the grooming scene in Sialkot this year.",
            date: "Jan 10, 2024",
            author: "Ali Hassan",
            category: "Trends",
            image: "https://images.unsplash.com/photo-1593702295094-aea202823e05?w=800&q=80"
        },
        {
            slug: "beard-maintenance-tips",
            title: "The Ultimate Guide to Beard Maintenance in Pakistan's Climate",
            excerpt: "Humidity and heat can ruin a good beard. Learn the essential oils and trimming techniques to keep your beard looking sharp.",
            date: "Jan 05, 2024",
            author: "Bilal Khan",
            category: "Grooming Guide",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80"
        },
        {
            slug: "barber-vs-salon",
            title: "Why You Should Choose a Specialist Barber vs. a General Salon",
            excerpt: "Understand the difference in tools, training, and experience. Why your haircut deserves a master barber's touch.",
            date: "Dec 28, 2023",
            author: "Zain Ahmed",
            category: "Education",
            image: "https://images.unsplash.com/photo-1503951914875-befbb7135952?w=800&q=80"
        }
    ];

    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-20">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading">
                        Grooming <span className="text-amber-500">Journal</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Expert advice, style trends, and news from Sialkot's premier barber shop.
                    </p>
                </div>

                {/* Featured Post (First one) */}
                <div className="mb-16">
                    <div className="group relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/30 transition-all grid md:grid-cols-2">
                        <div className="h-64 md:h-auto overflow-hidden">
                            <img
                                src={posts[0].image}
                                alt={posts[0].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="flex items-center gap-4 text-sm text-amber-500 font-bold uppercase tracking-wider mb-4">
                                <span>{posts[0].category}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <span>{posts[0].date}</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">
                                {posts[0].title}
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                                {posts[0].excerpt}
                            </p>
                            <Button variant="link" className="text-white p-0 h-auto font-bold self-start hover:text-amber-500">
                                Read Article <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Recent Posts Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.slice(1).map((post, i) => (
                        <div key={i} className="group bg-slate-900/50 rounded-3xl border border-white/5 overflow-hidden hover:bg-slate-900 transition-all">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                    <Calendar className="w-3 h-3" /> {post.date}
                                    <span className="mx-1">•</span>
                                    <User className="w-3 h-3" /> {post.author}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>
                                <Button size="sm" variant="outline" className="rounded-full border-slate-700 text-slate-300 hover:text-white hover:border-white w-full">
                                    Read More
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SEO Content Block (Invisible to user mostly, but great for crawling) */}
                <div className="mt-20 pt-12 border-t border-slate-800 text-slate-500 text-sm text-center max-w-4xl mx-auto">
                    <p>
                        Premium Cuts Blog is your go-to source for <strong>Barber Shop news in Sialkot</strong>.
                        We cover everything from the latest <em>skin fade styles</em> to <em>beard grooming tips</em>.
                        Whether you are looking for a haircut near Paris Road or just want to know how to maintain your style, our expert barbers share their knowledge here.
                    </p>
                </div>

            </div>
        </main>
    );
}
