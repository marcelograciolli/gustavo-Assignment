import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllProducts,
  getProductBySlug,
  getOtherOffers,
  formatPrice,
} from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.nome} | Félix mais+` : "Produto não encontrado" };
}

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const emOferta = product.precoOriginal !== undefined;
  const desconto = emOferta
    ? Math.round((1 - product.preco / product.precoOriginal!) * 100)
    : 0;
  const outrasOfertas = getOtherOffers(slug, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/produtos" className="text-sm text-brand-600 hover:underline">
        ← Voltar para produtos
      </Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
          {emOferta && (
            <span className="absolute top-3 left-3 z-[1] rounded bg-accent-500 px-2.5 py-1 text-sm font-bold text-white">
              -{desconto}%
            </span>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imagem}
            alt={product.nome}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs uppercase tracking-wide text-brand-600 font-medium">
            {product.categoria}
          </span>
          <h1 className="text-3xl font-bold">{product.nome}</h1>
          <p className="text-slate-600">{product.descricao}</p>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900">
              {formatPrice(product.preco)}
            </span>
            {emOferta && (
              <span className="text-lg text-slate-400 line-through">
                {formatPrice(product.precoOriginal!)}
              </span>
            )}
            <span className="text-slate-500">/ {product.unidade}</span>
          </div>

          <button
            type="button"
            className="mt-4 w-full sm:w-fit rounded-md bg-brand-600 px-6 py-3 font-semibold text-white hover:bg-brand-700 transition-colors"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>

      {outrasOfertas.length > 0 && (
        <section className="mt-14" aria-label="Outras ofertas">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Outras ofertas</h2>
            <Link
              href="/produtos"
              className="text-brand-600 font-medium text-sm hover:underline"
            >
              Ver tudo
            </Link>
          </div>
          <ProductGrid products={outrasOfertas} />
        </section>
      )}
    </div>
  );
}
