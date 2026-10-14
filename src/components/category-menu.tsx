"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cafeName, menuCategories, type MenuCategory } from "@/data/menu";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { CategoryOverlay } from "@/components/category-overlay";
import { SearchOverlay } from "@/components/search-overlay";

export function CategoryMenu() {
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
      <header className="relative z-10 shrink-0 bg-[#202a30] text-[#f8f4ed] animate-[headerReveal_.65s_cubic-bezier(.2,.8,.2,1)_both]">
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

      <main className="mx-auto min-h-0 w-full flex-1">
        <section className="grid h-full auto-rows-fr" aria-label="دسته‌بندی‌های منو">
          {menuCategories.map((category, index) => {
            const imageOnRight = index % 2 === 0;
            const delay = 120 + index * 110;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                aria-label={`نمایش منوی ${category.name}`}
                className="category-row relative min-h-0 overflow-hidden"
                style={{
                  backgroundColor: category.color,
                  color: category.id === "cocktails" ? "#fbf6ed" : "#202a30",
                  animationDelay: `${delay}ms`,
                }}>
                <span
                  className={`category-copy absolute inset-y-0 z-20 flex w-full flex-col justify-center px-5 ${
                    imageOnRight ? "pl-5 pr-[50%] text-right" : "pl-[50%] pr-5 text-left"
                  }`}
                  style={{ animationDelay: `${delay + 140}ms` }}>
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
                  className={`category-image absolute top-1/2 z-10 aspect-square h-[120%] -translate-y-1/2 rounded-full border-2 border-white/80 bg-[#e9e3d9] p-1.25 shadow-lg outline outline-black/20 ${
                    imageOnRight ? "right-[-2%]" : "left-[-2%]"
                  }`}
                  imageClassName="h-full w-full rounded-full object-cover"
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
