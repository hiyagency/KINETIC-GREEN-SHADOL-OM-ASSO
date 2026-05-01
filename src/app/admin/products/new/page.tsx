import { AdminCard } from "@/components/admin/AdminShell";
import { VehicleForm } from "@/components/admin/AdminForms";

export default function NewProductPage() {
  return <AdminCard title="Add product"><VehicleForm /></AdminCard>;
}
