const BANNERS = [
  {
    id: "A",
    label: "Banner A — placeholder",
    bg: "bg-gradient-to-br from-brand-700 to-brand-500",
    text: "text-white",
  },
  {
    id: "B",
    label: "Banner B — placeholder",
    bg: "bg-gradient-to-br from-accent-600 to-accent-500",
    text: "text-white",
  },
  {
    id: "C",
    label: "Banner C — placeholder",
    bg: "bg-gradient-to-br from-felix-amarelo to-accent-400",
    text: "text-slate-900",
  },
  {
    id: "D",
    label: "Banner D — placeholder",
    bg: "bg-gradient-to-br from-brand-500 to-felix-verde",
    text: "text-white",
  },
] as const;

export default function BannerGrid() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-6" aria-label="Banners promocionais">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className={`aspect-video rounded-lg ${banner.bg} flex items-center justify-center px-4`}
          >
            <p className={`text-center text-sm sm:text-base font-semibold ${banner.text}`}>
              {banner.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
