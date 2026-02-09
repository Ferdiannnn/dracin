import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://dracin25.com"),
  title: {
    default: "Dracin 25 - Nonton Drama China Sub Indo Gratis",
    template: "%s | Dracin 25",
  },
  description: "Streaming Drama China terbaru subtitle Indonesia. Nonton Dracin gratis update setiap hari, tersedia genre Romance, Action, Fantasy dan banyak lagi.",
  keywords: ["drama china", "dracin", "sub indo", "streaming drama", "nonton gratis", "chinese drama", "nonton drama china", "drama china sub indo"],
  authors: [{ name: "Dracin 25 Team" }],
  creator: "Dracin 25",
  publisher: "Dracin 25",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Dracin 25 - Nonton Drama China Sub Indo Gratis",
    description: "Streaming Drama China terbaru subtitle Indonesia. Nonton Dracin gratis update setiap hari.",
    url: "/",
    siteName: "Dracin 25",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // We should create this or map it to a default
        width: 1200,
        height: 630,
        alt: "Dracin 25 - Streaming Drama China Sub Indo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dracin 25 - Nonton Drama China Sub Indo Gratis",
    description: "Streaming Drama China terbaru subtitle Indonesia.",
    images: ["/og-image.jpg"],
    creator: "@dracin25",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "GlxBe5PS-mdnrco1aT1Ee7ZR7lcEzIBQzgb6_ZFpDo8",
  },
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Analytics />
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a]`}
        >
          <Navbar />
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Dracin 25",
                url: process.env.NEXT_PUBLIC_BASE_URL || "https://dracin25.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || "https://dracin25.com"}/search?q={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              }),
            }}
          />
        </body>
      </html>
    </>
  );
}
