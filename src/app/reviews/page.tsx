import { Button } from "@/components/ui/button";
import { Star, User } from "lucide-react";
import Link from "next/link";

export default function ReviewsPage() {
    const reviews = [
        { name: "Usman Ali", rating: 5, date: "2 days ago", text: "Best haircut in Sialkot! The booking system is a game changer. No waiting at all." },
        { name: "Ch. Rizwan", rating: 5, date: "1 week ago", text: "Premium environment and highly skilled staff. Ali is a wizard with the fade." },
        { name: "Ahmed Raza", rating: 4, date: "2 weeks ago", text: "Great service, slightly expensive but worth it for the lack of wait time." },
        { name: "Saad Malik", rating: 5, date: "3 weeks ago", text: " finally a barber shop that respects appointments. 10/10 recommended." },
        { name: "Hassan G.", rating: 5, date: "1 month ago", text: "The hot towel shave was incredibly relaxing. Will come back for sure." },
        { name: "Omer F.", rating: 5, date: "1 month ago", text: "Clean, modern, and professional. Best in town." },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Premium Cuts Sialkot",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "524"
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 pt-32 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-6">
                        Client <span className="text-amber-500">Stories</span>
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-2xl font-bold text-white">
                        <span className="text-amber-500 text-6xl">4.9</span>
                        <div className="flex flex-col items-start">
                            <div className="flex text-amber-500">
                                <Star className="fill-current w-6 h-6" /><Star className="fill-current w-6 h-6" /><Star className="fill-current w-6 h-6" /><Star className="fill-current w-6 h-6" /><Star className="fill-current w-6 h-6" />
                            </div>
                            <span className="text-sm text-slate-400 font-normal uppercase tracking-widest">Based on 500+ Reviews</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{review.name}</h4>
                                        <p className="text-xs text-slate-500">{review.date}</p>
                                    </div>
                                </div>
                                <div className="flex text-amber-500 gap-0.5">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                </div>
                            </div>
                            <p className="text-slate-300 leading-relaxed">"{review.text}"</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link href="/book">
                        <Button size="lg" className="bg-white text-black hover:bg-amber-500 font-bold rounded-full px-12">
                            Join Our Happy Clients
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
