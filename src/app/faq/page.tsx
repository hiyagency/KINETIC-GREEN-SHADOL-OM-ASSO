import type { Metadata } from "next";
import { FAQAccordion } from "@/components/public/FAQAccordion";
import { getFaqs } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Kinetic Green Shahdol FAQs",
  description:
    "Answers about non-registration electric two-wheelers, no-licence EV use, student rides, price, warranty, finance, showroom visit and test ride support.",
  alternates: {
    canonical: "/faq",
  },
};

export default async function FAQPage() {
  const faqs = await getFaqs();
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#13a538]">FAQ</p>
      <h1 className="mt-3 text-5xl font-black text-[#101513]">No-licence EV questions, answered clearly.</h1>
      <div className="mt-8"><FAQAccordion faqs={faqs} /></div>
    </section>
  );
}
