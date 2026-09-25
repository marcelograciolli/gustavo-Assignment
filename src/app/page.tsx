import { getCategories, getDeals, getProductsByCategory } from "@/lib/products";
import CategoryShortcuts from "@/components/CategoryShortcuts";
import ProductCarousel from "@/components/ProductCarousel";
import HeroSlideshow from "@/components/HeroSlideshow";
import BannerGrid from "@/components/BannerGrid";
import BannerPair from "@/components/BannerPair";
import Icon from "@/components/Icon";

const BANNER_PAIR_1 = [
  {
    id: "nutribem",
    src: "/banners/pair/banner-left.png",
    alt: "Semana do cliente Nutribem — leve 4 pague 3",
  },
  {
    id: "sorvete",
    src: "/banners/pair/banner-right.png",
    alt: "Semana do sorvete — 30% off nas coberturas",
  },
] as const;

const BANNER_PAIR_2 = [
  {
    id: "cervejas",
    src: "/banners/pair2/banner-left.png",
    alt: "Festival de bebidas — cervejas com até 20% off",
  },
  {
    id: "higiene",
    src: "/banners/pair2/banner-right.png",
    alt: "Higiene bucal — seleção de enxaguantes com até 40% off",
  },
] as const;

const BANNER_GRID_TOP = [
  {
    id: "A",
    src: "/banners/grid-new/banner-a.jpg",
    alt: "Seu dia a dia mais prático com até 35% off",
  },
  {
    id: "B",
    src: "/banners/grid-new/banner-b.jpg",
    alt: "Sabores para compartilhar com até 40% off",
  },
  {
    id: "C",
    src: "/banners/grid-new/banner-c.jpg",
    alt: "Refresque seus momentos com até 10% off",
  },
  {
    id: "D",
    src: "/banners/grid-new/banner-d.jpg",
    alt: "Brilho e cuidado na cozinha com até 30% off",
  },
] as const;

export default function Home() {
  const deals = getDeals();
  const categories = getCategories();

  return (
    <div className="flex flex-col">
      <HeroSlideshow />

      <CategoryShortcuts />

      <ProductCarousel
        title="Ofertas da semana"
        products={deals}
        seeAllHref="/produtos"
        autoScroll
      />

      <BannerGrid banners={BANNER_GRID_TOP} ariaLabel="Ofertas em destaque" />

      {categories.slice(0, 2).map((categoria) => (
        <ProductCarousel
          key={categoria}
          title={categoria}
          products={getProductsByCategory(categoria)}
          seeAllHref={`/produtos?categoria=${encodeURIComponent(categoria)}`}
        />
      ))}

      <BannerPair banners={BANNER_PAIR_1} ariaLabel="Campanhas Nutribem e sorvete" />

      {categories.slice(2, 4).map((categoria) => (
        <ProductCarousel
          key={categoria}
          title={categoria}
          products={getProductsByCategory(categoria)}
          seeAllHref={`/produtos?categoria=${encodeURIComponent(categoria)}`}
        />
      ))}

      <BannerPair banners={BANNER_PAIR_2} ariaLabel="Campanhas bebidas e higiene bucal" />

      {categories.slice(4, -2).map((categoria) => (
        <ProductCarousel
          key={categoria}
          title={categoria}
          products={getProductsByCategory(categoria)}
          seeAllHref={`/produtos?categoria=${encodeURIComponent(categoria)}`}
        />
      ))}

      <BannerGrid />

      {categories.slice(-2).map((categoria) => (
        <ProductCarousel
          key={categoria}
          title={categoria}
          products={getProductsByCategory(categoria)}
          seeAllHref={`/produtos?categoria=${encodeURIComponent(categoria)}`}
        />
      ))}

      <section className="w-full bg-brand-50 border-t border-brand-100">
        <div className="w-full px-4 sm:px-8 lg:px-12 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Icon name="local_shipping" className="!text-4xl text-brand-600" />
            <p className="font-semibold text-slate-900">Entrega rápida</p>
            <p className="text-sm text-slate-600">Receba seus produtos no mesmo dia.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="verified" className="!text-4xl text-brand-600" />
            <p className="font-semibold text-slate-900">Qualidade garantida</p>
            <p className="text-sm text-slate-600">Produtos frescos selecionados todos os dias.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Icon name="sell" className="!text-4xl text-brand-600" />
            <p className="font-semibold text-slate-900">Melhores preços</p>
            <p className="text-sm text-slate-600">Ofertas exclusivas toda semana.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
