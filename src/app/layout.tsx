import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
// FIX: Clerk import removed
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Load fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Capital News",
  description: "Your daily source for regional news.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // FIX: ClerkProvider wrapper removed
    <html lang="en">
      <body 
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-slate-50 text-slate-900`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}