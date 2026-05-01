import { AdminCard } from "@/components/admin/AdminShell";
import { StoreDetailsForm } from "@/components/admin/AdminForms";
import { getStoreSettings } from "@/lib/data/queries";

export default async function AdminStorePage() {
  const settings = await getStoreSettings();
  return <AdminCard title="Store details"><StoreDetailsForm settings={settings} /></AdminCard>;
}
