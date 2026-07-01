import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/config/site";
import { Footer } from "@/components/footer";
import { InteractiveCursorGlow } from "@/shared/ui/interactive-cursor-glow";
import { SiteNav } from "@/shared/ui/site-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "SaaS",
    "real-time systems",
    "logistics software",
    "performance optimization",
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-zinc-950 text-zinc-50">
        <InteractiveCursorGlow />
        <div className="flex min-h-full flex-col">
          <SiteNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
