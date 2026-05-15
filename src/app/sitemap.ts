import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getProducts } from "@/lib/data/queries";
import { officialAssetSrc } from "@/lib/utils";

function absoluteUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const products = await getProducts();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${SITE_URL}/showroom/kinetic-green-shahdol-showroom-01.jpeg`,
        `${SITE_URL}/showroom/kinetic-green-shahdol-showroom-02.jpeg`,
        `${SITE_URL}/showroom/kinetic-green-shahdol-showroom-03.jpeg`,
        `${SITE_URL}/showroom/kinetic-green-shahdol-showroom-04.jpeg`,
      ],
    },
    {
      url: `${SITE_URL}/vehicles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/no-licence-ev`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/book-enquiry`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/policies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.55,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/vehicles/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
    images: [
      product.heroImageUrl,
      ...product.galleryImages,
      ...product.viewer360Images.slice(0, 3),
    ].map((url) => absoluteUrl(officialAssetSrc(url))).filter(Boolean),
  }));

  return [...staticRoutes, ...productRoutes];
}
