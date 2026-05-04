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
<<<<<<< HEAD
    return `Hi, I’m interested in the Kinetic Green ${product.name}. Please share price, availability, warranty and showroom details.`;
  }
  if (kind === "licence") {
    return "Hi, I’m looking for non-RTO electric two-wheelers for daily city use. Please share available models and prices.";
  }
  return "Hi, I’m interested in your non-RTO electric two-wheelers. Please share today’s models, prices, and warranty details.";
=======
    return `Hello Kinetic Green Shahdol, I want details for ${product.name}. Please share price, availability, finance and test ride details.`;
  }
  if (kind === "licence") {
    return "Hello Kinetic Green Shahdol, I want details for non-registration electric two-wheelers for students and daily local rides.";
  }
  return "Hello Kinetic Green Shahdol, I want details for electric two-wheelers available at the Shahdol showroom.";
>>>>>>> d98ef1a (Refine public showroom content and 360 viewer)
}

export function whatsappHref(settings: StoreSettings, message: string) {
  return `https://wa.me/${whatsappNumber(settings)}?text=${encodeURIComponent(message)}`;
}

export function whatsappUrl(catalogUrl: string, productName?: string) {
  const message = productName
    ? `Hello Kinetic Green Shahdol, I want details for ${productName}.`
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
