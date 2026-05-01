import { NextResponse } from "next/server";
import { submitEnquiry } from "@/app/actions";

export async function POST(request: Request) {
  const body = await request.formData();
  const result = await submitEnquiry({ ok: false, message: "" }, body);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
