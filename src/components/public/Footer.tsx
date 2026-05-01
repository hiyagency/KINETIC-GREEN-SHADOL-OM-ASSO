import Link from "next/link";
import { ContactActions } from "@/components/showroom/ContactActions";
import type { StoreSettings } from "@/lib/types";

export function Footer({ settings }: { settings: StoreSettings }) {
  return (
    <footer className="bg-[#0b100c] pb-24 text-white md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#21c44d]">{settings.storeName}</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight">
            Official Kinetic Green products. Local Shahdol enquiries. No online payment.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68">{settings.footerCopy}</p>
          <div className="mt-6"><ContactActions settings={settings} /></div>
        </div>
        <div className="grid gap-6 text-sm text-white/72">
          <div>
            <h3 className="text-base font-black text-white">Showroom</h3>
            <p className="mt-3 leading-6">{settings.address}</p>
            <p className="mt-2">{settings.storeHours}</p>
          </div>
          <div>
            <h3 className="text-base font-black text-white">Pages</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {["No Licence EVs", "Vehicles", "FAQ", "Policies", "Contact"].map((label) => (
                <Link key={label} href={`/${label.toLowerCase().replaceAll(" ", "-").replace("no-licence-evs", "no-licence-ev")}`} className="hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
