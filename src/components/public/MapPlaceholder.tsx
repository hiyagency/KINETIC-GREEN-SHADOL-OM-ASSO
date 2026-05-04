import { MapPin } from "lucide-react";
import type { StoreSettings } from "@/lib/types";

export function MapPlaceholder({ settings }: { settings: StoreSettings }) {
  if (settings.googleMapsEmbed) {
    return (
      <div
        className="overflow-hidden rounded-lg border border-[#dfe8df]"
        dangerouslySetInnerHTML={{ __html: settings.googleMapsEmbed }}
      />
    );
  }

  return (
    <div className="rounded-lg border border-dashed border-[#b8d8bd] bg-[#f5faf5] p-6">
      <MapPin className="text-[#13a538]" />
      <h3 className="mt-4 text-xl font-black text-[#101513]">Google Maps coming soon</h3>
      <p className="mt-2 text-sm leading-6 text-[#5c675f]">{settings.address}</p>
      <p className="mt-4 text-xs font-semibold text-[#66706a]">
        Call or WhatsApp the showroom for directions.
      </p>
    </div>
  );
}
