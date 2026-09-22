import productsData from "../../data/products.json";

export type Product = {
  id: string;
  slug: string;
  nome: string;
  preco: number;
  precoOriginal?: number;
  unidade: string;
  categoria: string;
  imagem: string;
  descricao: string;
};

const products = productsData as Product[];

// Nomes de ícones da lib Material Symbols (Google), renderizados via <Icon name={...} />
export const CATEGORY_ICONS: Record<string, string> = {
  Hortifruti: "nutrition",
  Padaria: "bakery_dining",
  Açougue: "kebab_dining",
  Peixaria: "set_meal",
  Mercearia: "shopping_basket",
  Bebidas: "local_drink",
  Limpeza: "cleaning_services",
  "Pet Care": "pets",
};

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(products.map((product) => product.categoria)));
}

export function getProductsByCategory(categoria: string): Product[] {
  return products.filter((product) => product.categoria === categoria);
}

export function getDeals(): Product[] {
  return products.filter((product) => product.precoOriginal !== undefined);
}

export function formatPrice(preco: number): string {
  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
