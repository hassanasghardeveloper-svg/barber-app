import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: {
        default: "Premium Cuts | Best Barber Shop in Sialkot",
        template: "%s | Premium Cuts Sialkot"
    },
    description: "Experience the best haircut in Sialkot without the wait. Book your appointment online for fades, beard trims, and styling at Premium Cuts.",
    keywords: ["Barber Sialkot", "Haircut Sialkot", "Best Barber Near Me", "Online Barber Booking Pakistan"],
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://premiumcuts.pk",
        siteName: "Premium Cuts Sialkot",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BarberShop",
        "name": "Premium Cuts Sialkot",
        "image": "https://images.unsplash.com/photo-1503951914875-befbb7135952", // Placeholder
        "url": "https://premiumcuts.pk",
        "telephone": "+923001234567",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Paris Road",
            "addressLocality": "Sialkot",
            "addressRegion": "Punjab",
            "postalCode": "51310",
            "addressCountry": "PK"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 32.4945,
            "longitude": 74.5229
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "10:00",
                "closes": "22:00"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Sunday",
                "opens": "12:00",
                "closes": "21:00"
            }
        ],
        "priceRange": "$$"
    };

    return (
        <html lang="en">
            <head>
                <Script
                    id="local-business-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen bg-slate-950 text-slate-50 flex flex-col bg-noise`}>
                <Navbar />
                <div className="flex-grow flex flex-col pb-20 md:pb-0">
                    {children}
                </div>
                <MobileNav />
                <div className="hidden md:block">
                    <Footer />
                </div>
            </body>
        </html>
    );
}
