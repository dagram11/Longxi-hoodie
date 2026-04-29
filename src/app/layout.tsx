import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LONGXI HOODIE - Premium Hoodie Collection",
  description: "Experience premium hoodies crafted for comfort and style. AI-powered personalization technology to see how clothes look on you before you buy.",
  keywords: ["Hoodies", "Premium Fashion", "AI Try-On", "Streetwear", "E-commerce", "Shopping"],
  authors: [{ name: "LONGXI HOODIE Team" }],
  openGraph: {
    title: "LONGXI HOODIE - Premium Hoodie Collection",
    description: "Experience premium hoodies crafted for comfort and style. AI-powered personalization technology.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
