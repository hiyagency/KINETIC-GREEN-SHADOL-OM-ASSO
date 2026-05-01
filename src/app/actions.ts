"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const enquirySchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(10),
  whatsapp: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  selectedVehicleId: z.string().optional(),
  selectedVehicleName: z.string().optional(),
  enquiryType: z.string().min(1),
  preferredVisitDate: z.string().optional(),
  city: z.string().min(2),
  message: z.string().optional(),
  consent: z.literal("on").or(z.literal(true)),
});

export type EnquiryState = {
  ok: boolean;
  message: string;
};

export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const parsed = enquirySchema.safeParse({
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp"),
    email: formData.get("email"),
    selectedVehicleId: formData.get("selectedVehicleId"),
    selectedVehicleName: formData.get("selectedVehicleName"),
    enquiryType: formData.get("enquiryType"),
    preferredVisitDate: formData.get("preferredVisitDate"),
    city: formData.get("city"),
    message: formData.get("message"),
    consent: formData.get("consent"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the required fields and try again.",
    };
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return {
      ok: true,
      message:
        "Thank you for your enquiry. Kinetic Green Shahdol will contact you within 24 hours. Supabase is not connected yet, so this demo submission was not stored.",
    };
  }

  const payload = parsed.data;
  const { error } = await supabase.from("enquiries").insert({
    customer_name: payload.customerName,
    phone: payload.phone,
    whatsapp: payload.whatsapp || null,
    email: payload.email || null,
    selected_vehicle_id: payload.selectedVehicleId || null,
    selected_vehicle_name: payload.selectedVehicleName || null,
    enquiry_type: payload.enquiryType,
    preferred_visit_date: payload.preferredVisitDate || null,
    city: payload.city,
    message: payload.message || null,
    consent: true,
  });

  if (error) {
    return {
      ok: false,
      message: "The enquiry could not be saved. Please call or WhatsApp the showroom.",
    };
  }

  return {
    ok: true,
    message:
      "Thank you for your enquiry. Kinetic Green Shahdol will contact you within 24 hours.",
  };
}
