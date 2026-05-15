import "server-only";

import { gallery, faqs, policies, products, storeSettings } from "@/lib/data/demo";
import type { FAQ, GalleryItem, Policy, Product, StoreSettings } from "@/lib/types";

const ALLOWED_PUBLIC_PRODUCT_IDS = new Set(["1", "2", "3", "4", "5", "6"]);
const ALLOWED_PUBLIC_PRODUCT_SLUGS = new Set([
  "e-luna-go",
  "e-luna-plus",
  "e-luna-pro",
  "e-luna-prime",
  "e-zulu-signature-edition",
  "zing",
]);

const DISALLOWED_PUBLIC_PRODUCT_TERMS = [
  "3 wheeler",
  "three wheeler",
  "auto",
  "rickshaw",
  "commercial",
  "cargo",
  "passenger",
  "rto vehicle",
  "safar",
  "flatbed",
];

function hasDisallowedPublicTerm(product: Product) {
  const text = [
    product.name,
    product.slug,
    product.category,
    product.shortDescription,
    product.longDescription,
  ]
    .join(" ")
    .toLowerCase();

  return DISALLOWED_PUBLIC_PRODUCT_TERMS.some((term) => text.includes(term));
}

function isPublicTwoWheelerProduct(product: Product) {
  return (
    product.isPublished &&
    (ALLOWED_PUBLIC_PRODUCT_IDS.has(product.officialId || "") ||
      ALLOWED_PUBLIC_PRODUCT_SLUGS.has(product.slug)) &&
    !hasDisallowedPublicTerm(product)
  );
}

export async function getProducts() {
  return products.filter(isPublicTwoWheelerProduct).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getVehicles() {
  return getProducts();
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
  return all.filter(isPublicTwoWheelerProduct);
}

export async function getEligibleVehicles() {
  return getEligibleProducts();
}

export async function getStoreSettings(): Promise<StoreSettings> {
  return storeSettings;
}

export async function getFaqs(limit?: number, category?: string): Promise<FAQ[]> {
  const filtered = category ? faqs.filter((faq) => faq.category === category) : faqs;
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getPolicies(): Promise<Policy[]> {
  return policies;
}

export async function getGallery(): Promise<GalleryItem[]> {
  return gallery.sort((a, b) => a.sortOrder - b.sortOrder);
}
