import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, Caveat } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  weight: ["400", "600", "700"],
  variable: "--font-handwritten",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hasinthaka | Software Engineer",
  description: "I turn complex problems into simple solutions. Portfolio of Hasinthaka, Software Engineer.",
  appleWebApp: { capable: true, title: "Hasinthaka", statusBarStyle: "black-translucent" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}

