import { Gauge, MessageCircle, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { EligibilityBadges } from "@/components/public/EligibilityBadges";
import { VehicleVisual } from "@/components/public/VehicleVisual";
import type { StoreSettings, Vehicle } from "@/lib/types";
import { whatsappUrl } from "@/lib/utils";

export function VehicleCard({
  vehicle,
  settings,
}: {
  vehicle: Vehicle;
  settings: StoreSettings;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#dfe8df] bg-white shadow-[0_16px_50px_rgba(16,21,19,0.06)]">
      <VehicleVisual name={vehicle.name} imageUrl={vehicle.heroImageUrl} />
      <div className="grid gap-4 p-4">
        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#13a538]">
              {vehicle.category}
            </p>
            <p className="text-xs font-bold text-[#66706a]">{vehicle.priceLabel}</p>
          </div>
          <h3 className="mt-2 text-xl font-black text-[#101513]">{vehicle.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[#5c675f]">
            {vehicle.shortDescription}
          </p>
        </div>
        <EligibilityBadges vehicle={vehicle} />
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="rounded-lg bg-[#f5faf5] p-3 font-semibold text-[#303a33]">
            <Gauge className="mb-1 text-[#13a538]" size={18} />
            {vehicle.topSpeed || "Ask Us"}
          </span>
          <span className="rounded-lg bg-[#f5faf5] p-3 font-semibold text-[#303a33]">
            <Zap className="mb-1 text-[#13a538]" size={18} />
            {vehicle.motorPower || "Ask Us"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <ButtonLink href={`/vehicles/${vehicle.slug}`} variant="dark">
            View Details
          </ButtonLink>
          <ButtonLink
            href={whatsappUrl(settings.whatsappUrl, vehicle.name)}
            variant="light"
          >
            <MessageCircle size={16} />
            WhatsApp
          </ButtonLink>
        </div>
        <ButtonLink
          href={`/book-enquiry?vehicle=${encodeURIComponent(vehicle.name)}`}
          className="w-full"
        >
          Send Enquiry
        </ButtonLink>
      </div>
    </article>
  );
}
