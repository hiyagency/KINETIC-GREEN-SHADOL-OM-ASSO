"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import importedProducts from "@/lib/data/official-products.json";

async function assertAdmin() {
  if (!hasSupabaseEnv()) return false;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Admin login required.");
  const { data } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!data) throw new Error("Admin access required.");
  return true;
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

export async function createVehicle(formData: FormData) {
  const isAdmin = await assertAdmin();
  const supabase = createAdminClient();
  if (!isAdmin || !supabase) return;

  const payload = {
    name: text(formData, "name"),
    slug: text(formData, "slug"),
    category: text(formData, "category"),
    official_url: text(formData, "officialUrl"),
    short_description: text(formData, "shortDescription"),
    long_description: text(formData, "longDescription"),
    hero_image_url: text(formData, "heroImageUrl"),
    viewer_360_type: text(formData, "viewer360Type") || "placeholder",
    viewer_360_embed_url: text(formData, "viewer360EmbedUrl"),
    viewer_360_images: text(formData, "viewer360Images").split("\n").map((item) => item.trim()).filter(Boolean),
    price_label: text(formData, "priceLabel") || "Contact showroom",
    battery_type: text(formData, "batteryType"),
    range_label: text(formData, "rangeLabel"),
    top_speed: text(formData, "topSpeed"),
    motor_power: text(formData, "motorPower"),
    charging_time: text(formData, "chargingTime"),
    warranty: text(formData, "warranty"),
    source_url: text(formData, "sourceUrl"),
    no_licence_required: checked(formData, "noLicenceRequired"),
    no_rto_required: checked(formData, "noRtoRequired"),
    low_speed_vehicle: checked(formData, "lowSpeedVehicle"),
    student_friendly: checked(formData, "studentFriendly"),
    is_featured: checked(formData, "isFeatured"),
    is_published: checked(formData, "isPublished"),
    eligibility_note: text(formData, "eligibilityNote"),
    disclaimer_text: text(formData, "disclaimerText"),
    brochure_url: text(formData, "brochureUrl"),
    import_status: text(formData, "importStatus") || "Needs review",
  };
  const id = text(formData, "id");
  if (/^[0-9a-f-]{36}$/i.test(id)) {
    await supabase.from("products").update(payload).eq("id", id);
  } else {
    await supabase.from("products").insert(payload);
  }
  revalidatePath("/");
  revalidatePath("/vehicles");
  revalidatePath("/admin/products");
}

export async function saveStoreSettings(formData: FormData) {
  const isAdmin = await assertAdmin();
  const supabase = createAdminClient();
  if (!isAdmin || !supabase) return;

  const keys = [
    "storeName",
    "managedBy",
    "address",
    "whatsappNumber",
    "whatsappUrl",
    "instagramUrl",
    "facebookUrl",
    "googleMapsEmbed",
    "googleMapsUrl",
    "storeHours",
    "heroHeadline",
    "heroSubheadline",
    "heroImageUrl",
    "brandLine",
    "footerCopy",
    "seoTitle",
    "seoDescription",
  ];

  const rows: { key: string; value: string | string[] }[] = keys.map((key) => ({
    key,
    value: text(formData, key),
  }));
  rows.push({
    key: "phones",
    value: text(formData, "phones")
      .split(",")
      .map((phone) => phone.trim())
      .filter(Boolean),
  });

  await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
  revalidatePath("/");
  revalidatePath("/admin/store");
}

export async function createFaq(formData: FormData) {
  const isAdmin = await assertAdmin();
  const supabase = createAdminClient();
  if (!isAdmin || !supabase) return;
  await supabase.from("faqs").insert({
    question: text(formData, "question"),
    answer: text(formData, "answer"),
    is_published: checked(formData, "isPublished"),
    sort_order: Number(text(formData, "sortOrder") || 0),
  });
  revalidatePath("/faq");
  revalidatePath("/admin/faqs");
}

export async function updatePolicy(formData: FormData) {
  const isAdmin = await assertAdmin();
  const supabase = createAdminClient();
  if (!isAdmin || !supabase) return;
  await supabase
    .from("policies")
    .update({
      title: text(formData, "title"),
      content: text(formData, "content"),
      is_published: checked(formData, "isPublished"),
    })
    .eq("slug", text(formData, "slug"));
  revalidatePath("/policies");
  revalidatePath("/admin/policies");
}

export async function createGalleryItem(formData: FormData) {
  const isAdmin = await assertAdmin();
  const supabase = createAdminClient();
  if (!isAdmin || !supabase) return;
  await supabase.from("gallery").insert({
    image_url: text(formData, "imageUrl"),
    caption: text(formData, "caption"),
    type: text(formData, "type") || "showroom",
    is_featured: checked(formData, "isFeatured"),
    sort_order: Number(text(formData, "sortOrder") || 0),
  });
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}

export async function importOfficialProducts() {
  const isAdmin = await assertAdmin();
  const supabase = createAdminClient();
  if (!isAdmin || !supabase) return;
  const rows = (importedProducts as Array<Record<string, unknown>>).map((product) => ({
    official_id: product.officialId,
    name: product.name,
    slug: product.slug,
    category: product.category,
    official_url: product.officialUrl,
    short_description: product.shortDescription,
    long_description: product.longDescription,
    hero_image_url: product.heroImageUrl,
    gallery_images: product.galleryImages,
    viewer_360_type: product.viewer360Type,
    viewer_360_images: product.viewer360Images,
    viewer_360_embed_url: product.viewer360EmbedUrl,
    price_label: product.priceLabel,
    battery_type: product.batteryType,
    range_label: product.rangeLabel,
    top_speed: product.topSpeed,
    motor_power: product.motorPower,
    charging_time: product.chargingTime,
    warranty: product.warranty,
    variants: product.variants,
    colors: product.colors,
    specifications: product.specifications,
    highlights: product.highlights,
    no_licence_required: product.noLicenceRequired,
    no_rto_required: product.noRtoRequired,
    low_speed_vehicle: product.lowSpeedVehicle,
    student_friendly: product.studentFriendly,
    eligibility_note: product.eligibilityNote,
    disclaimer_text: product.disclaimerText,
    brochure_url: product.brochureUrl,
    import_status: product.importStatus,
    is_featured: product.isFeatured,
    is_published: product.isPublished,
    sort_order: product.sortOrder,
  }));
  await supabase.from("products").upsert(rows, { onConflict: "slug" });
  revalidatePath("/");
  revalidatePath("/vehicles");
  revalidatePath("/admin/products");
}
