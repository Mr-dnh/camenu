"use client";

import type { MenuCategory } from "@/data/menu";
import { ImagePlaceholder } from "@/components/image-placeholder";

type Props = {
  category: MenuCategory;
  index: number;
  onSelect: (category: MenuCategory) => void;
};

export function CategoryRow({ category, index, onSelect }: Props) {
  const imageOnRight = index % 2 === 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(category)}
      aria-label={`نمایش منوی ${category.name}`}
      className="category-row group relative min-h-0 overflow-hidden border-b border-black/10 text-right transition-[filter] duration-300 hover:brightness-[1.035] focus-visible:z-30 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
      style={{
        backgroundColor: category.color,
        color: category.id === "cocktails" ? "#fbf6ed" : "#202a30",
      }}
    >
      <span
        className={`category-copy absolute inset-y-0 z-20 flex w-full flex-col justify-center px-5 ${
          imageOnRight ? "pl-5 pr-[50%] text-right" : "pl-[50%] pr-5 text-left"
        }`}
      >
        <span
          className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none font-serif text-[clamp(6rem,17vw,12rem)] font-black leading-none tracking-[-0.09em] opacity-[0.10] transition-transform duration-500 group-hover:scale-105 ${
            imageOnRight ? "left-[4%]" : "right-[4%]"
          }`}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          data-text={category.name}
          className="category-title relative max-w-full text-2xl font-black leading-[1.1] tracking-tight sm:text-3xl md:text-4xl"
        >
          {category.name}
        </span>
        <span className="category-subtitle mt-2 max-w-full text-[11px] font-medium leading-5 opacity-90 sm:mt-3 sm:text-xs md:text-sm">
          {category.subtitle}
        </span>
        <span
          className="mt-3 h-[3px] w-8 bg-current transition-[width] duration-300 group-hover:w-14 sm:mt-4"
          aria-hidden="true"
        />
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
}
