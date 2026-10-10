"use client";

import { ArrowLeft, Plus, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { menuCategories, type MenuCategory } from "@/data/menu";
import { ImagePlaceholder } from "@/components/image-placeholder";

const currency = (price: number) => `${price.toLocaleString("fa-IR")} تومان`;

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
  const filteredDishes = allDishes.filter((dish) =>
    `${dish.name} ${dish.description} ${dish.categoryName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  useEffect(() => {
    document.body.style.overflow = activeCategory || searchOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveCategory(null);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeCategory, searchOpen]);

  return (
    <>
      <header className="relative z-10 bg-[#202a30] text-[#f8f4ed]">
        <div className="grid grid-cols-2 justify-between px-5 py-2">
          <button
            className="font-serif text-2xl font-bold tracking-[.24em] text-right"
            onClick={() => {
              setActiveCategory(null);
              setSearchOpen(false);
            }}>
            کافه
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
          className="grid h-full grid-rows-6"
          aria-label="دسته‌بندی‌های منو">
          {menuCategories.map((category, index) => {
            const imageOnRight = index % 2 === 0;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                aria-label={`نمایش منوی ${category.name}`}
                className="relative isolate overflow-hidden"
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
                  <span className="mb-1 flex items-center gap-3 text-[10px] tracking-[.18em] opacity-75 sm:mb-2 sm:text-xs">

                  </span>
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
                  className={`absolute top-1/2 z-1 aspect-square h-[112%] -translate-y-1/2 rounded-full border-2 border-white/80 bg-[#e9e3d9] p-1.25 shadow-lg outline outline-black/20 ${
                    imageOnRight ? "right-[-7%]" : "left-[-7%]"
                  }`}
                  imageClassName="h-full w-full rounded-full object-cover opacity-25 mix-blend-multiply"
                  priority={index < 2}
                />
              </button>
            );
          })}
        </section>
      </main>

      {activeCategory && (
        <section
          className="fixed inset-0 z-20 overflow-y-auto bg-[#f4eee6] text-[#273039] animate-[fadeIn_.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label={`منوی ${activeCategory.name}`}
          dir="rtl">
          <div className="sticky top-0 z-10 grid h-16 grid-cols-3 items-center border-b border-black/10 bg-[#f4eee6]/95 px-[5%] backdrop-blur">
            <button
              className="flex items-center gap-1 justify-self-start text-xs font-bold"
              onClick={() => setActiveCategory(null)}>
              <ArrowLeft size={17} /> همهٔ دسته‌ها
            </button>
            <span className="justify-self-center font-serif font-bold tracking-widest">
              فیش
            </span>
            <button
              className="justify-self-end p-2"
              aria-label="بستن منو"
              onClick={() => setActiveCategory(null)}>
              <X size={22} />
            </button>
          </div>
          <div
            key={activeCategory.id}
            className="mx-auto max-w-5xl px-5 py-8 sm:px-10">
            <div className="pb-7">
              <span className="text-[10px] font-bold tracking-widest text-[#66655e]">
                منوی اختصاصی · {activeCategory.name}
              </span>
              <h2 className="mt-3 text-5xl font-bold sm:text-7xl">
                {activeCategory.name}
                <span className="text-[#eea052]">.</span>
              </h2>
              <p className="mt-2 text-sm text-[#66655e]">
                {activeCategory.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {activeCategory.dishes.map((dish, index) => (
                <article
                  key={dish.id}
                  className="min-w-0 overflow-hidden rounded-xl border border-black/10 bg-white/70 shadow-sm"
                  style={{
                    animation: "fadeIn .4s ease-out both",
                    animationDelay: `${index * 60}ms`,
                  }}>
                  <ImagePlaceholder
                    src={dish.image}
                    alt={`تصویر ${dish.name}`}
                    className="aspect-[1.05] w-full bg-[#e8dfd2] sm:aspect-[1.2]"
                    imageClassName="h-full w-full object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <div className="flex min-h-4 items-center justify-between gap-1 text-[8px] text-[#66655e] sm:text-[9px]">
                      <span className="truncate">
                        {dish.tag
                          ? (
                              {
                                "HOUSE FAVORITE": "پیشنهاد سرآشپز",
                                VEGETARIAN: "گیاهی",
                                CLASSIC: "کلاسیک",
                                "BARISTA PICK": "پیشنهاد باریستا",
                              } as Record<string, string>
                            )[dish.tag]
                          : ""}
                      </span>
                      <span className="shrink-0">
                        {String(index + 1)
                          .padStart(2, "0")
                          .replace(/[0-9]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])}
                      </span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-6 sm:text-lg">
                      {dish.name}
                    </h3>
                    <p className="mt-1 line-clamp-3 min-h-[3.75rem] text-[10px] leading-5 text-[#66655e] sm:text-xs">
                      {dish.description}
                    </p>
                    <div className="mt-3 border-t border-black/10 pt-2 text-xs font-bold sm:text-sm">
                      {currency(dish.price)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-black/15 py-4 text-[9px] text-[#66655e]">
              <span>تازه و روزانه، برای شما</span>
              <span>دربارهٔ آلرژن‌ها از ما بپرسید</span>
            </div>
          </div>
        </section>
      )}

      {searchOpen && (
        <section
          className="fixed inset-0 z-20 overflow-y-auto bg-[#f4eee6] text-[#273039] animate-[fadeIn_.3s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-label="جست‌وجوی منو"
          dir="rtl">
          <div className="sticky top-0 z-10 grid h-16 grid-cols-3 items-center border-b border-black/10 bg-[#f4eee6]/95 px-[5%] backdrop-blur">
            <button
              className="flex items-center gap-1 justify-self-start text-xs font-bold"
              onClick={() => setSearchOpen(false)}>
              <ArrowLeft size={17} /> بازگشت
            </button>
            <span className="justify-self-center font-serif font-bold">
              فیش
            </span>
            <button
              className="justify-self-end p-2"
              aria-label="بستن جست‌وجو"
              onClick={() => setSearchOpen(false)}>
              <X size={22} />
            </button>
          </div>
          <div className="mx-auto max-w-3xl px-5 py-10">
            <span className="text-xs font-bold text-[#66655e]">
              غذای مورد علاقه‌ات را پیدا کن
            </span>
            <label className="mt-5 flex items-center gap-3 border-b border-[#273039] py-3">
              <Search size={21} />
              <input
                autoFocus
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="نام غذا یا دسته‌بندی..."
                className="min-w-0 flex-1 bg-transparent text-base outline-none"
              />
              <button
                aria-label="پاک کردن جست‌وجو"
                onClick={() => setSearch("")}>
                <X size={17} />
              </button>
            </label>
            <p className="my-5 text-[10px] text-[#66655e]">
              {filteredDishes.length.toLocaleString("fa-IR")} مورد در منو
            </p>
            {filteredDishes.map((dish) => (
              <button
                key={dish.id}
                className="flex w-full items-center justify-between gap-4 border-b border-black/10 py-4 text-right"
                onClick={() => {
                  setSearchOpen(false);
                  setSearch("");
                  setActiveCategory(
                    menuCategories.find((category) =>
                      category.dishes.some((item) => item.id === dish.id)
                    ) ?? null
                  );
                }}>
                <span>
                  <span className="block text-xs text-[#66655e]">
                    {dish.categoryName}
                  </span>
                  <strong className="mt-1 block">{dish.name}</strong>
                  <span className="mt-1 block text-xs text-[#66655e]">
                    {dish.description}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2 text-xs font-bold">
                  {currency(dish.price)}
                  <Plus size={15} />
                </span>
              </button>
            ))}
            {filteredDishes.length === 0 && (
              <p className="py-6 text-sm text-[#66655e]">
                چیزی پیدا نشد؛ عبارت دیگری را امتحان کن.
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
