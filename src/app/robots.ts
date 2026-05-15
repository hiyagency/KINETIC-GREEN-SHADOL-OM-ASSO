import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const allowedAgents = [
    "*",
    "Googlebot",
    "Bingbot",
    "Slurp",
    "DuckDuckBot",
    "Baiduspider",
    "YandexBot",
    "Applebot",
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "Google-Extended",
    "GoogleOther",
    "GoogleOther-Image",
    "PerplexityBot",
    "ClaudeBot",
    "Claude-User",
    "anthropic-ai",
    "CCBot",
    "Amazonbot",
    "Bytespider",
    "Meta-ExternalAgent",
    "FacebookBot",
    "LinkedInBot",
  ];

  return {
    rules: allowedAgents.map((userAgent) => ({
      userAgent,
      allow: "/",
    })),
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
