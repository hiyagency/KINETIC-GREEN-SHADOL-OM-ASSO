import { BadgeCheck, Gauge, ShieldCheck } from "lucide-react";
import type { Vehicle } from "@/lib/types";

export function EligibilityBadges({ vehicle }: { vehicle: Vehicle }) {
  const badges = [
    vehicle.noLicenceRequired ? ["No Licence Required", BadgeCheck] : null,
    vehicle.noRtoRequired ? ["No RTO Required", ShieldCheck] : null,
    vehicle.lowSpeedVehicle ? ["Low Speed EV", Gauge] : null,
  ].filter(Boolean) as [string, typeof BadgeCheck][];

  if (!badges.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map(([label, Icon]) => (
        <span
          key={label}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#eaffed] px-3 py-1.5 text-xs font-black text-[#0d7d29]"
        >
          <Icon size={14} />
          {label}
        </span>
      ))}
    </div>
  );
}
