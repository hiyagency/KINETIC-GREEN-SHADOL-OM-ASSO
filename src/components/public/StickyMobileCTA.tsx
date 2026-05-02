import { MapPin, MessageCircle, Phone } from "lucide-react";
import type { StoreSettings } from "@/lib/types";
import { directionsHref, phoneHref, whatsappHref, whatsappMessage } from "@/lib/utils";

export function StickyMobileCTA({ settings }: { settings: StoreSettings }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid w-full max-w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-1 border-t border-[#dfe8df] bg-white p-2 shadow-2xl md:hidden">
      <a className="min-w-0 overflow-hidden flex flex-col items-center justify-center rounded-xl py-2 text-[10px] font-black text-[#101510]" href={phoneHref(settings.phones[0])}>
        <Phone size={18} /> Call
      </a>
      <a className="min-w-0 overflow-hidden flex flex-col items-center justify-center rounded-xl bg-[#14a83b] py-2 text-[10px] font-black text-white" href={whatsappHref(settings, whatsappMessage("general"))}>
        <MessageCircle size={18} /> WhatsApp
      </a>
      <a className="min-w-0 overflow-hidden flex flex-col items-center justify-center rounded-xl py-2 text-[10px] font-black text-[#101510]" href={directionsHref(settings)}>
        <MapPin size={18} /> Directions
      </a>
    </div>
  );
}
