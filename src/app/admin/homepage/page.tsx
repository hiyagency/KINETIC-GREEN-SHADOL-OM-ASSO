import { AdminCard } from "@/components/admin/AdminShell";

export default function AdminHomepagePage() {
  return (
    <AdminCard title="Homepage editor">
      <div className="grid gap-3">
        {[
          "SEO title",
          "SEO description",
          "Hero headline",
          "Hero subheadline",
          "Hero image URL",
          "Banner text",
          "No Licence explainer",
          "Student section",
          "Battery/warranty section",
          "Footer copy",
        ].map((item) => (
          <label key={item} className="grid gap-1 text-sm font-bold">
            {item}
            <textarea className="rounded-xl border border-[#dfe8df] px-3 py-3" rows={3} />
          </label>
        ))}
      </div>
    </AdminCard>
  );
}
