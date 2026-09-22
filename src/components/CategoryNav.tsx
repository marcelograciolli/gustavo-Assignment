"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORY_ICONS } from "@/lib/products";
import Icon from "@/components/Icon";

export default function CategoryNav({
  categories,
  activeCategory = null,
}: {
  categories: string[];
  activeCategory?: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative bg-brand-600 text-white">
      <nav className="mx-auto max-w-6xl px-4 py-3.5 flex items-center gap-6 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 shrink-0 hover:text-accent-100"
          aria-expanded={open}
        >
          <Icon name={open ? "close" : "menu"} />
          Menu
        </button>

        <div className="flex flex-1 items-center justify-between overflow-x-auto">
          {categories.map((categoria) => {
            const isActive = categoria === activeCategory;
            return (
              <Link
                key={categoria}
                href={`/produtos?categoria=${encodeURIComponent(categoria)}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap border-b-2 pb-0.5 transition-colors hover:text-accent-100 ${
                  isActive
                    ? "border-accent-400 text-accent-100"
                    : "border-transparent"
                }`}
              >
                <Icon name={CATEGORY_ICONS[categoria]} />
                {categoria}
              </Link>
            );
          })}
        </div>
      </nav>

      {open && (
        <div className="absolute left-0 right-0 top-full z-20 bg-white text-slate-900 shadow-lg border-t border-brand-100">
          <div className="mx-auto max-w-6xl px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {categories.map((categoria) => {
              const isActive = categoria === activeCategory;
              return (
                <Link
                  key={categoria}
                  href={`/produtos?categoria=${encodeURIComponent(categoria)}`}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-md px-3 py-2 hover:bg-brand-50 ${
                    isActive ? "bg-brand-50 font-semibold text-brand-600" : ""
                  }`}
                >
                  <Icon name={CATEGORY_ICONS[categoria]} />
                  {categoria}
                </Link>
              );
            })}
            <Link
              href="/produtos"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 font-semibold text-brand-600 hover:bg-brand-50"
            >
              Ver todos os produtos
              <Icon name="arrow_forward" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
