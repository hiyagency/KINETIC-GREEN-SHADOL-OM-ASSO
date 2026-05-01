import Link from "next/link";
import { AdminCard } from "@/components/admin/AdminShell";
import { getAllProductsForAdmin } from "@/lib/data/queries";

export default async function AdminProductsPage() {
  const products = await getAllProductsForAdmin();
  return (
    <div className="grid gap-5">
      <AdminCard title="Product manager">
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/new" className="rounded-xl bg-[#13a538] px-5 py-3 text-sm font-black text-white">Add product</Link>
          <Link href="/admin/import" className="rounded-xl border border-[#dfe8df] px-5 py-3 text-sm font-black">Import official products</Link>
        </div>
      </AdminCard>
      <AdminCard title="Imported official products">
        <div className="grid gap-3">
          {products.map((product) => (
            <Link key={product.id} href={`/admin/products/${product.id}/edit`} className="rounded-xl border border-[#dfe8df] p-4 hover:bg-[#f5faf5]">
              <p className="font-black">{product.name}</p>
              <p className="text-sm text-[#5c675f]">
                {product.category} | {product.importStatus || "Imported"} | No Licence: {String(product.noLicenceRequired)} | No RTO: {String(product.noRtoRequired)}
              </p>
            </Link>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
