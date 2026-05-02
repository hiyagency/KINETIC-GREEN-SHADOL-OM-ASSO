import { BadgeCheck, BatteryCharging, Gauge, GraduationCap, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/types";

export function EligibilityPills({ product }: { product: Product }) {
  const pills = [
    product.noLicenceRequired ? ["No Licence", BadgeCheck] : null,
    product.noRtoRequired ? ["No RTO", ShieldCheck] : null,
    product.lowSpeedVehicle ? ["Low Speed", Gauge] : null,
    product.studentFriendly ? ["Student Friendly", GraduationCap] : null,
    product.batteryType?.toLowerCase().includes("lithium") ? ["Lithium Battery", BatteryCharging] : null,
    product.warranty ? ["Warranty Support", BadgeCheck] : null,
  ].filter(Boolean) as [string, typeof BadgeCheck][];

  return (
    <div className="flex flex-wrap gap-2">
      {pills.map(([label, Icon]) => (
        <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-[#e6f8e9] px-3 py-1.5 text-xs font-black text-[#0a8930]">
          <Icon size={14} /> {label}
        </span>
      ))}
    </div>
  );
}
