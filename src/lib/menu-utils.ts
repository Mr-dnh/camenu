import { menuCategories, type MenuCategory } from "@/data/menu";

export type DishResult = MenuCategory["dishes"][number] & {
  categoryName: string;
};

export const allDishes: DishResult[] = menuCategories.flatMap((category) =>
  category.dishes.map((dish) => ({
    ...dish,
    categoryName: category.name,
  }))
);

export function findCategoryByDishId(dishId: string) {
  return menuCategories.find((category) =>
    category.dishes.some((dish) => dish.id === dishId)
  );
}

export function formatPrice(price: number) {
  return `${price.toLocaleString("fa-IR")} تومان`;
}
