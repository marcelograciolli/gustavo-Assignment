import { getCategories, getDeals, getProductsByCategory } from "@/lib/products";
import CategoryShortcuts from "@/components/CategoryShortcuts";
import ProductCarousel from "@/components/ProductCarousel";
import HeroSlideshow from "@/components/HeroSlideshow";
import BannerGrid from "@/components/BannerGrid";
import Icon from "@/components/Icon";

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

      <BannerGrid />

      {categories.map((categoria) => (
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
