import { AdminCard } from "@/components/admin/AdminShell";
import { PolicyEditor } from "@/components/admin/AdminForms";
import { getPolicies } from "@/lib/data/queries";

export default async function AdminPoliciesPage() {
  const policies = await getPolicies();
  return (
    <AdminCard title="Policy editor">
      <div className="grid gap-5">{policies.map((policy) => <PolicyEditor key={policy.id} policy={policy} />)}</div>
    </AdminCard>
  );
}
