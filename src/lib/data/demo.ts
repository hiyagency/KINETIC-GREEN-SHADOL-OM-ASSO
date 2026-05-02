import { HINGLISH_DISCLAIMER } from "@/lib/constants";
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
  instagramUrl: "https://www.instagram.com/kinetic_green_shahdol/",
  facebookUrl: "",
  googleMapsEmbed: "",
  googleMapsUrl: "",
  storeHours: "10:00 AM - 8:00 PM",
  heroHeadline: "बिना लाइसेंस, बिना RTO — शाहडोल की स्मार्ट इलेक्ट्रिक राइड",
  heroSubheadline:
    "Eligible low-speed Kinetic Green EVs for students, daily riders and local commuters.",
  heroImageUrl: "",
  brandLine: "Planet @ Our Heart",
  footerCopy:
    "Kinetic Green Shahdol by Om Associates. Official products, local enquiry, test ride and showroom support.",
  seoTitle: "Kinetic Green Shahdol | No Licence EV Options",
  seoDescription:
    "Official Kinetic Green product-led showroom website for Shahdol enquiries, no-licence eligible low-speed EVs, test rides and WhatsApp contact.",
};

export const products = importedProducts as Product[];
export const vehicles = products;

export const faqs: FAQ[] = [
  {
    id: "faq-licence",
    question: "क्या बिना licence के EV चला सकते हैं?",
    answer:
      "Listed low-speed models shown here are No Licence / No RTO friendly. Our team will confirm the exact model before delivery.",
    category: "No Licence",
    productId: null,
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: "faq-rto",
    question: "क्या RTO registration जरूरी है?",
    answer:
      "Listed low-speed models on this site are shown as No RTO. Call us for current model and colour availability.",
    category: "No Licence",
    productId: null,
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: "faq-models",
    question: "कौनसे models no licence category में आते हैं?",
    answer:
      "No Licence EV page par student-friendly local rides dikhte hain. Showroom team aapko best option suggest karegi.",
    category: "Products",
    productId: null,
    isPublished: true,
    sortOrder: 3,
  },
  {
    id: "faq-students",
    question: "Students के लिए कौनसा model best है?",
    answer:
      "Students के लिए low-speed, easy handling और local commute वाली requirements के हिसाब से showroom team model suggest करेगी.",
    category: "Students",
    productId: null,
    isPublished: true,
    sortOrder: 4,
  },
  {
    id: "faq-test-ride",
    question: "Test ride कैसे book करें?",
    answer:
      "Call, WhatsApp या enquiry form से test ride request भेजें. Showroom team slot confirm करेगी.",
    category: "Enquiry",
    productId: null,
    isPublished: true,
    sortOrder: 5,
  },
  {
    id: "faq-price",
    question: "Price कैसे पता करें?",
    answer:
      "Product page पर Get Price या WhatsApp button दबाएं. Final price, offer और availability showroom से confirm होगी.",
    category: "Enquiry",
    productId: null,
    isPublished: true,
    sortOrder: 6,
  },
  {
    id: "faq-warranty",
    question: "Warranty क्या मिलेगी?",
    answer:
      "Warranty details model और current company policy पर depend करती हैं. Purchase से पहले showroom से written details confirm करें.",
    category: "Warranty",
    productId: null,
    isPublished: true,
    sortOrder: 7,
  },
  {
    id: "faq-battery",
    question: "Battery कितने समय चलेगी?",
    answer:
      "Range, battery life और charging usage model, riding pattern और maintenance पर depend करते हैं.",
    category: "Battery",
    productId: null,
    isPublished: true,
    sortOrder: 8,
  },
  {
    id: "faq-location",
    question: "Showroom कहाँ है?",
    answer: "Om Associate, Kotma Tiraha, Badhganga Road, Shahdol (M.P).",
    category: "Store",
    productId: null,
    isPublished: true,
    sortOrder: 9,
  },
];

export const policies: Policy[] = [
  {
    id: "policy-payment",
    title: "No Online Payment",
    slug: "no-online-payment",
    content:
      "This website does not collect online payments. All booking, price, finance, delivery, warranty, refund and cancellation details must be confirmed directly with Kinetic Green Shahdol.",
    officialReferenceUrl: "",
    isPublished: true,
  },
  {
    id: "policy-eligibility",
    title: "Licence / RTO Eligibility Disclaimer",
    slug: "licence-rto-disclaimer",
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
    imageUrl: "",
    caption: "Showroom photos",
    type: "showroom",
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: "gallery-2",
    imageUrl: "",
    caption: "Kinetic Green Shahdol delivery and display photos",
    type: "showroom",
    isFeatured: true,
    sortOrder: 2,
  },
];
