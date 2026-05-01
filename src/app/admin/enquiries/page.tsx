import { AdminCard } from "@/components/admin/AdminShell";
import { getEnquiriesForAdmin } from "@/lib/data/queries";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiriesForAdmin();
  return (
    <AdminCard title="Enquiry table">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#dfe8df]">
              {["Customer", "Phone", "Vehicle", "Type", "Status", "Notes"].map((head) => (
                <th key={head} className="py-3 font-black">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="border-b border-[#edf3ed]">
                <td className="py-3">{enquiry.customer_name}</td>
                <td>{enquiry.phone}</td>
                <td>{enquiry.selected_vehicle_name}</td>
                <td>{enquiry.enquiry_type}</td>
                <td>{enquiry.status}</td>
                <td>{enquiry.admin_notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!enquiries.length ? <p className="py-5 text-sm text-[#5c675f]">No enquiries yet, or Supabase is not connected.</p> : null}
      </div>
    </AdminCard>
  );
}
