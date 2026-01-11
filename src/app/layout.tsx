import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "Premium Cuts | Book Your Spot",
    description: "Experience the best grooming without the wait.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen bg-slate-950 text-slate-50 flex flex-col`}>
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
