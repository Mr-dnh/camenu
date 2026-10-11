"use client";

import { ArrowLeft, Plus, Search, X } from "lucide-react";
import { cafeName, type MenuCategory } from "@/data/menu";

type DishResult = MenuCategory["dishes"][number] & { categoryName: string };
type Props = {
  dishes: DishResult[];
  onClose: () => void;
  onSelectDish: (dishId: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

const currency = (price: number) => `${price.toLocaleString("fa-IR")} تومان`;

export function SearchOverlay({
  dishes,
  onClose,
  onSelectDish,
  search,
  onSearchChange,
}: Props) {
  const filteredDishes = dishes.filter((dish) =>
    `${dish.name} ${dish.description} ${dish.categoryName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section
      className="fixed inset-0 z-20 animate-[fadeIn_.3s_ease-out] overflow-y-auto bg-[#f4eee6] text-[#273039]"
      role="dialog"
      aria-modal="true"
      aria-label="جست‌وجوی منو"
      dir="rtl">
      <div className="sticky top-0 z-10 grid h-16 grid-cols-3 items-center border-b border-black/10 bg-[#f4eee6]/95 px-[5%] backdrop-blur">
        <button
          className="flex items-center gap-1 justify-self-start text-xs font-bold"
          onClick={onClose}>
          <ArrowLeft size={17} /> بازگشت
        </button>
        <span className="justify-self-center font-serif font-bold">
          {cafeName}
        </span>
        <button
          className="justify-self-end p-2"
          aria-label="بستن جست‌وجو"
          onClick={onClose}>
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
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="نام غذا یا دسته‌بندی..."
            className="min-w-0 flex-1 bg-transparent text-base outline-none"
          />
          <button
            aria-label="پاک کردن جست‌وجو"
            onClick={() => onSearchChange("")}>
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
            onClick={() => onSelectDish(dish.id)}>
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
  );
}
