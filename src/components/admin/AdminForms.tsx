import type { FAQ, GalleryItem, Policy, StoreSettings, Vehicle } from "@/lib/types";
import { createFaq, createGalleryItem, createVehicle, saveStoreSettings, updatePolicy } from "@/app/admin/actions";

const inputClass =
  "rounded-lg border border-[#dfe8df] px-3 py-3 text-sm font-medium outline-none focus:border-[#13a538]";

export function VehicleForm({ vehicle }: { vehicle?: Vehicle }) {
  return (
    <form action={createVehicle} className="grid gap-4">
      <input type="hidden" name="id" value={vehicle?.id || ""} />
      <div className="grid gap-3 md:grid-cols-2">
        {[
          ["name", "Name", vehicle?.name],
          ["slug", "Slug", vehicle?.slug],
          ["category", "Category", vehicle?.category],
          ["officialUrl", "Official URL", vehicle?.officialUrl],
          ["priceLabel", "Price label", vehicle?.priceLabel],
          ["topSpeed", "Top Speed", vehicle?.topSpeed],
          ["motorPower", "Motor Power", vehicle?.motorPower],
          ["batteryType", "Battery Type", vehicle?.batteryType],
          ["rangeLabel", "Range Label", vehicle?.rangeLabel],
          ["chargingTime", "Charging Time", vehicle?.chargingTime],
          ["heroImageUrl", "Hero Image URL", vehicle?.heroImageUrl],
          ["viewer360Type", "360 Viewer Type", vehicle?.viewer360Type],
          ["viewer360EmbedUrl", "360 Embed URL", vehicle?.viewer360EmbedUrl],
          ["warranty", "Warranty", vehicle?.warranty],
          ["brochureUrl", "Brochure URL", vehicle?.brochureUrl],
          ["importStatus", "Import Status", vehicle?.importStatus],
        ].map(([name, label, value]) => (
          <label key={name} className="grid gap-1 text-sm font-bold text-[#202722]">
            {label}
            <input name={name} defaultValue={value} className={inputClass} />
          </label>
        ))}
      </div>
      <label className="grid gap-1 text-sm font-bold text-[#202722]">
        360 image sequence URLs, one per line
        <textarea name="viewer360Images" defaultValue={vehicle?.viewer360Images?.join("\n")} className={inputClass} rows={5} />
      </label>
      <label className="grid gap-1 text-sm font-bold text-[#202722]">
        Short description
        <textarea name="shortDescription" defaultValue={vehicle?.shortDescription} className={inputClass} rows={3} />
      </label>
      <label className="grid gap-1 text-sm font-bold text-[#202722]">
        Long description
        <textarea name="longDescription" defaultValue={vehicle?.longDescription} className={inputClass} rows={5} />
      </label>
      <div className="grid gap-3 md:grid-cols-3">
        {[
          ["noLicenceRequired", "No Licence Required", vehicle?.noLicenceRequired],
          ["noRtoRequired", "No RTO Registration Required", vehicle?.noRtoRequired],
          ["lowSpeedVehicle", "Low Speed Vehicle", vehicle?.lowSpeedVehicle],
          ["studentFriendly", "Student Friendly", vehicle?.studentFriendly],
          ["isFeatured", "Featured", vehicle?.isFeatured],
          ["isPublished", "Published", vehicle?.isPublished],
        ].map(([name, label, checked]) => (
          <label key={name as string} className="flex items-center gap-3 rounded-lg border border-[#dfe8df] p-3 text-sm font-bold">
            <input name={name as string} type="checkbox" defaultChecked={Boolean(checked)} />
            {label as string}
          </label>
        ))}
      </div>
      <label className="grid gap-1 text-sm font-bold text-[#202722]">
        Eligibility Note
        <textarea name="eligibilityNote" defaultValue={vehicle?.eligibilityNote} className={inputClass} rows={3} />
      </label>
      <label className="grid gap-1 text-sm font-bold text-[#202722]">
        Disclaimer Text
        <textarea name="disclaimerText" defaultValue={vehicle?.disclaimerText} className={inputClass} rows={3} />
      </label>
      <p className="rounded-lg bg-[#f5faf5] p-3 text-sm font-semibold text-[#5c675f]">
        Add vehicle saves after Supabase auth is configured. Existing vehicle edit/delete can be extended from the same action pattern.
      </p>
      <button className="rounded-lg bg-[#13a538] px-5 py-3 text-sm font-black text-white">Save vehicle</button>
    </form>
  );
}

export function StoreDetailsForm({ settings }: { settings: StoreSettings }) {
  return (
    <form action={saveStoreSettings} className="grid gap-3">
      {Object.entries(settings).map(([key, value]) => (
        <label key={key} className="grid gap-1 text-sm font-bold text-[#202722]">
          {key}
          <textarea name={key} className={inputClass} defaultValue={Array.isArray(value) ? value.join(", ") : String(value)} rows={key.includes("address") || key.includes("Embed") ? 4 : 2} />
        </label>
      ))}
      <button className="rounded-lg bg-[#13a538] px-5 py-3 text-sm font-black text-white">Save store details</button>
    </form>
  );
}

export function FAQForm({ faq }: { faq?: FAQ }) {
  return (
    <form action={createFaq} className="grid gap-3">
      <input name="question" className={inputClass} defaultValue={faq?.question} placeholder="Question" />
      <textarea name="answer" className={inputClass} defaultValue={faq?.answer} rows={4} placeholder="Answer" />
      <input name="sortOrder" className={inputClass} defaultValue={faq?.sortOrder || 0} placeholder="Sort order" />
      <label className="flex items-center gap-2 text-sm font-bold"><input name="isPublished" type="checkbox" defaultChecked={faq?.isPublished ?? true} /> Published</label>
      {!faq ? <button className="rounded-lg bg-[#13a538] px-5 py-3 text-sm font-black text-white">Add FAQ</button> : null}
    </form>
  );
}

export function PolicyEditor({ policy }: { policy?: Policy }) {
  return (
    <form action={updatePolicy} className="grid gap-3">
      <input type="hidden" name="slug" value={policy?.slug || ""} />
      <input name="title" className={inputClass} defaultValue={policy?.title} placeholder="Policy title" />
      <textarea name="content" className={inputClass} defaultValue={policy?.content} rows={6} placeholder="Policy content" />
      <label className="flex items-center gap-2 text-sm font-bold"><input name="isPublished" type="checkbox" defaultChecked={policy?.isPublished ?? true} /> Published</label>
      <button className="rounded-lg bg-[#13a538] px-5 py-3 text-sm font-black text-white">Save policy</button>
    </form>
  );
}

export function GalleryUploader({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid gap-3">
      <form action={createGalleryItem} className="grid gap-3 rounded-lg border border-dashed border-[#b8d8bd] bg-[#f5faf5] p-5">
        <input name="imageUrl" className={inputClass} placeholder="Uploaded image public URL" />
        <input name="caption" className={inputClass} placeholder="Caption" />
        <input name="type" className={inputClass} defaultValue="showroom" />
        <input name="sortOrder" className={inputClass} defaultValue="0" />
        <label className="flex items-center gap-2 text-sm font-bold"><input name="isFeatured" type="checkbox" /> Featured</label>
        <button className="rounded-lg bg-[#13a538] px-5 py-3 text-sm font-black text-white">Add gallery item</button>
      </form>
      {items.map((item) => (
        <div key={item.id} className="rounded-lg border border-[#dfe8df] p-4">
          <p className="font-black">{item.caption}</p>
          <p className="text-sm text-[#5c675f]">{item.imageUrl || "Photo placeholder"}</p>
        </div>
      ))}
    </div>
  );
}
