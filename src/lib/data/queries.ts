import "server-only";

import { gallery, faqs, policies, products, storeSettings } from "@/lib/data/demo";
import type { FAQ, GalleryItem, Policy, Product, StoreSettings } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String) : [];
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    officialId: String(row.official_id || ""),
    name: String(row.name || ""),
    slug: String(row.slug || ""),
    category: String(row.category || ""),
    officialUrl: String(row.official_url || ""),
    shortDescription: String(row.short_description || ""),
    longDescription: String(row.long_description || ""),
    heroImageUrl: String(row.hero_image_url || ""),
    galleryImages: asStringArray(row.gallery_images),
    viewer360Type:
      row.viewer_360_type === "embed" || row.viewer_360_type === "images"
        ? row.viewer_360_type
        : "placeholder",
    viewer360Images: asStringArray(row.viewer_360_images),
    viewer360EmbedUrl: String(row.viewer_360_embed_url || ""),
    priceLabel: String(row.price_label || "Contact showroom"),
    batteryType: String(row.battery_type || ""),
    rangeLabel: String(row.range_label || ""),
    topSpeed: String(row.top_speed || ""),
    motorPower: String(row.motor_power || ""),
    chargingTime: String(row.charging_time || ""),
    warranty: String(row.warranty || "Confirm with showroom"),
    variants: Array.isArray(row.variants) ? row.variants as Product["variants"] : [],
    colors: Array.isArray(row.colors) ? row.colors as Product["colors"] : [],
    specifications:
      row.specifications && typeof row.specifications === "object"
        ? row.specifications as Record<string, string>
        : {},
    highlights: Array.isArray(row.highlights) ? row.highlights as Product["highlights"] : [],
    noLicenceRequired: Boolean(row.no_licence_required),
    noRtoRequired: Boolean(row.no_rto_required),
    lowSpeedVehicle: Boolean(row.low_speed_vehicle),
    studentFriendly: Boolean(row.student_friendly),
    eligibilityNote: String(row.eligibility_note || ""),
    disclaimerText: String(row.disclaimer_text || ""),
    brochureUrl: String(row.brochure_url || ""),
    isFeatured: Boolean(row.is_featured),
    isPublished: Boolean(row.is_published),
    importStatus: String(row.import_status || ""),
    sortOrder: Number(row.sort_order || 0),
  };
}

export async function getProducts() {
  if (!hasSupabaseEnv()) return products;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (error || !data) return products;
  return data.map((row) => mapProduct(row as Record<string, unknown>));
}

export async function getAllProductsForAdmin() {
  if (!hasSupabaseEnv()) return products;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data) return products;
  return data.map((row) => mapProduct(row as Record<string, unknown>));
}

export async function getVehicles() {
  return getProducts();
}

export async function getAllVehiclesForAdmin() {
  return getAllProductsForAdmin();
}

export async function getProductBySlug(slug: string) {
  const all = await getProducts();
  return all.find((product) => product.slug === slug) || null;
}

export async function getVehicleBySlug(slug: string) {
  return getProductBySlug(slug);
}

export async function getEligibleProducts() {
  const all = await getProducts();
  return all.filter(
    (product) =>
      product.noLicenceRequired && product.noRtoRequired && product.isPublished,
  );
}

export async function getEligibleVehicles() {
  return getEligibleProducts();
}

export async function getStoreSettings(): Promise<StoreSettings> {
  if (!hasSupabaseEnv()) return storeSettings;
  const supabase = await createClient();
  const { data, error } = await supabase.from("site_settings").select("key,value");
  if (error || !data) return storeSettings;
  return data.reduce<StoreSettings>((acc, item) => {
    const key = item.key as keyof StoreSettings;
    if (key in acc) return { ...acc, [key]: item.value };
    return acc;
  }, storeSettings);
}

export async function getFaqs(limit?: number, category?: string): Promise<FAQ[]> {
  if (!hasSupabaseEnv()) {
    const filtered = category ? faqs.filter((faq) => faq.category === category) : faqs;
    return limit ? filtered.slice(0, limit) : filtered;
  }
  const supabase = await createClient();
  let query = supabase
    .from("faqs")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (category) query = query.eq("category", category);
  const { data, error } = limit ? await query.limit(limit) : await query;
  if (error || !data) return limit ? faqs.slice(0, limit) : faqs;
  return data.map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
    category: row.category || "General",
    productId: row.product_id,
    isPublished: row.is_published,
    sortOrder: row.sort_order,
  }));
}

export async function getPolicies(): Promise<Policy[]> {
  if (!hasSupabaseEnv()) return policies;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("policies")
    .select("*")
    .eq("is_published", true);
  if (error || !data) return policies;
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    content: row.content || "",
    officialReferenceUrl: row.official_reference_url || "",
    isPublished: row.is_published,
  }));
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (!hasSupabaseEnv()) return gallery;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data) return gallery;
  return data.map((row) => ({
    id: row.id,
    imageUrl: row.image_url || "",
    caption: row.caption || "",
    type: row.type || "showroom",
    isFeatured: row.is_featured,
    sortOrder: row.sort_order,
  }));
}

export async function getEnquiriesForAdmin() {
  if (!hasSupabaseEnv()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}
