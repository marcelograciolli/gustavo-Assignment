"use client";

import { usePathname, useSearchParams } from "next/navigation";
import CategoryNav from "@/components/CategoryNav";

export default function CategoryNavActive({ categories }: { categories: string[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory =
    pathname === "/produtos" ? searchParams.get("categoria") : null;

  return <CategoryNav categories={categories} activeCategory={activeCategory} />;
}
