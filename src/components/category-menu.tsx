"use client";

import { ArrowDownLeft, ArrowLeft, ArrowUpRight, Plus, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { menuCategories, type MenuCategory } from "@/data/menu";
import { ImagePlaceholder } from "@/components/image-placeholder";

const currency = (price: number) => `$${price.toFixed(2)}`;

export function CategoryMenu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  const allDishes = useMemo(
    () => menuCategories.flatMap((category) =>
      category.dishes.map((dish) => ({ ...dish, categoryName: category.name })),
    ),
    [],
  );

  const filteredDishes = allDishes.filter((dish) =>
    `${dish.name} ${dish.description} ${dish.categoryName}`.toLowerCase().includes(search.toLowerCase()),
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
      <header className="site-header">
        <div className="status-bar" aria-hidden="true">
          <span>9:41</span>
          <span className="status-right"><span>▮▮▮</span><span>◔</span><span className="battery"> </span></span>
        </div>
        <div className="header-main">
          <button className="icon-button menu-mark" aria-label="Back to categories" onClick={() => setActiveCategory(null)}>
            <span /><span /><span />
          </button>
          <a className="wordmark" href="#" onClick={(event) => { event.preventDefault(); setActiveCategory(null); }}>F I S H</a>
          <button className="icon-button search-button" aria-label="Search menu" onClick={() => setSearchOpen(true)}><Search size={26} /></button>
        </div>
      </header>

      <main className="menu-home">
        <section className="category-list" aria-label="Menu categories">
          {menuCategories.map((category, index) => (
            <button
              className={`category-row category-row--${category.id} ${index % 2 ? "category-row--left" : "category-row--right"}`}
              key={category.id}
              style={{ "--category-color": category.color } as React.CSSProperties}
              onClick={() => setActiveCategory(category)}
              aria-label={`Open ${category.name} menu`}
            >
              <span className="category-copy">
                <span className="category-number">0{index + 1}<i /></span>
                <span className="category-title">{category.name}</span>
                <span className="category-subtitle">{category.subtitle}</span>
              </span>
              <ImagePlaceholder
                src={category.image}
                alt={`${category.name} photo placeholder`}
                className="category-image"
                imageClassName="category-photo"
                priority={index < 2}
              />
              <span className="category-arrow"><ArrowUpRight size={20} strokeWidth={1.5} /></span>
            </button>
          ))}
        </section>
      </main>

      {activeCategory && (
        <section className="menu-overlay" role="dialog" aria-modal="true" aria-label={`${activeCategory.name} menu`}>
          <div className="overlay-top">
            <button className="back-button" onClick={() => setActiveCategory(null)}><ArrowLeft size={18} /> ALL CATEGORIES</button>
            <span className="overlay-brand">F I S H</span>
            <button className="icon-button overlay-close" aria-label="Close menu" onClick={() => setActiveCategory(null)}><X size={24} /></button>
          </div>
          <div className="overlay-content" key={activeCategory.id}>
            <div className="overlay-heading">
              <span className="eyebrow">THE MENU / 0{menuCategories.findIndex((c) => c.id === activeCategory.id) + 1}</span>
              <h2>{activeCategory.name}<span>.</span></h2>
              <p>{activeCategory.subtitle}</p>
            </div>
            <div className="dish-list">
              {activeCategory.dishes.map((dish, index) => (
                <article className="dish-card" key={dish.id} style={{ animationDelay: `${index * 90}ms` }}>
                  <ImagePlaceholder src={dish.image} alt={`${dish.name} photo placeholder`} className="dish-image" imageClassName="dish-photo" />
                  <div className="dish-copy">
                    <div className="dish-meta">
                      {dish.tag && <span className="dish-tag">{dish.tag}</span>}
                      <span className="dish-number">0{index + 1}</span>
                    </div>
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                    <div className="dish-bottom"><span className="dish-price">{currency(dish.price)}</span><span className="dish-price-note">INCL. TAX</span></div>
                  </div>
                </article>
              ))}
            </div>
            <div className="overlay-bottom"><span>FRESHLY MADE, ALWAYS.</span><span>ASK US ABOUT ALLERGENS.</span></div>
          </div>
        </section>
      )}

      {searchOpen && (
        <section className="search-overlay" role="dialog" aria-modal="true" aria-label="Search the menu">
          <div className="overlay-top">
            <button className="back-button" onClick={() => setSearchOpen(false)}><ArrowDownLeft size={18} /> BACK TO MENU</button>
            <span className="overlay-brand">F I S H</span>
            <button className="icon-button overlay-close" aria-label="Close search" onClick={() => setSearchOpen(false)}><X size={24} /></button>
          </div>
          <div className="search-content">
            <span className="eyebrow">FIND YOUR FAVOURITE</span>
            <label className="search-field"><Search size={23} /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pasta, coffee, something sweet..." /><button aria-label="Clear search" onClick={() => setSearch("")}><X size={18} /></button></label>
            <p className="search-count">{filteredDishes.length} ITEMS ON THE MENU</p>
            <div className="search-results">
              {filteredDishes.map((dish) => (
                <button key={dish.id} className="search-result" onClick={() => { setSearchOpen(false); setSearch(""); setActiveCategory(menuCategories.find((category) => category.dishes.some((item) => item.id === dish.id)) ?? null); }}>
                  <span><small>{dish.categoryName}</small><strong>{dish.name}</strong><em>{dish.description}</em></span><span className="search-result-price">{currency(dish.price)} <Plus size={16} /></span>
                </button>
              ))}
              {filteredDishes.length === 0 && <p className="empty-search">Nothing on the menu by that name. Try another search.</p>}
            </div>
          </div>
        </section>
      )}
    </>
  );
}