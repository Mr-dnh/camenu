"use client";

import { Search } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { cafeName, menuCategories, type MenuCategory } from "@/data/menu";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { CategoryOverlay } from "@/components/category-overlay";
import { SearchOverlay } from "@/components/search-overlay";

export function CategoryMenu() {
  const menuRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const allDishes = useMemo(
    () =>
      menuCategories.flatMap((category) =>
        category.dishes.map((dish) => ({ ...dish, categoryName: category.name }))
      ),
    []
  );

  useLayoutEffect(() => {
    const root = menuRef.current;
    if (!root) return;

    const rows = root.querySelectorAll<HTMLElement>(".category-row");
    const context = gsap.context(() => {
      rows.forEach((row, index) => {
        const image = row.querySelector<HTMLElement>(".category-photo-motion");
        const copy = row.querySelector<HTMLElement>(".category-copy");
        const delay = index * 0.11;

        gsap.fromTo(row,
          { autoAlpha: 0, x: index % 2 === 0 ? 36 : -36 },
          { autoAlpha: 1, x: 0, duration: 0.55, delay, ease: "power3.out", clearProps: "transform,opacity,visibility" }
        );
        if (image) {
          gsap.fromTo(image,
            { autoAlpha: 0, scale: 0.86, rotation: index % 2 === 0 ? 5 : -5 },
            { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.75, delay: delay + 0.08, ease: "power3.out", clearProps: "transform,opacity,visibility" }
          );
        }
        if (copy) {
          gsap.fromTo(copy,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.48, delay: delay + 0.12, ease: "power2.out", clearProps: "transform,opacity,visibility" }
          );
        }
      });
    }, root);

    return () => context.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeCategory || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCategory, searchOpen]);

  const selectDish = (dishId: string) => {
    const category = menuCategories.find((item) =>
      item.dishes.some((dish) => dish.id === dishId)
    );
    if (category) setActiveCategory(category);
    setSearchOpen(false);
    setSearch("");
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <header className="relative z-10 shrink-0 bg-[#202a30] text-[#f8f4ed]">
        <div className="grid grid-cols-2 justify-between px-5 py-2">
          <button className="text-right font-serif text-2xl font-bold">
            {cafeName}
          </button>
          <button
            className="justify-self-end p-2"
            aria-label="جست‌وجو"
            onClick={() => setSearchOpen(true)}>
            <Search size={25} />
          </button>
        </div>
      </header>

      <main ref={menuRef} className="mx-auto min-h-0 w-full flex-1">
        <section className="grid h-full auto-rows-fr" aria-label="دسته‌بندی‌های منو">
          {menuCategories.map((category, index) => {
            const imageOnRight = index % 2 === 0;
            const delay = 120 + index * 110;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                aria-label={`نمایش منوی ${category.name}`}
                className="category-row group relative min-h-0 overflow-hidden border-b border-black/10 text-right transition-[filter] duration-300 hover:brightness-[1.035] focus-visible:z-30 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                style={{
                  backgroundColor: category.color,
                  color: category.id === "cocktails" ? "#fbf6ed" : "#202a30",
                }}>
                <span
                  className={`category-copy absolute inset-y-0 z-20 flex w-full flex-col justify-center px-5 ${
                    imageOnRight ? "pl-5 pr-[50%] text-right" : "pl-[50%] pr-5 text-left"
                  }`}
>
                  <span
                    data-text={category.name}
                    className="category-title relative max-w-full text-2xl font-bold leading-tight tracking-wide sm:text-3xl">
                    {category.name}
                  </span>
                  <span className="category-subtitle mt-2 max-w-full text-xs leading-5 opacity-90 sm:mt-3 sm:text-sm">
                    {category.subtitle}
                  </span>
                </span>
                <ImagePlaceholder
                  src={category.image}
                  alt={`تصویر دسته ${category.name}`}
                  className={`category-image absolute top-1/2 z-10 aspect-square h-[116%] -translate-y-1/2 rounded-full border-[3px] border-white/90 bg-[#e9e3d9] p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.18)] outline outline-1 outline-black/20 transition-transform duration-500 group-hover:scale-[1.035] ${
                    imageOnRight ? "right-[-2%]" : "left-[-2%]"
                  }`}
                  imageClassName="category-photo-motion h-full w-full rounded-full object-cover"
                />
              </button>
            );
          })}
        </section>
      </main>

      {activeCategory && (
        <CategoryOverlay
          category={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      )}
      {searchOpen && (
        <SearchOverlay
          dishes={allDishes}
          onClose={() => setSearchOpen(false)}
          onSelectDish={selectDish}
          search={search}
          onSearchChange={setSearch}
        />
      )}
    </div>
  );
}
