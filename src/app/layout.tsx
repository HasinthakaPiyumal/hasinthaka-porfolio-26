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
  metadataBase: new URL("https://www.hasinthaka.com"),
  title: {
    default: "Hasinthaka Piyumal | Software Engineer & Researcher",
    template: "%s | Hasinthaka Piyumal",
  },
  description:
    "Software Engineer & applied ML researcher specializing in distributed backend microservices, real-time AI systems, and enterprise web/mobile applications.",
  keywords: [
    "Hasinthaka Piyumal",
    "Software Engineer",
    "Full-Stack Developer",
    "Distributed Systems",
    "Applied Machine Learning",
    "Backend Engineer",
    "WSO2",
    "Zenlise",
    "Next.js",
    "Go",
    "Java",
    "Python",
    "Flutter",
    "Spring Boot",
    "PATTERNS 2026",
    "Sri Lanka",
  ],
  authors: [{ name: "Hasinthaka Piyumal", url: "https://www.hasinthaka.com" }],
  creator: "Hasinthaka Piyumal",
  publisher: "Hasinthaka Piyumal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.hasinthaka.com",
  },
  openGraph: {
    title: "Hasinthaka Piyumal — Software Engineer & Researcher",
    description:
      "Distributed systems engineer, full-stack developer & applied ML researcher. Portfolio of Hasinthaka Piyumal.",
    url: "https://www.hasinthaka.com",
    siteName: "Hasinthaka Piyumal Portfolio",
    images: [
      {
        url: "/images/about-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Hasinthaka Piyumal — Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasinthaka Piyumal — Software Engineer & Researcher",
    description:
      "Software Engineer & researcher building microservices, AI systems, and enterprise tools.",
    images: ["/images/about-portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: { capable: true, title: "Hasinthaka", statusBarStyle: "black-translucent" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.hasinthaka.com/#person",
      "name": "Hasinthaka Piyumal",
      "jobTitle": "Software Engineer & Researcher",
      "url": "https://www.hasinthaka.com",
      "image": "https://www.hasinthaka.com/images/about-portrait.jpg",
      "sameAs": [
        "https://github.com/HasinthakaPiyumal",
        "https://linkedin.com/in/HasinthakaPiyumal",
        "https://twitter.com/HasinthakaPiyumal",
        "https://arxiv.org/abs/2607.00558"
      ],
      "knowsAbout": [
        "Distributed Systems",
        "Microservices Architecture",
        "Applied Machine Learning",
        "Go",
        "Java",
        "Python",
        "Next.js",
        "Flutter",
        "Spring Boot",
        "Redis",
        "Docker",
        "Azure"
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "University of Kelaniya"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.hasinthaka.com/#website",
      "url": "https://www.hasinthaka.com",
      "name": "Hasinthaka Piyumal Portfolio",
      "publisher": {
        "@id": "https://www.hasinthaka.com/#person"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${caveat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#070707] text-white">
        {children}
        <AnalyticsTracker />
        <SpeedInsights />
      </body>
    </html>
  );
}
