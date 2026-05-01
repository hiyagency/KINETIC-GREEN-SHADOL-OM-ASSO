import { GallerySection } from "@/components/public/GallerySection";
import { ButtonLink } from "@/components/ui/Button";
import { getGallery, getStoreSettings } from "@/lib/data/queries";

export default async function AboutPage() {
  const [settings, gallery] = await Promise.all([getStoreSettings(), getGallery()]);
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.16em] text-[#13a538]">{settings.managedBy}</p>
          <h1 className="mt-3 text-5xl font-black text-[#101513]">Kinetic Green Shahdol for local electric mobility.</h1>
          <p className="mt-5 text-base leading-7 text-[#5c675f]">
            Kinetic Green Shahdol, managed by Om Associates, helps Shahdol riders explore electric scooters, 2 wheelers, and E-Luna enquiries with a special focus on eligible no-licence and no-RTO low-speed EV options.
          </p>
          <ButtonLink href="/book-enquiry" className="mt-6">Contact showroom</ButtonLink>
        </div>
        <GallerySection items={gallery} />
      </div>
    </section>
  );
}
