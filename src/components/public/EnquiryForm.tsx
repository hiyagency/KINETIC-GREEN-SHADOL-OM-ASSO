"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { enquiryTypes } from "@/lib/constants";
import type { Vehicle } from "@/lib/types";
import { Button } from "@/components/ui/Button";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqvreoq";

const formSchema = z.object({
  customerName: z.string().min(2, "Enter customer name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  whatsapp: z.string().optional(),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  selectedVehicleName: z.string().optional(),
  enquiryType: z.string().min(1),
  preferredVisitDate: z.string().optional(),
  city: z.string().min(2, "Enter city"),
  message: z.string().optional(),
  consent: z.boolean().refine(Boolean, "Consent is required"),
});

type FormValues = z.infer<typeof formSchema>;
type SubmitState = {
  ok: boolean;
  message: string;
};

export function EnquiryForm({
  vehicles,
  selectedVehicle,
}: {
  vehicles: Vehicle[];
  selectedVehicle?: string;
}) {
  const [state, setState] = useState<SubmitState>({ ok: false, message: "" });
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedVehicleName: selectedVehicle || "",
      enquiryType: "Non-Registration Two-Wheeler",
      city: "Shahdol",
      consent: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setPending(true);
    setState({ ok: false, message: "" });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `Kinetic Green Shahdol enquiry - ${values.selectedVehicleName || "General"}`,
          customer_name: values.customerName,
          phone: values.phone,
          whatsapp: values.whatsapp || values.phone,
          email: values.email || "",
          selected_vehicle: values.selectedVehicleName || "Not selected",
          enquiry_type: values.enquiryType,
          preferred_visit_date: values.preferredVisitDate || "",
          city: values.city,
          message: values.message || "",
          consent: values.consent ? "Yes" : "No",
          source: "Kinetic Green Shahdol website",
        }),
      });

      if (!response.ok) {
        throw new Error("Formspree submission failed");
      }

      setState({
        ok: true,
        message: "Thank you for your enquiry. Kinetic Green Shahdol will contact you soon.",
      });
      reset({
        selectedVehicleName: selectedVehicle || "",
        enquiryType: "Non-Registration Two-Wheeler",
        city: "Shahdol",
        consent: false,
      });
    } catch {
      setState({
        ok: false,
        message: "The enquiry could not be sent. Please call or WhatsApp the showroom.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      action={FORMSPREE_ENDPOINT}
      method="POST"
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 rounded-lg bg-white p-4 shadow-[0_18px_60px_rgba(16,21,19,0.08)]"
    >
      <input type="hidden" name="_subject" value="Kinetic Green Shahdol enquiry" />
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-bold text-[#202722]">
          Customer name
          <input {...register("customerName")} required className="rounded-lg border border-[#dfe8df] px-3 py-3 font-medium outline-none focus:border-[#13a538]" />
          {errors.customerName ? <span className="text-xs text-red-700">{errors.customerName.message}</span> : null}
        </label>
        <label className="grid gap-1 text-sm font-bold text-[#202722]">
          Phone number
          <input {...register("phone")} required className="rounded-lg border border-[#dfe8df] px-3 py-3 font-medium outline-none focus:border-[#13a538]" />
          {errors.phone ? <span className="text-xs text-red-700">{errors.phone.message}</span> : null}
        </label>
        <label className="grid gap-1 text-sm font-bold text-[#202722]">
          WhatsApp number
          <input {...register("whatsapp")} className="rounded-lg border border-[#dfe8df] px-3 py-3 font-medium outline-none focus:border-[#13a538]" />
        </label>
        <label className="grid gap-1 text-sm font-bold text-[#202722]">
          Email optional
          <input {...register("email")} type="email" className="rounded-lg border border-[#dfe8df] px-3 py-3 font-medium outline-none focus:border-[#13a538]" />
          {errors.email ? <span className="text-xs text-red-700">{errors.email.message}</span> : null}
        </label>
        <label className="grid gap-1 text-sm font-bold text-[#202722]">
          Selected vehicle
          <select {...register("selectedVehicleName")} className="rounded-lg border border-[#dfe8df] px-3 py-3 font-medium outline-none focus:border-[#13a538]">
            <option value="">Select vehicle</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.name}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-bold text-[#202722]">
          Interested in
          <select {...register("enquiryType")} required className="rounded-lg border border-[#dfe8df] px-3 py-3 font-medium outline-none focus:border-[#13a538]">
            {enquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm font-bold text-[#202722]">
          Preferred visit date optional
          <input {...register("preferredVisitDate")} type="date" className="rounded-lg border border-[#dfe8df] px-3 py-3 font-medium outline-none focus:border-[#13a538]" />
        </label>
        <label className="grid gap-1 text-sm font-bold text-[#202722]">
          Location/city
          <input {...register("city")} required className="rounded-lg border border-[#dfe8df] px-3 py-3 font-medium outline-none focus:border-[#13a538]" />
          {errors.city ? <span className="text-xs text-red-700">{errors.city.message}</span> : null}
        </label>
      </div>
      <label className="grid gap-1 text-sm font-bold text-[#202722]">
        Message
        <textarea {...register("message")} rows={4} className="rounded-lg border border-[#dfe8df] px-3 py-3 font-medium outline-none focus:border-[#13a538]" />
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-[#3f4a42]">
        <input {...register("consent")} required type="checkbox" className="mt-1" />
        I agree that Kinetic Green Shahdol may contact me by phone, WhatsApp, or email about my enquiry.
      </label>
      {errors.consent ? <span className="text-xs font-semibold text-red-700">{errors.consent.message}</span> : null}
      <Button disabled={pending} className="w-full">
        <Send size={16} />
        {pending ? "Sending..." : "Submit Enquiry"}
      </Button>
      {state.message ? (
        <p className={`rounded-lg p-3 text-sm font-semibold ${state.ok ? "bg-[#eaffed] text-[#0d7d29]" : "bg-red-50 text-red-700"}`}>
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
