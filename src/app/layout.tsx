import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // Import fonts
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar"; // Import Navbar
import { Footer } from "@/components/layout/Footer"; // Import Footer

// Configure fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Capital News",
  description: "Your daily source for global news.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-slate-50`}>
        <Navbar />
        {children}
        <Footer />
        {/* Footer Component */}
      </body>
    </html>
  );
}