import { writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const BASE_URL = "https://www.kineticgreen.com";
const LIST_API = `${BASE_URL}/api/admin/list_products.php`;
const DETAIL_API = `${BASE_URL}/api/admin/manage_product.php?action=fetch&id=`;
const SNAPSHOT = path.join(process.cwd(), "scripts", "official-products.snapshot.json");
const OUTPUT = path.join(process.cwd(), "src", "lib", "data", "official-products.json");

type RawVariant = {
  color_name?: string;
  color_code?: string;
  additional_price?: string;
  image_urls?: string[];
};

type RawFeature = {
  title?: string;
  description?: string;
  image_url?: string;
};

type RawProduct = {
  id: string;
  parent_id?: string | null;
  product_name?: string;
  product_title?: string;
  category?: string;
  sku?: string;
  price?: string;
  status?: string;
  top_speed?: string;
  product_range?: string;
  gradeability?: string;
  motor_type?: string;
  peak_max_power?: string;
  drive_system?: string;
  battery_type?: string;
  battery_capacity_kwh?: string;
  battery_capacity_ah?: string;
  system_voltage?: string;
  charging_time?: string;
  charger_spec?: string;
  battery_detail?: string;
  ground_clearance?: string;
  wheel_base?: string;
  overall_length?: string;
  overall_width?: string;
  overall_height?: string;
  total_kerb_weight?: string;
  wheel_type?: string;
  tyre_size?: string;
  front_suspension?: string;
  rear_suspension?: string;
  brakes_system?: string;
  brake_front?: string;
  brake_rear?: string;
  display_cluster?: string;
  headlamp?: string;
  seat_type_capacity?: string;
  payload?: string;
  thumbnail_url?: string;
  banner_url?: string;
  mobile_banner_url?: string;
  brochure_url?: string;
  gallery?: { image_url?: string }[];
  variants?: RawVariant[];
  features?: RawFeature[];
};

function absoluteAsset(value?: string | null) {
  if (!value) return "";
  if (value.startsWith("http")) return value;
  return `${BASE_URL}/${value.replace(/^\/+/, "")}`;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function isNoLicenceCandidate(product: RawProduct) {
  const speed = Number.parseFloat(product.top_speed || "");
  const power = String(product.peak_max_power || "").toLowerCase();
  return product.category === "Scooters" && speed <= 25 && power.includes("250");
}

function cleanSpecs(product: RawProduct) {
  const specs: Record<string, string> = {};
  const fields: [string, keyof RawProduct][] = [
    ["Gradeability", "gradeability"],
    ["Motor Type", "motor_type"],
    ["Peak / Max Power", "peak_max_power"],
    ["Drive System", "drive_system"],
    ["Battery Type", "battery_type"],
    ["Battery Capacity", "battery_capacity_kwh"],
    ["Battery Capacity Ah", "battery_capacity_ah"],
    ["System Voltage", "system_voltage"],
    ["Charging Time", "charging_time"],
    ["Charger Spec", "charger_spec"],
    ["Ground Clearance", "ground_clearance"],
    ["Wheel Base", "wheel_base"],
    ["Overall Length", "overall_length"],
    ["Overall Width", "overall_width"],
    ["Overall Height", "overall_height"],
    ["Kerb Weight", "total_kerb_weight"],
    ["Wheel Type", "wheel_type"],
    ["Tyre Size", "tyre_size"],
    ["Front Suspension", "front_suspension"],
    ["Rear Suspension", "rear_suspension"],
    ["Brakes", "brakes_system"],
    ["Front Brake", "brake_front"],
    ["Rear Brake", "brake_rear"],
    ["Display Cluster", "display_cluster"],
    ["Headlamp", "headlamp"],
    ["Seat", "seat_type_capacity"],
    ["Payload", "payload"],
  ];
  fields.forEach(([label, key]) => {
    const value = product[key];
    if (value && value !== "0") specs[label] = String(value);
  });
  return specs;
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

async function loadProducts() {
  try {
    const list = await fetchJson(LIST_API);
    if (!Array.isArray(list.data)) throw new Error("Official API returned no products.");
    const detailed = await Promise.all(
      list.data.map(async (product: RawProduct) => {
        try {
          const detail = await fetchJson(`${DETAIL_API}${product.id}`);
          return detail.data || product;
        } catch {
          return product;
        }
      }),
    );
    await writeFile(SNAPSHOT, JSON.stringify({ status: "success", data: detailed }, null, 2));
    return detailed;
  } catch (error) {
    if (!existsSync(SNAPSHOT)) throw error;
    const snapshot = JSON.parse(await readFile(SNAPSHOT, "utf8"));
    return snapshot.data;
  }
}

async function main() {
  const rawProducts: RawProduct[] = await loadProducts();
  const normalized = rawProducts.map((product, index) => {
    const name = product.product_name || `Kinetic Green Product ${product.id}`;
    const variantFrames = product.variants?.flatMap((variant) =>
      (variant.image_urls || []).map(absoluteAsset),
    ) || [];
    const noLicence = isNoLicenceCandidate(product);
    const gallery = [
      product.banner_url,
      product.mobile_banner_url,
      ...(product.gallery || []).map((item) => item.image_url),
    ]
      .map(absoluteAsset)
      .filter(Boolean);

    return {
      id: `official-${product.id}`,
      officialId: product.id,
      name,
      slug: slugify(name),
      category: product.category || "Official Product",
      officialUrl: `${BASE_URL}/product/${product.id}`,
      shortDescription:
        product.product_title ||
        "Official Kinetic Green product data imported from the live product API.",
      longDescription:
        product.product_title ||
        "Official Kinetic Green product data imported for Kinetic Green Shahdol. Final availability, price and eligibility must be confirmed with the showroom.",
      heroImageUrl: absoluteAsset(product.thumbnail_url || product.banner_url || product.mobile_banner_url),
      galleryImages: gallery,
      viewer360Type: variantFrames.length > 1 ? "images" : "placeholder",
      viewer360Images: variantFrames,
      viewer360EmbedUrl: "",
      priceLabel: product.price ? `₹${product.price}` : "Contact showroom",
      batteryType: product.battery_type || "",
      rangeLabel: product.product_range ? `${product.product_range} km` : "",
      topSpeed: product.top_speed ? `${product.top_speed} km/h` : "",
      motorPower: product.peak_max_power || "",
      chargingTime: product.charging_time ? `${product.charging_time} hrs` : "",
      warranty: "Confirm warranty with showroom",
      variants:
        product.variants?.map((variant) => ({
          name: variant.color_name || "Variant",
          color: variant.color_code || "#0fae45",
          additionalPrice: variant.additional_price || "0",
          imageUrls: (variant.image_urls || []).map(absoluteAsset),
        })) || [],
      colors:
        product.variants?.map((variant) => ({
          name: variant.color_name || "Color",
          value: variant.color_code || "#0fae45",
        })) || [],
      specifications: cleanSpecs(product),
      highlights:
        product.features?.map((feature) => ({
          title: feature.title || "",
          description: feature.description || "",
          imageUrl: absoluteAsset(feature.image_url),
        })) || [],
      noLicenceRequired: noLicence,
      noRtoRequired: noLicence,
      lowSpeedVehicle: Number.parseFloat(product.top_speed || "") <= 25,
      studentFriendly: noLicence,
      eligibilityNote: noLicence
        ? "Official data shows 25 km/h top speed and 250 W motor power. Showroom must verify current no-licence/no-RTO eligibility before purchase."
        : "No-licence/no-RTO eligibility is not enabled for this imported product until admin verifies it.",
      disclaimerText:
        "यह सुविधा केवल selected low-speed EV models पर लागू हो सकती है. Model, speed category, motor power और current government rules के अनुसार eligibility बदल सकती है. Purchase से पहले showroom से confirm करें.",
      brochureUrl: absoluteAsset(product.brochure_url),
      isFeatured: index < 6 || noLicence,
      isPublished: true,
      importStatus: variantFrames.length > 1 ? "Imported" : "Missing 360",
      sortOrder: index + 1,
    };
  });

  await writeFile(OUTPUT, JSON.stringify(normalized, null, 2));
  console.log(`Imported ${normalized.length} products into ${OUTPUT}`);
  normalized.forEach((product) => {
    const missing = [
      product.heroImageUrl ? "" : "image",
      product.viewer360Type === "images" ? "" : "360",
      Object.keys(product.specifications).length ? "" : "specs",
    ].filter(Boolean);
    console.log(`${product.name}: ${missing.length ? `missing ${missing.join(", ")}` : "complete"}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
