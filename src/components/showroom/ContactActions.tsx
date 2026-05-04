import { CalendarCheck, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import type { Product, StoreSettings } from "@/lib/types";
import { directionsHref, phoneHref, whatsappHref, whatsappMessage } from "@/lib/utils";

function InstagramLogo() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-4 items-center justify-center rounded-[5px] bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)]"
    >
      <span className="relative block size-2.5 rounded-[3px] border border-white">
        <span className="absolute left-1/2 top-1/2 block size-1 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white" />
        <span className="absolute right-[1px] top-[1px] block size-[1.5px] rounded-full bg-white" />
      </span>
    </span>
  );
}

export function ContactActions({
  settings,
  product,
  context = "general",
  compact = false,
}: {
  settings: StoreSettings;
  product?: Product;
  context?: "general" | "licence" | "product";
  compact?: boolean;
}) {
  const msg = whatsappMessage(context, product);
  const grid = compact ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-3";
  return (
    <div className={grid}>
      <ButtonLink href={phoneHref(settings.phones[0])} variant="dark">
        <Phone size={16} /> Call Now
      </ButtonLink>
      <ButtonLink href={whatsappHref(settings, msg)}>
        <MessageCircle size={16} /> WhatsApp Now
      </ButtonLink>
      <ButtonLink href={`/book-enquiry${product ? `?vehicle=${encodeURIComponent(product.name)}` : ""}`} variant="light">
        <CalendarCheck size={16} /> Book Test Ride
      </ButtonLink>
      <ButtonLink href={`/book-enquiry${product ? `?vehicle=${encodeURIComponent(product.name)}` : ""}`} variant="light">
        <Send size={16} /> Send Enquiry
      </ButtonLink>
      <ButtonLink href={directionsHref(settings)} variant="light">
        <MapPin size={16} /> Get Directions
      </ButtonLink>
      <ButtonLink href={settings.instagramUrl} variant="light">
        <InstagramLogo /> Instagram
      </ButtonLink>
    </div>
  );
}
