import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PawLog | Pet Health Journal",
  description: "Track your pet's health, logging, and stay up to date.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PawLog",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#534AB7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="bg-zinc-100 text-zinc-900 antialiased min-h-screen flex justify-center" suppressHydrationWarning>
        {/* Mobile Viewport Container */}
        <div className="w-full max-w-[390px] min-h-screen bg-white shadow-xl relative flex flex-col overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
