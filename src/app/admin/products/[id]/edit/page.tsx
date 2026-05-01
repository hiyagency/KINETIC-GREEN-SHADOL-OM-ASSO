import { AdminCard } from "@/components/admin/AdminShell";
import { VehicleForm } from "@/components/admin/AdminForms";
import { getAllProductsForAdmin } from "@/lib/data/queries";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = await getAllProductsForAdmin();
  const product = products.find((item) => item.id === id);
  return (
    <AdminCard title={product ? `Edit ${product.name}` : "Product not found"}>
      <VehicleForm vehicle={product} />
    </AdminCard>
  );
}
