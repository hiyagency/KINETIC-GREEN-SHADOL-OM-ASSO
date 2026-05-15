import {
  GOOGLE_MAPS_URL,
  HINGLISH_DISCLAIMER,
  INSTAGRAM_PROFILE_URL,
  MAP_EMBED_URL,
  PUBLIC_HERO_TITLE,
  SEO_DESCRIPTION,
} from "@/lib/constants";
import importedProducts from "@/lib/data/official-products.json";
import type { FAQ, GalleryItem, Policy, Product, StoreSettings } from "@/lib/types";

export const storeSettings: StoreSettings = {
  storeName: "Kinetic Green Shahdol",
  managedBy: "Om Associates",
  address: "Om Associate, Kotma Tiraha, Badhganga Road, Shahdol (M.P)",
  phones: ["9243016493", "8349290500"],
  whatsappNumber: "919243016493",
  whatsappUrl:
    "https://www.whatsapp.com/catalog/919243016493/?app_absent=0&utm_source=ig",
  instagramUrl: INSTAGRAM_PROFILE_URL,
  facebookUrl: "",
  googleMapsEmbed: `<iframe src="${MAP_EMBED_URL}" width="100%" height="360" style="border:0;" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Kinetic Green Shahdol map"></iframe>`,
  googleMapsUrl: GOOGLE_MAPS_URL,
  storeHours: "10:00 AM - 8:00 PM",
  heroHeadline: PUBLIC_HERO_TITLE,
  heroSubheadline:
    "Non-registration electric two-wheelers available at our Shahdol showroom. Ideal for students and everyday local rides.",
  heroImageUrl: "",
  brandLine: "Planet @ Our Heart",
  footerCopy:
    "Kinetic Green Shahdol by Om Associates. Non-registration electric two-wheelers, local enquiry, test ride and showroom support.",
  seoTitle: "Kinetic Green Shahdol | Non-Registration Electric Two-Wheelers",
  seoDescription: SEO_DESCRIPTION,
};

export const products = importedProducts as Product[];
export const vehicles = products;

export const faqs: FAQ[] = [
  {
    id: "faq-licence",
    question: "Can students ride these electric two-wheelers?",
    answer:
      "Yes. KINETIC GREEN Shahdol offers non-registration electric two-wheelers that are ideal for students, tuition, college, and everyday local rides.",
    category: "Students",
    productId: null,
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: "faq-rto",
    question: "Do you have non-registration electric two-wheelers?",
    answer:
      "Yes. Non-registration electric two-wheelers are available at our Shahdol showroom. Visit or enquire and our team will help you choose the right model.",
    category: "Products",
    productId: null,
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: "faq-models",
    question: "Which model should I choose?",
    answer:
      "Tell us your daily travel need, rider age, route, and budget. Our showroom team will suggest a suitable non-registration electric two-wheeler.",
    category: "Products",
    productId: null,
    isPublished: true,
    sortOrder: 3,
  },
  {
    id: "faq-test-ride",
    question: "How can I book a test ride?",
    answer:
      "Call, WhatsApp, or send the enquiry form. The KINETIC GREEN Shahdol team will help with visit timing and availability.",
    category: "Enquiry",
    productId: null,
    isPublished: true,
    sortOrder: 4,
  },
  {
    id: "faq-price",
    question: "How can I get price and finance details?",
    answer:
      "Use WhatsApp, call the showroom, or send an enquiry. Finance and cash options are both available at the showroom.",
    category: "Enquiry",
    productId: null,
    isPublished: true,
    sortOrder: 5,
  },
  {
    id: "faq-warranty",
    question: "What battery warranty support is available?",
    answer:
      "Ride with confidence with battery warranty support for up to 3 years.",
    category: "Warranty",
    productId: null,
    isPublished: true,
    sortOrder: 6,
  },
  {
    id: "faq-location",
    question: "Where is the showroom?",
    answer: "Om Associate, Kotma Tiraha, Badhganga Road, Shahdol (M.P).",
    category: "Store",
    productId: null,
    isPublished: true,
    sortOrder: 7,
  },
];

export const policies: Policy[] = [
  {
    id: "policy-payment",
    title: "No Online Payment",
    slug: "no-online-payment",
    content:
      "This website does not collect online payments. Visit Kinetic Green Shahdol for booking, price, finance, delivery, warranty, refund and cancellation support.",
    officialReferenceUrl: "",
    isPublished: true,
  },
  {
    id: "policy-eligibility",
    title: "Non-Registration Two-Wheeler Support",
    slug: "non-registration-two-wheeler-support",
    content: HINGLISH_DISCLAIMER,
    officialReferenceUrl: "",
    isPublished: true,
  },
  {
    id: "policy-enquiry",
    title: "Enquiry Policy",
    slug: "enquiry-policy",
    content:
      "Submitted enquiry details are used by Kinetic Green Shahdol to contact you for price, test ride, finance, availability and product information.",
    officialReferenceUrl: "",
    isPublished: true,
  },
];

export const gallery: GalleryItem[] = [
  {
    id: "gallery-1",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-01.jpeg",
    caption: "Kinetic Green Shahdol showroom",
    type: "showroom",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: "gallery-2",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-02.jpeg",
    caption: "Kinetic Green Shahdol delivery and display photos",
    type: "showroom",
    isFeatured: true,
    sortOrder: 2,
  },
  {
    id: "gallery-3",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-03.jpeg",
    caption: "Kinetic Green electric two-wheeler at Shahdol showroom",
    type: "showroom",
    isFeatured: true,
    sortOrder: 3,
  },
  {
    id: "gallery-4",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-04.jpeg",
    caption: "Kinetic Green Shahdol vehicle display",
    type: "showroom",
    isFeatured: true,
    sortOrder: 4,
  },
  {
    id: "gallery-5",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-05.jpeg",
    caption: "Kinetic Green Shahdol electric scooter photo",
    type: "showroom",
    isFeatured: true,
    sortOrder: 5,
  },
  {
    id: "gallery-6",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-06.jpeg",
    caption: "Non-registration electric two-wheeler available in Shahdol",
    type: "showroom",
    isFeatured: true,
    sortOrder: 6,
  },
  {
    id: "gallery-7",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-07.jpeg",
    caption: "Kinetic Green showroom vehicle close-up in Shahdol",
    type: "showroom",
    isFeatured: true,
    sortOrder: 7,
  },
  {
    id: "gallery-8",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-08.jpeg",
    caption: "Kinetic Green Shahdol EV display photo",
    type: "showroom",
    isFeatured: true,
    sortOrder: 8,
  },
  {
    id: "gallery-9",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-09.jpeg",
    caption: "Student-friendly electric two-wheeler at Kinetic Green Shahdol",
    type: "showroom",
    isFeatured: true,
    sortOrder: 9,
  },
  {
    id: "gallery-10",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-10.jpeg",
    caption: "Kinetic Green Shahdol delivery and customer support",
    type: "showroom",
    isFeatured: true,
    sortOrder: 10,
  },
  {
    id: "gallery-11",
    imageUrl: "/showroom/kinetic-green-shahdol-showroom-11.jpeg",
    caption: "Kinetic Green Shahdol showroom visit photo",
    type: "showroom",
    isFeatured: true,
    sortOrder: 11,
  },
];
