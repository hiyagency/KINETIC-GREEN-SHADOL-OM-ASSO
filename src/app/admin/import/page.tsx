import { AdminCard } from "@/components/admin/AdminShell";
import products from "@/lib/data/official-products.json";
import { importOfficialProducts } from "@/app/admin/actions";

export default function ImportPage() {
  return (
    <div className="grid gap-5">
      <AdminCard title="Official Kinetic Green importer">
        <div className="grid gap-4">
          <p className="text-sm leading-6 text-[#5c675f]">
            This project includes `scripts/import-kinetic-products.ts`. It fetches the official product API, detail API, gallery images, variants, brochure URLs and 360 image sequences where available.
          </p>
          <form className="grid gap-3">
            <label className="grid gap-1 text-sm font-bold">
              Official product URLs, one per line
              <textarea className="rounded-xl border border-[#dfe8df] p-3" rows={5} placeholder="https://www.kineticgreen.com/product/6" />
            </label>
            <label className="grid gap-1 text-sm font-bold">
              Manual paste fallback JSON
              <textarea className="rounded-xl border border-[#dfe8df] p-3" rows={7} placeholder="Paste product data if scraping/API fails" />
            </label>
          </form>
          <div className="rounded-xl bg-[#f5faf5] p-4 text-sm font-semibold text-[#5c675f]">
            Run locally: `npm run import:kinetic`. In deployed environments where scraping is blocked, paste official URLs/assets manually and set status to Needs review.
          </div>
          <form action={importOfficialProducts}>
            <button className="rounded-xl bg-[#13a538] px-5 py-3 text-sm font-black text-white">
              Import bundled official products into Supabase
            </button>
          </form>
        </div>
      </AdminCard>
      <AdminCard title="Current import status">
        <div className="grid gap-3 md:grid-cols-2">
          {(products as { id: string; name: string; importStatus?: string; heroImageUrl?: string; viewer360Images?: string[] }[]).map((product) => (
            <div key={product.id} className="rounded-xl border border-[#dfe8df] p-4">
              <p className="font-black">{product.name}</p>
              <p className="text-sm text-[#5c675f]">
                {product.importStatus || "Imported"} | {product.heroImageUrl ? "Image ok" : "Missing images"} | {(product.viewer360Images?.length || 0) > 1 ? "360 ok" : "Missing 360"}
              </p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
