"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export default function ProductListClient({
  products,
  initialCategory,
  initialSearch,
}: {
  products: Product[];
  initialCategory?: string;
  initialSearch?: string;
}) {
  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.categoria))),
    [products]
  );
  const [selected, setSelected] = useState<string | null>(initialCategory ?? null);

  // A navegação entre categorias (ex: pelo menu do header) troca o valor de
  // `initialCategory` sem desmontar este componente. Ajusta o filtro durante
  // a renderização (em vez de um efeito) sempre que a categoria da URL mudar.
  const [syncedCategory, setSyncedCategory] = useState(initialCategory);
  if (initialCategory !== syncedCategory) {
    setSyncedCategory(initialCategory);
    setSelected(initialCategory ?? null);
  }

  const search = (initialSearch ?? "").trim().toLowerCase();

  const filtered = products
    .filter((p) => (selected ? p.categoria === selected : true))
    .filter((p) => (search ? p.nome.toLowerCase().includes(search) : true));

  return (
    <div>
      {search && (
        <p className="text-sm text-slate-600 mb-4">
          Resultados para <span className="font-semibold">&ldquo;{initialSearch}&rdquo;</span>
        </p>
      )}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelected(null)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === null
              ? "bg-brand-600 text-white border-brand-600"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand-600"
          }`}
        >
          Todas
        </button>
        {categories.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setSelected(categoria)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selected === categoria
                ? "bg-brand-600 text-white border-brand-600"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand-600"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>
      <ProductGrid products={filtered} />
    </div>
  );
}
