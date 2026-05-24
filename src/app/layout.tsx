import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SITE_CONFIG } from "@/data/site";

import "./globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta"
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_CONFIG.name} | Portfolio`,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Computer Engineering",
    "IoT",
    "Frontend Portfolio",
    "Next.js portfolio",
    "Tailwind CSS"
  ],
  openGraph: {
    title: `${SITE_CONFIG.name} | Portfolio`,
    description: SITE_CONFIG.description,
    url: baseUrl,
    siteName: `${SITE_CONFIG.name} Portfolio`,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} | Portfolio`,
    description: SITE_CONFIG.description
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        <div className="flex min-h-screen flex-col overflow-x-hidden">
          <Navbar />
          <main className="page-wrap">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
