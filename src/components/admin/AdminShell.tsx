import Link from "next/link";
import type { ReactNode } from "react";
import { BarChart3, Car, DownloadCloud, HelpCircle, Images, Inbox, LayoutPanelTop, MapPinned, ShieldCheck } from "lucide-react";

const adminNav = [
  ["Dashboard", "/admin", BarChart3],
  ["Products", "/admin/products", Car],
  ["Enquiries", "/admin/enquiries", Inbox],
  ["Store", "/admin/store", MapPinned],
  ["Homepage", "/admin/homepage", LayoutPanelTop],
  ["Import", "/admin/import", DownloadCloud],
  ["FAQs", "/admin/faqs", HelpCircle],
  ["Policies", "/admin/policies", ShieldCheck],
  ["Gallery", "/admin/gallery", Images],
];

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-lg border border-[#dfe8df] bg-white p-3">
        <p className="px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#13a538]">
          Admin Panel
        </p>
        <nav className="grid gap-1">
          {adminNav.map(([label, href, Icon]) => (
            <Link
              key={href as string}
              href={href as string}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-[#303a33] hover:bg-[#eef8ef]"
            >
              <Icon size={18} />
              {label as string}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}

export function AdminCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-[#dfe8df] bg-white p-5 shadow-[0_12px_40px_rgba(16,21,19,0.05)]">
      <h2 className="text-2xl font-black text-[#101513]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
