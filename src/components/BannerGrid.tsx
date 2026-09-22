import Image from "next/image";

const BANNERS = [
  {
    id: "A",
    src: "/banners/banner-a.png",
    alt: "Refrigerantes imperdíveis a partir de R$ 2,78",
  },
  {
    id: "B",
    src: "/banners/banner-b.png",
    alt: "Mais sabor na sua mesa com até 35% off",
  },
  {
    id: "C",
    src: "/banners/banner-c.png",
    alt: "Sua limpeza rende mais com até 30% off",
  },
  {
    id: "D",
    src: "/banners/banner-d.png",
    alt: "Cuidado especial para seu pet com até 25% off",
  },
] as const;

export default function BannerGrid() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-6" aria-label="Banners promocionais">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="relative aspect-[1003/1568] overflow-hidden rounded-lg bg-slate-100"
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
