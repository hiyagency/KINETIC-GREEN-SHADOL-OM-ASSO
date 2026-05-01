export type ProductVariant = {
  name: string;
  color: string;
  additionalPrice?: string;
  imageUrls: string[];
};

export type ProductColor = {
  name: string;
  value: string;
};

export type ProductHighlight = {
  title: string;
  description: string;
  imageUrl?: string;
};

export type Product = {
  id: string;
  officialId?: string;
  name: string;
  slug: string;
  category: string;
  officialUrl: string;
  shortDescription: string;
  longDescription: string;
  heroImageUrl: string;
  galleryImages: string[];
  viewer360Type: "images" | "embed" | "placeholder";
  viewer360Images: string[];
  viewer360EmbedUrl: string;
  priceLabel: string;
  batteryType: string;
  rangeLabel: string;
  topSpeed: string;
  motorPower: string;
  chargingTime: string;
  warranty: string;
  variants: ProductVariant[];
  colors: ProductColor[];
  specifications: Record<string, string>;
  highlights: ProductHighlight[];
  noLicenceRequired: boolean;
  noRtoRequired: boolean;
  lowSpeedVehicle: boolean;
  studentFriendly: boolean;
  eligibilityNote: string;
  disclaimerText: string;
  brochureUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
  importStatus?: string;
  sortOrder: number;
};

export type Vehicle = Product;

export type StoreSettings = {
  storeName: string;
  managedBy: string;
  address: string;
  phones: string[];
  whatsappUrl: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapsEmbed: string;
  googleMapsUrl: string;
  storeHours: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImageUrl: string;
  brandLine: string;
  footerCopy: string;
  seoTitle: string;
  seoDescription: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
  productId?: string | null;
  isPublished: boolean;
  sortOrder: number;
};

export type Policy = {
  id: string;
  title: string;
  slug: string;
  content: string;
  officialReferenceUrl?: string;
  isPublished: boolean;
};

export type GalleryItem = {
  id: string;
  imageUrl: string;
  caption: string;
  type: string;
  isFeatured: boolean;
  sortOrder: number;
};
