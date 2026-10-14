"use client";

import { Search } from "lucide-react";
import { cafeName } from "@/data/menu";

type Props = {
  onOpenSearch: () => void;
};

export function MenuHeader({ onOpenSearch }: Props) {
  return (
    <header className="relative z-10 shrink-0 bg-[#202a30] text-[#f8f4ed]">
      <div className="grid grid-cols-2 justify-between px-5 py-2">
        <span className="text-right font-serif text-2xl font-bold">
          {cafeName}
        </span>
        <button
          type="button"
          className="justify-self-end p-2"
          aria-label="جست‌وجو"
          onClick={onOpenSearch}
        >
          <Search size={25} />
        </button>
      </div>
    </header>
  );
}
