"use client";

import { createContext, useContext, useMemo, useState } from "react";

type SiteReadyContextValue = {
  /** Flips true once LoadingScreen finishes its intro sequence. */
  ready: boolean;
  setReady: (value: boolean) => void;
};

const SiteReadyContext = createContext<SiteReadyContextValue>({
  ready: false,
  setReady: () => {},
});

export function SiteReadyProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);

  return <SiteReadyContext.Provider value={value}>{children}</SiteReadyContext.Provider>;
}

export const useSiteReady = () => useContext(SiteReadyContext);
