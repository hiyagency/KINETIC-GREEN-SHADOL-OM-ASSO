import type { Metadata } from "next";
import { EnquiryForm } from "@/components/public/EnquiryForm";
import { GallerySection } from "@/components/public/GallerySection";
import { MapPlaceholder } from "@/components/public/MapPlaceholder";
import { getGallery, getStoreSettings, getVehicles } from "@/lib/data/queries";
import { emailHref, phoneHref } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact Kinetic Green Shahdol",
  description:
    "Call, WhatsApp, visit or get directions to Kinetic Green Shahdol by Om Associates for electric two-wheeler price, test ride, finance and availability.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const [settings, vehicles, gallery] = await Promise.all([
    getStoreSettings(),
    getVehicles(),
    getGallery(),
  ]);
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1fr]">
      <div className="grid gap-5">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#13a538]">Contact</p>
          <h1 className="mt-3 text-5xl font-black text-[#101513]">Visit Kinetic Green Shahdol.</h1>
        </div>
        <div className="rounded-lg border border-[#dfe8df] bg-white p-5 text-sm leading-7 text-[#5c675f]">
          <p className="font-black text-[#101513]">{settings.address}</p>
          {settings.phones.map((phone) => (
            <a key={phone} className="block font-black text-[#13a538]" href={phoneHref(phone)}>{phone}</a>
          ))}
          <a className="block font-black text-[#13a538]" href={emailHref(settings.email)}>{settings.email}</a>
          <a className="block font-black text-[#13a538]" href={settings.whatsappUrl}>WhatsApp</a>
          <a className="block font-black text-[#13a538]" href={settings.instagramUrl}>Instagram</a>
          {settings.facebookUrl ? <p>Facebook: {settings.facebookUrl}</p> : null}
          <p>Hours: {settings.storeHours}</p>
        </div>
        <MapPlaceholder settings={settings} />
        <GallerySection items={gallery} />
      </div>
      <EnquiryForm vehicles={vehicles} />
    </section>
  );
}
