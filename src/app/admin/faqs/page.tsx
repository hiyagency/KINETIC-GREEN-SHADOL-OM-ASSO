import { AdminCard } from "@/components/admin/AdminShell";
import { FAQForm } from "@/components/admin/AdminForms";
import { getFaqs } from "@/lib/data/queries";

export default async function AdminFaqsPage() {
  const faqs = await getFaqs();
  return (
    <div className="grid gap-5">
      <AdminCard title="FAQ form"><FAQForm /></AdminCard>
      <AdminCard title="Published FAQs">
        <div className="grid gap-3">{faqs.map((faq) => <FAQForm key={faq.id} faq={faq} />)}</div>
      </AdminCard>
    </div>
  );
}
