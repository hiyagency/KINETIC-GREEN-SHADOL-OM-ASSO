"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import type { StoreSettings } from "@/lib/types";
import { phoneHref } from "@/lib/utils";

const nav = [
  ["Home", "/"],
  ["No Licence EVs", "/no-licence-ev"],
  ["Vehicles", "/vehicles"],
  ["About", "/about"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

export function Header({ settings }: { settings: StoreSettings }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b100c]/95 text-white backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="leading-tight">
          <span className="block text-sm font-black tracking-[0.18em] text-[#21c44d]">KINETIC GREEN</span>
          <span className="block text-xs font-semibold text-white/75">Shahdol by Om Associates</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="text-sm font-bold text-white/78 hover:text-[#21c44d]">
              {label}
            </Link>
          ))}
          <ButtonLink href={phoneHref(settings.phones[0])} variant="light">
            <Phone size={16} /> Call Showroom
          </ButtonLink>
          <ButtonLink href="/book-enquiry">Enquire Now</ButtonLink>
        </nav>
        <button
          aria-label="Open menu"
          className="rounded-xl border border-white/15 p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/10 bg-[#0b100c] px-4 pb-4 lg:hidden">
          <div className="grid gap-1 py-3">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold text-white/86 hover:bg-white/10"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <ButtonLink href={phoneHref(settings.phones[0])} variant="light">Call</ButtonLink>
            <ButtonLink href="/book-enquiry">Enquire</ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
