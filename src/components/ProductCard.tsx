import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const emOferta = product.precoOriginal !== undefined;
  const desconto = emOferta
    ? Math.round((1 - product.preco / product.precoOriginal!) * 100)
    : 0;

  return (
    <Link
      href={`/produtos/${product.slug}`}
      className="group relative flex flex-col rounded-lg border border-slate-200 overflow-hidden bg-white hover:shadow-md transition-shadow"
    >
      {emOferta && (
        <span className="absolute top-2 left-2 z-[1] rounded bg-accent-500 px-2 py-0.5 text-xs font-bold text-white">
          -{desconto}%
        </span>
      )}
      <div className="aspect-square overflow-hidden bg-slate-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imagem}
          alt={product.nome}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-brand-600 font-medium">
          {product.categoria}
        </span>
        <h3 className="font-semibold text-slate-900">{product.nome}</h3>
        <p className="text-sm text-slate-500">por {product.unidade}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-lg font-bold text-slate-900">
            {formatPrice(product.preco)}
          </p>
          {emOferta && (
            <p className="text-sm text-slate-400 line-through">
              {formatPrice(product.precoOriginal!)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
