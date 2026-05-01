import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/public/Footer";
import { Header } from "@/components/public/Header";
import { StickyMobileCTA } from "@/components/public/StickyMobileCTA";
import { getStoreSettings } from "@/lib/data/queries";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinetic Green Shahdol | No Licence EV Options",
  description:
    "Official Kinetic Green product-led showroom website for Shahdol enquiries, no-licence eligible low-speed EVs, test rides and WhatsApp contact.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getStoreSettings();
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <StickyMobileCTA settings={settings} />
      </body>
    </html>
  );
}
