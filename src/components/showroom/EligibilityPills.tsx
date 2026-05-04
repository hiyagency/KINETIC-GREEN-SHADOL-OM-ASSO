import { BadgeCheck, BatteryCharging, Gauge, GraduationCap, ShieldCheck } from "lucide-react";
import type { Product } from "@/lib/types";

export function EligibilityPills({ product }: { product: Product }) {
  const pills = [
    product.noLicenceRequired ? ["No-License", BadgeCheck] : null,
    product.noRtoRequired ? ["Non-Registration", ShieldCheck] : null,
    product.lowSpeedVehicle ? ["Daily Ride EV", Gauge] : null,
    product.studentFriendly ? ["Student Friendly", GraduationCap] : null,
    product.batteryType?.toLowerCase().includes("lithium") ? ["Lithium Battery", BatteryCharging] : null,
    product.warranty ? ["Warranty Support", BadgeCheck] : null,
  ].filter(Boolean) as [string, typeof BadgeCheck][];

<<<<<<< HEAD
=======
  if (!pills.length) {
    return <span className="rounded-full bg-[#eef1ee] px-3 py-1 text-xs font-black text-[#5a655d]">Visit showroom</span>;
  }

>>>>>>> d98ef1a (Refine public showroom content and 360 viewer)
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
