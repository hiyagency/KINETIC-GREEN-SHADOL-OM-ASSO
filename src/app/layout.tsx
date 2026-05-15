import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/public/Footer";
import { Header } from "@/components/public/Header";
import { StickyMobileCTA } from "@/components/public/StickyMobileCTA";
import { getStoreSettings } from "@/lib/data/queries";
import { GOOGLE_MAPS_URL, LOCAL_SERVICE_AREAS, SEO_DESCRIPTION, SEO_KEYWORDS, SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kinetic Green Shahdol | Non-Registration Electric Two-Wheelers",
    template: "%s | Kinetic Green Shahdol",
  },
  description: SEO_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Kinetic Green Shahdol - Om Associates" }],
  creator: "Kinetic Green Shahdol",
  publisher: "Kinetic Green Shahdol",
  category: "Electric vehicle showroom",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Kinetic Green Shahdol | No-Licence Electric Two-Wheelers",
    description: SEO_DESCRIPTION,
    images: [
      {
        url: "/showroom/kinetic-green-shahdol-showroom-01.jpeg",
        width: 1280,
        height: 573,
        alt: "Kinetic Green Shahdol showroom and electric two-wheelers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic Green Shahdol | Electric Two-Wheelers",
    description: SEO_DESCRIPTION,
    images: ["/showroom/kinetic-green-shahdol-showroom-01.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    other: {
      "msvalidate.01": "",
    },
  },
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Shahdol",
    "geo.position": "23.31155;81.3683177",
    ICBM: "23.31155, 81.3683177",
    "business:contact_data:locality": "Shahdol",
    "business:contact_data:region": "Madhya Pradesh",
    "business:contact_data:country_name": "India",
    "ai-summary":
      "Kinetic Green Shahdol by Om Associates is an electric vehicle showroom in Shahdol, Madhya Pradesh for non-registration electric two-wheelers, no-licence EV guidance, student-friendly rides, test rides, finance and warranty support.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getStoreSettings();
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["AutoDealer", "LocalBusiness", "ElectricVehicleChargingStation"],
    name: "Kinetic Green Shahdol",
    alternateName: ["Om Associates", "Kinetic Green Om Associates Shahdol"],
    description: SEO_DESCRIPTION,
    url: SITE_URL,
    image: [
      `${SITE_URL}/showroom/kinetic-green-shahdol-showroom-01.jpeg`,
      `${SITE_URL}/showroom/kinetic-green-shahdol-showroom-02.jpeg`,
      `${SITE_URL}/showroom/kinetic-green-shahdol-showroom-03.jpeg`,
    ],
    telephone: settings.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Shahdol",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.31155,
      longitude: 81.3683177,
    },
    hasMap: GOOGLE_MAPS_URL,
    openingHours: "Mo-Su 10:00-20:00",
    priceRange: "Contact showroom",
    areaServed: LOCAL_SERVICE_AREAS,
    sameAs: [settings.instagramUrl, GOOGLE_MAPS_URL].filter(Boolean),
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Non-registration electric two-wheelers",
          category: "Electric two-wheeler",
        },
        availability: "https://schema.org/InStock",
        areaServed: "Shahdol",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Electric scooter test ride and enquiry in Shahdol",
        },
        areaServed: LOCAL_SERVICE_AREAS,
      },
    ],
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    description: SEO_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/vehicles?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Header settings={settings} />
        <main className="pb-24 md:pb-20">{children}</main>
        <Footer settings={settings} />
        <StickyMobileCTA settings={settings} />
      </body>
    </html>
  );
}
