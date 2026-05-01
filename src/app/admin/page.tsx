import { AdminCard } from "@/components/admin/AdminShell";
import { getAllVehiclesForAdmin, getEnquiriesForAdmin, getFaqs, getStoreSettings } from "@/lib/data/queries";

export default async function AdminDashboardPage() {
  const [vehicles, enquiries, faqs, settings] = await Promise.all([
    getAllVehiclesForAdmin(),
    getEnquiriesForAdmin(),
    getFaqs(),
    getStoreSettings(),
  ]);
  const stats = [
    ["Total vehicles", vehicles.length],
    ["No-licence eligible vehicles", vehicles.filter((v) => v.noLicenceRequired).length],
    ["No-RTO eligible vehicles", vehicles.filter((v) => v.noRtoRequired).length],
    ["Total enquiries", enquiries.length],
    ["New enquiries", enquiries.filter((e) => e.status === "New").length],
    ["Published FAQs", faqs.length],
    ["Store info completion", settings.googleMapsEmbed ? "Complete" : "Needs map"],
  ];
  return (
    <AdminCard title="Dashboard">
      <div className="grid gap-3 md:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-[#f5faf5] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#13a538]">{label}</p>
            <p className="mt-2 text-3xl font-black text-[#101513]">{value}</p>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
