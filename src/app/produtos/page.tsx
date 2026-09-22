import { getAllProducts } from "@/lib/products";
import ProductListClient from "./ProductListClient";

export const metadata = {
  title: "Produtos | Félix mais+",
};

export default async function ProdutosPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; busca?: string }>;
}) {
  const { categoria, busca } = await searchParams;
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Todos os produtos</h1>
      <ProductListClient
        products={products}
        initialCategory={categoria}
        initialSearch={busca}
      />
    </div>
  );
}
