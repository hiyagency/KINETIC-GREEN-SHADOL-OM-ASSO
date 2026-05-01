export function VehicleVisual({ name, imageUrl }: { name: string; imageUrl?: string }) {
  if (imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
    );
  }

  return (
    <div className="relative flex aspect-[4/3] min-h-56 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_25%,#dff7df_0,#f7fff6_40%,#eaf3ea_100%)]">
      <div className="absolute bottom-7 h-2 w-52 rounded-full bg-black/10 blur-sm" />
      <div className="relative h-28 w-64">
        <div className="absolute left-11 top-9 h-12 w-32 rounded-full bg-[#13a538] shadow-xl" />
        <div className="absolute left-28 top-3 h-16 w-20 rounded-t-full bg-white shadow-lg" />
        <div className="absolute left-44 top-4 h-3 w-36 -rotate-12 rounded-full bg-[#101513]" />
        <div className="absolute left-4 top-18 h-14 w-14 rounded-full border-[10px] border-[#101513] bg-white" />
        <div className="absolute right-5 top-18 h-14 w-14 rounded-full border-[10px] border-[#101513] bg-white" />
        <div className="absolute left-35 top-14 h-7 w-24 rounded-full bg-[#101513]" />
      </div>
      <span className="absolute left-4 top-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-black text-[#13a538] shadow-sm">
        {name}
      </span>
    </div>
  );
}
