import { getPolicies } from "@/lib/data/queries";

export default async function PoliciesPage() {
  const policies = await getPolicies();
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <p className="text-sm font-black uppercase tracking-[0.16em] text-[#13a538]">Policies</p>
      <h1 className="mt-3 text-5xl font-black text-[#101513]">No online payment is collected on this website.</h1>
      <p className="mt-4 rounded-lg bg-white p-4 text-base font-semibold leading-7 text-[#5c675f]">
        This website does not collect online payments. All pricing, booking amount, finance, delivery, refund, and cancellation details must be confirmed directly with Kinetic Green Shahdol.
      </p>
      <div className="mt-8 grid gap-4">
        {policies.map((policy) => (
          <article key={policy.id} className="rounded-lg border border-[#dfe8df] bg-white p-5">
            <h2 className="text-2xl font-black text-[#101513]">{policy.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#5c675f]">{policy.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
