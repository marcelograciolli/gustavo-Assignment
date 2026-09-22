"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";

const SLIDES = [
  {
    id: 1,
    label: "Banner 1 — placeholder",
    bg: "bg-gradient-to-r from-brand-700 to-brand-500",
    text: "text-white",
    ctaClass: "bg-white text-brand-700 hover:bg-brand-50",
  },
  {
    id: 2,
    label: "Banner 2 — placeholder",
    bg: "bg-gradient-to-r from-accent-600 to-accent-500",
    text: "text-white",
    ctaClass: "bg-white text-accent-600 hover:bg-accent-100",
  },
  {
    id: 3,
    label: "Banner 3 — placeholder",
    bg: "bg-gradient-to-r from-felix-amarelo to-accent-400",
    text: "text-slate-900",
    ctaClass: "bg-brand-700 text-white hover:bg-brand-600",
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
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carrossel"
      aria-label="Banners em destaque"
    >
      <div
        className={`w-full ${slide.bg} ${slide.text} transition-colors duration-500`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 py-16 sm:py-20 flex flex-col gap-4 min-h-[220px] sm:min-h-[280px] justify-center">
          <p className="text-2xl sm:text-3xl font-bold max-w-xl">{slide.label}</p>
          <Link
            href="/produtos"
            className={`mt-2 inline-flex w-fit items-center rounded-md px-5 py-2.5 font-semibold transition-colors ${slide.ctaClass}`}
          >
            Ver produtos
          </Link>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Banner anterior"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm hover:bg-white transition-colors"
      >
        <Icon name="chevron_left" className="!text-2xl" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Próximo banner"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-sm hover:bg-white transition-colors"
      >
        <Icon name="chevron_right" className="!text-2xl" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para banner ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? "bg-white ring-2 ring-brand-700/40" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
