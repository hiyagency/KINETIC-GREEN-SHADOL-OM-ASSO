import { EnquiryForm } from "@/components/public/EnquiryForm";
import { ButtonLink } from "@/components/ui/Button";
import { getStoreSettings, getVehicles } from "@/lib/data/queries";
import { phoneHref } from "@/lib/utils";

export default async function BookEnquiryPage({
  searchParams,
}: {
  searchParams: Promise<{ vehicle?: string }>;
}) {
  const [{ vehicle }, settings, vehicles] = await Promise.all([
    searchParams,
    getStoreSettings(),
    getVehicles(),
  ]);

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.8fr_1fr]">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.16em] text-[#13a538]">Book enquiry</p>
        <h1 className="mt-3 text-5xl font-black text-[#101513]">Send your EV enquiry to Kinetic Green Shahdol.</h1>
        <p className="mt-4 text-base leading-7 text-[#5c675f]">
          Enquire for non-registration electric two-wheelers, test rides, price details, finance details, availability, or final booking discussion.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={settings.whatsappUrl}>WhatsApp</ButtonLink>
          <ButtonLink href={phoneHref(settings.phones[0])} variant="dark">Call showroom</ButtonLink>
        </div>
      </div>
      <EnquiryForm vehicles={vehicles} selectedVehicle={vehicle} />
    </section>
  );
}
