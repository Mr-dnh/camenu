"use client";

import { useCallback, useEffect, useState } from "react";

export type MenuView =
  | { type: "home" }
  | { type: "search" }
  | { type: "category"; categoryId: string };

type HistoryState = {
  camenuView?: MenuView;
  [key: string]: unknown;
};

function getViewFromHistory(state: unknown): MenuView {
  if (!state || typeof state !== "object") return { type: "home" };

  const view = (state as HistoryState).camenuView;
  if (!view || typeof view !== "object") return { type: "home" };
  if (view.type === "search") return { type: "search" };
  if (view.type === "category" && typeof view.categoryId === "string") {
    return view;
  }

  return { type: "home" };
}

export function useMenuNavigation() {
  const [view, setView] = useState<MenuView>({ type: "home" });

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      setView(getViewFromHistory(event.state));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = useCallback((nextView: MenuView) => {
    const currentState =
      window.history.state && typeof window.history.state === "object"
        ? window.history.state
        : {};

    window.history.pushState(
      { ...currentState, camenuView: nextView },
      "",
      window.location.href
    );
    setView(nextView);
  }, []);

  const closeOverlay = useCallback(() => {
    if (view.type !== "home") window.history.back();
  }, [view.type]);

  return { view, navigateTo, closeOverlay };
}
