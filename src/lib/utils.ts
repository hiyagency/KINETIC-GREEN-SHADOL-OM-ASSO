import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product, StoreSettings } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/\D/g, "")}`;
}

export function directionsHref(settings: StoreSettings) {
  return settings.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`;
}

export function whatsappNumber(settings: StoreSettings) {
  return settings.whatsappNumber || "919243016493";
}

export function whatsappMessage(kind: "product" | "licence" | "general", product?: Product) {
  if (kind === "product" && product) {
    return `नमस्ते Kinetic Green Shahdol, मुझे ${product.name} के बारे में जानकारी चाहिए. कृपया price, availability और test ride details बताएं.`;
  }
  if (kind === "licence") {
    return "नमस्ते Kinetic Green Shahdol, मुझे बिना licence और बिना RTO वाले EV models के बारे में जानकारी चाहिए.";
  }
  return "नमस्ते Kinetic Green Shahdol, मुझे electric scooter के बारे में जानकारी चाहिए.";
}

export function whatsappHref(settings: StoreSettings, message: string) {
  return `https://wa.me/${whatsappNumber(settings)}?text=${encodeURIComponent(message)}`;
}

export function whatsappUrl(catalogUrl: string, productName?: string) {
  const message = productName
    ? `नमस्ते Kinetic Green Shahdol, मुझे ${productName} के बारे में जानकारी चाहिए.`
    : whatsappMessage("general");
  return catalogUrl || `https://wa.me/919243016493?text=${encodeURIComponent(message)}`;
}

export function formatSpec(value: string) {
  return value && value !== "0" ? value : "Confirm with showroom";
}

export function officialAssetSrc(url: string) {
  if (!url) return "";
  return url.startsWith("https://www.kineticgreen.com/")
    ? `/api/official-asset?url=${encodeURIComponent(url)}`
    : url;
}
