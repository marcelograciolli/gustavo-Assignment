import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/products";
import CategoryNav from "@/components/CategoryNav";
import CategoryNavActive from "@/components/CategoryNavActive";
import Icon from "@/components/Icon";

export default function Header() {
  const categories = getCategories();

  return (
    <header className="sticky top-0 z-10 shadow-sm">
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-2 flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="Félix mais+ Supermercado"
              width={826}
              height={646}
              priority
              className="h-20 sm:h-24 w-auto"
            />
          </Link>

          <form
            action="/produtos"
            className="flex-1 hidden sm:flex items-center"
          >
            <input
              type="search"
              name="busca"
              placeholder="Busque por produtos ou marcas na Félix mais+"
              className="w-full min-w-0 rounded-l-full border border-brand-600 border-r-0 px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-500 focus:z-10"
            />
            <button
              type="submit"
              className="flex items-center justify-center rounded-r-full bg-brand-600 px-6 py-3 text-white hover:bg-brand-700 transition-colors"
              aria-label="Buscar"
            >
              <Icon name="search" className="!text-2xl" />
            </button>
          </form>

          <button
            type="button"
            className="hidden md:flex items-center gap-2 shrink-0 text-left hover:text-brand-600"
          >
            <Icon name="person" className="!text-4xl text-brand-600" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-slate-900">Acesse sua conta</span>
              <span className="text-xs text-slate-500">ou Cadastre-se</span>
            </span>
          </button>

          <button
            type="button"
            className="relative flex items-center shrink-0 hover:text-brand-600"
            aria-label="Carrinho de compras"
          >
            <Icon name="shopping_cart" className="!text-4xl text-brand-600" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-500 text-[11px] font-bold text-white">
              0
            </span>
          </button>
        </div>
      </div>

      <Suspense fallback={<CategoryNav categories={categories} />}>
        <CategoryNavActive categories={categories} />
      </Suspense>
    </header>
  );
}
