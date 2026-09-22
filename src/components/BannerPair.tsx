import Image from "next/image";
import Link from "next/link";

export type BannerPairItem = {
  id: string;
  src: string;
  alt: string;
};

type BannerPairProps = {
  banners: readonly BannerPairItem[];
  ariaLabel?: string;
};

export default function BannerPair({
  banners,
  ariaLabel = "Campanhas em destaque",
}: BannerPairProps) {
  return (
    <section
      className="w-full px-4 sm:px-8 lg:px-12 py-6"
      aria-label={ariaLabel}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href="/produtos"
            className="relative block aspect-[1976/796] overflow-hidden rounded-lg bg-slate-100"
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
