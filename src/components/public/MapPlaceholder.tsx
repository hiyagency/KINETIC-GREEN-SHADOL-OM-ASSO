import { MapPin } from "lucide-react";
import type { StoreSettings } from "@/lib/types";
import { GOOGLE_MAPS_URL, MAP_EMBED_URL } from "@/lib/constants";

export function MapPlaceholder({ settings }: { settings: StoreSettings }) {
  const mapsUrl = GOOGLE_MAPS_URL;

  return (
    <div className="overflow-hidden rounded-lg border border-[#dfe8df] bg-white">
      <iframe
        src={MAP_EMBED_URL}
        title="Kinetic Green Shahdol exact Google Maps location"
        className="h-[360px] w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="border-t border-[#dfe8df] p-5">
        <MapPin className="text-[#13a538]" />
        <h3 className="mt-4 text-xl font-black text-[#101513]">Kinetic Green Shahdol on Google Maps</h3>
        <p className="mt-2 text-sm leading-6 text-[#5c675f]">{settings.address}</p>
      </div>
      <a
        className="block border-t border-[#dfe8df] px-5 py-4 text-sm font-black text-[#13a538]"
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open exact Kinetic Green Google Maps location
      </a>
    </div>
  );
}
