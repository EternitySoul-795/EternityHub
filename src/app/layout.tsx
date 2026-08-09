import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { SiteReadyProvider } from "@/components/providers/SiteReadyProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ParticleField } from "@/components/ui/ParticleField";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SITE } from "@/data/site";

// Code-split the floating chat widget — its bundle only matters once opened.
const AIAssistant = dynamic(() => import("@/components/ai/AIAssistant").then((m) => m.AIAssistant));

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = `https://${SITE.domain}`;

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.roles.join(" · ")}`,
    template: `%s — ${SITE.brand}`,
  },
  description: SITE.tagline,
  metadataBase: new URL(siteUrl),
  keywords: [SITE.name, SITE.brand, ...SITE.roles, "portfolio", "Next.js", "Three.js"],
  authors: [{ name: SITE.name, url: siteUrl }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: SITE.brand,
    title: `${SITE.name} — ${SITE.roles.join(" · ")}`,
    description: SITE.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.roles.join(" · ")}`,
    description: SITE.tagline,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="relative min-h-full overflow-x-hidden bg-[#050505] text-white">
        <MotionConfig reducedMotion="user">
          <SiteReadyProvider>
            <LoadingScreen />
            <SmoothScrollProvider>
              <CustomCursor />
              <ParticleField />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <AIAssistant />
            </SmoothScrollProvider>
          </SiteReadyProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
