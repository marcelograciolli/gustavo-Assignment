"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";

const SLIDES = [
  {
    id: 1,
    src: "/banners/full/banner-01.png",
    alt: "Ofertas novas todos os dias — Boa do Dia, só hoje, com preço bom por 24h",
  },
  {
    id: 2,
    src: "/banners/full/banner-02.png",
    alt: "48 horas de ofertas com até 50% off — qualidade e economia",
  },
  {
    id: 3,
    src: "/banners/full/banner-03.png",
    alt: "Produtos fresquinhos — uva, manga e ovos caipiras em oferta",
  },
  {
    id: 4,
    src: "/banners/full/banner-04.png",
    alt: "Festival de limpeza Ypê — 50% off na segunda unidade",
  },
] as const;

const INTERVAL_MS = 5000;

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const slide = SLIDES[index];

  return (
    <section
      className="relative w-full overflow-hidden bg-slate-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrossel"
      aria-label="Banners em destaque"
    >
      <Link
        href="/produtos"
        className="relative block w-full aspect-[2508/627]"
        aria-label={slide.alt}
      >
        {SLIDES.map((s, i) => (
          <Image
            key={s.id}
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </Link>

      <button
        type="button"
        onClick={prev}
        aria-label="Banner anterior"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-[1] flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm hover:bg-white transition-colors"
      >
        <Icon name="chevron_left" className="!text-2xl" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Próximo banner"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-[1] flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm hover:bg-white transition-colors"
      >
        <Icon name="chevron_right" className="!text-2xl" />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-[1] flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para banner ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index
                ? "bg-white ring-2 ring-brand-700/50"
                : "bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
