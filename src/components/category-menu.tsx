"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cafeName, menuCategories, type MenuCategory } from "@/data/menu";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { CategoryOverlay } from "@/components/category-overlay";
import { SearchOverlay } from "@/components/search-overlay";

export function CategoryMenu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(
    null
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const allDishes = useMemo(
    () =>
      menuCategories.flatMap((category) =>
        category.dishes.map((dish) => ({
          ...dish,
          categoryName: category.name,
        }))
      ),
    []
  );

  useEffect(() => {
    document.body.style.overflow = activeCategory || searchOpen ? "hidden" : "";
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
    <>
      <header className="relative z-10 bg-[#202a30] text-[#f8f4ed]">
        <div className="grid grid-cols-2 justify-between px-5 py-2">
          <button
            className="text-right font-serif text-2xl font-bold tracking-[.24em]"
            onClick={() => {
              setActiveCategory(null);
              setSearchOpen(false);
            }}>
            {cafeName}
          </button>
          <button
            className="justify-self-end p-2"
            aria-label="جست‌وجو در منو"
            onClick={() => setSearchOpen(true)}>
            <Search size={25} />
          </button>
        </div>
      </header>

      <main className="mx-auto h-[calc(100dvh-55px)] overflow-hidden">
        <section
          className="grid h-full auto-rows-fr"
          aria-label="دسته‌بندی‌های منو">
          {menuCategories.map((category, index) => {
            const imageOnRight = index % 2 === 0;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                aria-label={`نمایش منوی ${category.name}`}
                className="relative isolate"
                style={{
                  backgroundColor: category.color,
                  color: category.id === "cocktails" ? "#fbf6ed" : "#202a30",
                }}>
                <span
                  className={`absolute inset-y-0 z-2 flex w-[58%] flex-col justify-center ${
                    imageOnRight
                      ? "left-[7%] items-start text-right"
                      : "right-[7%] items-start text-right"
                  }`}>
                  <span className="max-w-full text-xl font-bold leading-tight tracking-wide sm:text-3xl">
                    {category.name}
                  </span>
                  <span className="mt-2 max-w-full text-[8px] leading-5 opacity-80 sm:mt-3 sm:text-[10px]">
                    {category.subtitle}
                  </span>
                </span>
                <ImagePlaceholder
                  src={category.image}
                  alt={`تصویر دسته ${category.name}`}
                  className={`absolute top-1/2 z-1 aspect-square h-[130%] -translate-y-1/2 rounded-full border-2 border-white/80 bg-[#e9e3d9] p-1.25 shadow-lg outline outline-black/20 ${
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
    </>
  );
}
