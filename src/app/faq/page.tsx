import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQPage() {
    const faqs = [
        {
            question: "Do I need to book an appointment?",
            answer: "While we do accept walk-ins, we highly recommend booking an appointment through our website to avoid waiting times. Our digital queue system prioritizes booked slots."
        },
        {
            question: "How does the online queue work?",
            answer: "When you book, you get a Queue Number. You can check your status live on our 'Queue Status' page to see exactly how many people are ahead of you."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept Cash, EasyPaisa, JazzCash, and all major Credit/Debit Cards."
        },
        {
            question: "Do you offer services for children?",
            answer: "Yes, our barbers are experienced in working with children of all ages to provide a comfortable and safe haircut experience."
        },
        {
            question: "How often should I get a haircut?",
            answer: "For a maintained skin fade or short style, we recommend every 2 weeks. For medium to longer styles, every 3-4 weeks is ideal."
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    };

    return (
        <main className="min-h-screen bg-neutral-950 pt-32 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-6 max-w-3xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white font-heading mb-4">
                        Frequently Asked <span className="text-amber-500">Questions</span>
                    </h1>
                    <p className="text-neutral-400">Everything you need to know about Premium Cuts.</p>
                </div>

                <div className="bg-neutral-900 border border-white/5 rounded-3xl p-8 mb-12">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/5 last:border-0">
                                <AccordionTrigger className="text-white hover:text-amber-500 text-left font-bold text-lg py-4">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-neutral-400 leading-relaxed pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

                <div className="text-center bg-amber-500/10 border border-amber-500/20 p-8 rounded-3xl">
                    <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
                    <p className="text-neutral-400 mb-6">We're here to help.</p>
                    <Link href="/contact">
                        <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold">
                            Contact Support
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
