import type { Metadata, Viewport } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Caveat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "600", "700"],
  variable: "--font-handwritten",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Hasinthaka | Software Engineer",
  description: "Distributed systems engineer, full-stack developer & applied ML researcher. Portfolio of Hasinthaka Piyumal.",
  appleWebApp: { capable: true, title: "Hasinthaka", statusBarStyle: "black-translucent" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${caveat.variable}`}>
      <body className="antialiased bg-[#070707] text-white">
        {children}
        <AnalyticsTracker />
        <SpeedInsights />
      </body>
    </html>
  );
}
