"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { FAQ } from "@/lib/types";

export function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<string | null>(faqs[0]?.id || null);
  return (
    <div className="grid gap-3">
      {faqs.map((faq) => (
        <div key={faq.id} className="rounded-lg border border-[#dfe8df] bg-white">
          <button
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
            className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left font-bold text-[#101513]"
          >
            {faq.question}
            <ChevronDown
              size={18}
              className={`shrink-0 transition ${open === faq.id ? "rotate-180" : ""}`}
            />
          </button>
          {open === faq.id ? (
            <p className="px-4 pb-4 text-sm leading-6 text-[#5c675f]">{faq.answer}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
