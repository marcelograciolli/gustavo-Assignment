import Link from "next/link";
import { CATEGORY_ICONS, getCategories } from "@/lib/products";
import Icon from "@/components/Icon";

export default function Footer() {
  const categories = getCategories();

  return (
    <footer className="bg-brand-700 text-brand-50 mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        <div className="col-span-2 sm:col-span-2 lg:col-span-1 flex flex-col gap-3">
          <p className="font-semibold text-white text-base">
            <span className="text-white">Félix</span>{" "}
            <span className="text-accent-400">mais+</span> Supermercado
          </p>
          <p className="text-brand-100/80">
            Produtos frescos, preços justos e a qualidade que sua família merece.
          </p>
          <div className="flex items-start gap-2 text-brand-100/80">
            <Icon name="location_on" className="!text-lg mt-0.5" />
            <span>Rua das Laranjeiras, 450 — Jardim Félix — Campinas/SP</span>
          </div>
          <div className="flex items-start gap-2 text-brand-100/80">
            <Icon name="schedule" className="!text-lg mt-0.5" />
            <span>Aberto todos os dias, das 7h às 22h</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-semibold text-white">Institucional</p>
          <ul className="flex flex-col gap-2 text-brand-100/80">
            <li>Sobre a Félix mais+</li>
            <li>Trabalhe conosco</li>
            <li>Política de privacidade</li>
            <li>Termos de uso</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-semibold text-white">Atendimento</p>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="tel:+551934567890"
                className="flex items-center gap-2 text-brand-100/80 hover:text-white"
              >
                <Icon name="call" className="!text-lg" />
                (19) 3456-7890
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@felixmais.escola.br"
                className="flex items-center gap-2 text-brand-100/80 hover:text-white break-all"
              >
                <Icon name="mail" className="!text-lg shrink-0" />
                contato@felixmais.escola.br
              </a>
            </li>
            <li className="flex items-center gap-2 text-brand-100/80">
              <Icon name="help" className="!text-lg" />
              Central de Ajuda
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-semibold text-white">Categorias</p>
          <ul className="flex flex-col gap-2">
            {categories.map((categoria) => (
              <li key={categoria}>
                <Link
                  href={`/produtos?categoria=${encodeURIComponent(categoria)}`}
                  className="flex items-center gap-2 text-brand-100/80 hover:text-white"
                >
                  <Icon name={CATEGORY_ICONS[categoria]} className="!text-lg" />
                  {categoria}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-600">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-brand-100/70">
          © {new Date().getFullYear()} Félix Mais+. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
