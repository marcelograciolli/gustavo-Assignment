import Link from "next/link";
import { CATEGORY_ICONS, getCategories } from "@/lib/products";
import Icon from "@/components/Icon";

export default function CategoryShortcuts() {
  const categories = getCategories();

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Compre por categoria</h2>
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {categories.map((categoria) => (
          <Link
            key={categoria}
            href={`/produtos?categoria=${encodeURIComponent(categoria)}`}
            className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 bg-white p-4 text-center hover:border-brand-500 hover:shadow-sm transition-all"
          >
            <Icon name={CATEGORY_ICONS[categoria]} className="!text-3xl text-brand-600" />
            <span className="text-sm font-medium text-slate-700">{categoria}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
