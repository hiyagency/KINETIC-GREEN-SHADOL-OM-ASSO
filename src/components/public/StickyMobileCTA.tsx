import { MapPin, MessageCircle, Phone } from "lucide-react";
import type { StoreSettings } from "@/lib/types";
import { directionsHref, phoneHref, whatsappHref, whatsappMessage } from "@/lib/utils";

function InstagramLogo({ className = "" }: { className?: string }) {
  return (
<<<<<<< HEAD
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
=======
    <span
      aria-hidden="true"
      className={`inline-flex size-[21px] items-center justify-center rounded-[6px] bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285aeb_90%)] ${className}`}
    >
      <span className="relative block size-[13px] rounded-[4px] border-[1.8px] border-white">
        <span className="absolute left-1/2 top-1/2 block size-[4.5px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-white" />
        <span className="absolute right-[1.6px] top-[1.6px] block size-[2px] rounded-full bg-white" />
      </span>
    </span>
  );
}

export function StickyMobileCTA({ settings }: { settings: StoreSettings }) {
  const phone = settings.phones[0] || "";
  const instagramUrl = settings.instagramUrl || "https://www.instagram.com/kinetic_green_shahdol/";

  const actions = [
    {
      label: "WhatsApp",
      href: whatsappHref(settings, whatsappMessage("general")),
      icon: <MessageCircle size={20} />,
      className: "bg-[#14a83b] text-white shadow-[0_10px_24px_rgba(20,168,59,0.28)]",
    },
    {
      label: "Instagram",
      href: instagramUrl,
      icon: <InstagramLogo />,
      className: "bg-white text-[#101510]",
    },
    {
      label: "Call",
      href: phoneHref(phone),
      icon: <Phone size={20} />,
      className: "bg-white text-[#101510]",
    },
    {
      label: "Enquiry",
      href: "/book-enquiry",
      icon: <CalendarCheck size={20} />,
      className: "bg-white text-[#101510]",
    },
  ];

  return (
    <nav
      aria-label="Quick contact actions"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/55 bg-white/88 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-18px_45px_rgba(16,21,16,0.14)] backdrop-blur-xl md:left-auto md:right-6 md:bottom-6 md:w-auto md:rounded-full md:border md:px-2 md:py-2"
    >
      <div className="mx-auto grid max-w-xl grid-cols-4 gap-1.5 md:flex md:max-w-none md:gap-2">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            aria-label={action.label}
            className={`flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-[11px] font-black transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 md:min-h-11 md:flex-row md:rounded-full md:px-4 md:text-sm ${action.className}`}
          >
            {action.icon}
            <span className="truncate">{action.label}</span>
          </a>
        ))}
      </div>
    </nav>
>>>>>>> d98ef1a (Refine public showroom content and 360 viewer)
  );
}
