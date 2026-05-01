import { CalendarCheck, Camera, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import type { Product, StoreSettings } from "@/lib/types";
import { directionsHref, phoneHref, whatsappHref, whatsappMessage } from "@/lib/utils";

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
        <Camera size={16} /> Instagram
      </ButtonLink>
    </div>
  );
}
