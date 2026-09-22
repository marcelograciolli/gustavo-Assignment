"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Icon from "@/components/Icon";

export default function ProductCarousel({
  title,
  products,
  seeAllHref,
  autoScroll = false,
}: {
  title: string;
  products: Product[];
  seeAllHref?: string;
  autoScroll?: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateArrows = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };

    updateArrows();
    el.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [products]);

  useEffect(() => {
    if (!autoScroll) return;
    const el = scrollRef.current;
    if (!el) return;

    let paused = false;
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);

    const interval = setInterval(() => {
      if (paused) return;
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;

      const gap = 16;
      const step = card.getBoundingClientRect().width + gap;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - step / 2) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
    };
  }, [autoScroll]);

  function scrollByCards(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const gap = 16;
    const step = (card?.getBoundingClientRect().width ?? el.clientWidth) + gap;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-brand-600 font-medium text-sm hover:underline"
          >
            Ver tudo
          </Link>
        )}
      </div>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-44 sm:w-52 lg:w-60 shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            aria-label="Ver produtos anteriores"
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 items-center justify-center h-10 w-10 rounded-full bg-white text-brand-600 shadow-md border border-slate-200 hover:bg-brand-50"
          >
            <Icon name="chevron_left" className="!text-2xl" />
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            aria-label="Ver mais produtos"
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center h-10 w-10 rounded-full bg-white text-brand-600 shadow-md border border-slate-200 hover:bg-brand-50"
          >
            <Icon name="chevron_right" className="!text-2xl" />
          </button>
        )}
      </div>
    </section>
  );
}
