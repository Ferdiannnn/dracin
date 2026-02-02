import type { Metadata } from "next";
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
  title: "Dracin 25 - Nonton Drama China Sub Indo Gratis",
  verification: {
    google: "_bb9YdofmZriPq78ryCcQkRSQdMWRRnQ_TVENohKp2Q",
  },
  description: "Streaming Drama China terbaru subtitle Indonesia. Nonton Dracin gratis update setiap hari, tersedia genre Romance, Action, Fantasy dan banyak lagi.",
  keywords: ["drama china", "dracin", "sub indo", "streaming drama", "nonton gratis", "chinese drama"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a]`}
      >
        {children}
      </body>
    </html>
  );
}
