"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { menuCategories, type MenuCategory } from "@/data/menu";
import { CategoryRow } from "@/components/menu/category-row";

type Props = {
  onSelectCategory: (category: MenuCategory) => void;
};

export function CategoryList({ onSelectCategory }: Props) {
  const menuRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = menuRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const rows = root.querySelectorAll<HTMLElement>(".category-row");

      rows.forEach((row, index) => {
        const image = row.querySelector<HTMLElement>(".category-photo-motion");
        const copy = row.querySelector<HTMLElement>(".category-copy");
        const delay = index * 0.11;

        gsap.fromTo(
          row,
          { autoAlpha: 0, x: index % 2 === 0 ? 36 : -36 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.55,
            delay,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
          }
        );

        if (image) {
          gsap.fromTo(
            image,
            {
              autoAlpha: 0,
              scale: 0.86,
              rotation: index % 2 === 0 ? 5 : -5,
            },
            {
              autoAlpha: 1,
              scale: 1,
              rotation: 0,
              duration: 0.75,
              delay: delay + 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            }
          );
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { autoAlpha: 0, y: 14 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.48,
              delay: delay + 0.12,
              ease: "power2.out",
              clearProps: "transform,opacity,visibility",
            }
          );
        }
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <main ref={menuRef} className="mx-auto min-h-0 w-full flex-1">
      <section
        className="grid h-full auto-rows-fr"
        aria-label="دسته‌بندی‌های منو"
      >
        {menuCategories.map((category, index) => (
          <CategoryRow
            key={category.id}
            category={category}
            index={index}
            onSelect={onSelectCategory}
          />
        ))}
      </section>
    </main>
  );
}
