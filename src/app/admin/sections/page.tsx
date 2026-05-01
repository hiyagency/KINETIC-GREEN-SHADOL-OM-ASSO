import { AdminCard } from "@/components/admin/AdminShell";

export default function AdminSectionsPage() {
  return (
    <AdminCard title="Website section editor">
      <div className="grid gap-3">
        {["Hero headline", "Hero subheadline", "Hero badges", "CTA text", "No-licence explanation", "Student section", "Battery section", "Gallery heading", "Footer copy"].map((item) => (
          <label key={item} className="grid gap-1 text-sm font-bold">
            {item}
            <textarea className="rounded-lg border border-[#dfe8df] px-3 py-3" rows={3} />
          </label>
        ))}
      </div>
    </AdminCard>
  );
}
