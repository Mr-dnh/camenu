"use client";

import { ArrowLeft, X } from "lucide-react";
import type { MenuCategory } from "@/data/menu";
import { ImagePlaceholder } from "@/components/image-placeholder";

const currency = (price: number) => `${price.toLocaleString("fa-IR")} تومان`;

type Props = {
  category: MenuCategory;
  onClose: () => void;
};

export function CategoryOverlay({ category, onClose }: Props) {
  return (
    <section className="fixed inset-0 z-20 animate-[fadeIn_.3s_ease-out] overflow-y-auto bg-[#f4eee6] text-[#273039]" role="dialog" aria-modal="true" aria-label={`منوی ${category.name}`} dir="rtl">
      <div className="sticky top-0 z-10 grid h-16 grid-cols-3 items-center border-b border-black/10 bg-[#f4eee6]/95 px-[5%] backdrop-blur">
        <button className="flex items-center gap-1 justify-self-start text-xs font-bold" onClick={onClose}><ArrowLeft size={17} /> همهٔ دسته‌ها</button>
        <span className="justify-self-center font-serif font-bold tracking-widest">فیش</span>
        <button className="justify-self-end p-2" aria-label="بستن منو" onClick={onClose}><X size={22} /></button>
      </div>
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-10">
        <div className="pb-7">
          <span className="text-[10px] font-bold tracking-widest text-[#66655e]">منوی اختصاصی · {category.name}</span>
          <h2 className="mt-3 text-5xl font-bold sm:text-7xl">{category.name}<span className="text-[#eea052]">.</span></h2>
          <p className="mt-2 text-sm text-[#66655e]">{category.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {category.dishes.map((dish, index) => (
            <article key={dish.id} className="min-w-0 overflow-hidden rounded-xl border border-black/10 bg-white/70 shadow-sm" style={{ animation: "fadeIn .4s ease-out both", animationDelay: `${index * 60}ms` }}>
              <ImagePlaceholder src={dish.image} alt={`تصویر ${dish.name}`} className="aspect-[1.05] w-full bg-[#e8dfd2] sm:aspect-[1.2]" imageClassName="h-full w-full object-cover" />
              <div className="p-3 sm:p-4">
                <div className="flex min-h-4 items-center justify-between gap-1 text-[8px] text-[#66655e] sm:text-[9px]">
                  <span className="truncate">{dish.tag ? ({"HOUSE FAVORITE":"پیشنهاد سرآشپز", VEGETARIAN:"گیاهی", CLASSIC:"کلاسیک", "BARISTA PICK":"پیشنهاد باریستا"} as Record<string,string>)[dish.tag] : ""}</span>
                  <span className="shrink-0">{String(index + 1).padStart(2,"0").replace(/[0-9]/g, d => "۰۱۲۳۴۵۶۷۸۹"[Number(d)])}</span>
                </div>
                <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-6 sm:text-lg">{dish.name}</h3>
                <p className="mt-1 line-clamp-3 min-h-[3.75rem] text-[10px] leading-5 text-[#66655e] sm:text-xs">{dish.description}</p>
                <div className="mt-3 border-t border-black/10 pt-2 text-xs font-bold sm:text-sm">{currency(dish.price)}</div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-black/15 py-4 text-[9px] text-[#66655e]"><span>تازه و روزانه، برای شما</span><span>دربارهٔ آلرژن‌ها از ما بپرسید</span></div>
      </div>
    </section>
  );
}