import type { Metadata } from "next";
import { GallerySection } from "@/components/public/GallerySection";
import { ButtonLink } from "@/components/ui/Button";
import { getGallery, getStoreSettings } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "About Om Associates Kinetic Green Shahdol",
  description:
    "Kinetic Green Shahdol by Om Associates helps local riders choose electric two-wheelers for students, daily rides, test rides, finance and ownership support.",
  alternates: {
    canonical: "/about",
  },
};

export default async function AboutPage() {
  const [settings, gallery] = await Promise.all([getStoreSettings(), getGallery()]);
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#13a538]">{settings.managedBy}</p>
          <h1 className="mt-3 text-5xl font-black text-[#101513]">Kinetic Green Shahdol for non-registration electric two-wheelers.</h1>
          <p className="mt-5 text-base leading-7 text-[#5c675f]">
            Kinetic Green Shahdol, managed by Om Associates, helps Shahdol riders explore electric two-wheelers for students, daily local travel, and simple ownership support.
          </p>
          <ButtonLink href="/book-enquiry" className="mt-6">Contact showroom</ButtonLink>
        </div>
        <GallerySection items={gallery} />
      </div>
    </section>
  );
}
