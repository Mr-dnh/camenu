"use client";

import { useEffect, useState } from "react";
import { menuCategories } from "@/data/menu";
import { CategoryOverlay } from "@/components/category-overlay";
import { SearchOverlay } from "@/components/search-overlay";
import { CategoryList } from "@/components/menu/category-list";
import { MenuHeader } from "@/components/menu/menu-header";
import { useMenuNavigation } from "@/hooks/use-menu-navigation";
import { allDishes, findCategoryByDishId } from "@/lib/menu-utils";

export function CategoryMenu() {
  const { view, navigateTo, closeOverlay } = useMenuNavigation();
  const [search, setSearch] = useState("");

  const activeCategory =
    view.type === "category"
      ? menuCategories.find((category) => category.id === view.categoryId) ?? null
      : null;

  useEffect(() => {
    document.body.style.overflow = view.type === "home" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [view.type]);

  const selectDish = (dishId: string) => {
    const category = findCategoryByDishId(dishId);
    if (category) {
      navigateTo({ type: "category", categoryId: category.id });
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <MenuHeader
        onOpenSearch={() => navigateTo({ type: "search" })}
      />
      <CategoryList
        onSelectCategory={(category) =>
          navigateTo({ type: "category", categoryId: category.id })
        }
      />

      {activeCategory && (
        <CategoryOverlay
          category={activeCategory}
          onClose={closeOverlay}
        />
      )}

      {view.type === "search" && (
        <SearchOverlay
          dishes={allDishes}
          onClose={closeOverlay}
          onSelectDish={selectDish}
          search={search}
          onSearchChange={setSearch}
        />
      )}
    </div>
  );
}
