import type { GalleryItem } from "@/lib/types";

export function GallerySection({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="flex min-h-56 items-end rounded-lg border border-dashed border-[#b8d8bd] bg-[linear-gradient(135deg,#f6fff6,#e8f7ea)] p-4"
        >
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt={item.caption} className="h-full w-full object-cover" />
          ) : (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#13a538]">
                Photo {index + 1}
              </p>
              <p className="mt-2 text-lg font-black text-[#101513]">{item.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
