import { NextRequest } from "next/server";
import https from "node:https";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url || !url.startsWith("https://www.kineticgreen.com/")) {
    return new Response("Invalid asset URL", { status: 400 });
  }

  const upstreamUrl = encodeURI(url);
  const upstream = await new Promise<Response>((resolve) => {
    https
      .get(
        upstreamUrl,
        {
          rejectUnauthorized: false,
          headers: { "User-Agent": "Kinetic-Green-Shahdol-Importer/1.0" },
        },
        (res) => {
          const chunks: Buffer[] = [];
          res.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
          res.on("end", () => {
            resolve(
              new Response(Buffer.concat(chunks), {
                status: res.statusCode || 200,
                headers: {
                  "content-type": String(res.headers["content-type"] || "application/octet-stream"),
                  "cache-control": "public, max-age=86400",
                },
              }),
            );
          });
        },
      )
      .on("error", () => resolve(new Response("Asset unavailable", { status: 502 })));
  });

  return upstream;
}
