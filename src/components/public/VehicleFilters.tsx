"use client";

import { useMemo, useState } from "react";
import { VehicleCard } from "@/components/public/VehicleCard";
import type { StoreSettings, Vehicle } from "@/lib/types";

const filters = [
  "All",
  "No-License",
  "Non-Registration",
  "Electric Scooter",
  "Student EV",
  "Daily Ride EV",
  "Student Friendly",
  "Featured",
];

export function VehicleFilters({
  vehicles,
  settings,
}: {
  vehicles: Vehicle[];
  settings: StoreSettings;
}) {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (active === "All") return true;
      if (active === "No-License") return vehicle.noLicenceRequired;
      if (active === "Non-Registration") return vehicle.noRtoRequired;
      if (active === "Student Friendly") return vehicle.studentFriendly;
      if (active === "Daily Ride EV") return vehicle.lowSpeedVehicle;
      if (active === "Electric Scooter" || active === "Student EV") return true;
      if (active === "Featured") return vehicle.isFeatured;
      return vehicle.category === active;
    });
  }, [active, vehicles]);

  return (
    <div className="grid gap-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActive(filter)}
            className={`shrink-0 rounded-lg border px-4 py-2 text-sm font-bold transition ${
              active === filter
                ? "border-[#13a538] bg-[#13a538] text-white"
                : "border-[#dfe8df] bg-white text-[#3f4a42]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} settings={settings} />
        ))}
      </div>
    </div>
  );
}
