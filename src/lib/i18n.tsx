"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import en from "@/lib/translations/en";
import hi from "@/lib/translations/hi";
import mr from "@/lib/translations/mr";

// ── Types ────────────────────────────────────────────────────────────────────
export type Locale = "en" | "hi" | "mr";

const TRANSLATIONS = { en, hi, mr } as const;
const STORAGE_KEY = "prerna-locale";
const DEFAULT_LOCALE: Locale = "en";

// ── Nested key access helper ─────────────────────────────────────────────────
// Allows `t("services.neuropsychiatry.title")` style dot-notation access.
function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : path;
}

// ── Context ──────────────────────────────────────────────────────────────────
interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key: string) => key,
});

// ── Provider ─────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage on mount
  useEffect(() => {
    // Disabled to ensure the website always opens in English by default on fresh load.
    // If you wish to remember language choices across page refreshes, uncomment the logic below:
    /*
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && stored in TRANSLATIONS) {
        setLocaleState(stored);
      }
    } catch {
      // SSR or localStorage not available
    }
    */
  }, []);

  // Persist to localStorage + update <html lang="">
  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // ignore
    }
    document.documentElement.lang = newLocale;
  }, []);

  // Keep <html lang=""> in sync on mount
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Translation function
  const t = useCallback(
    (key: string): string => {
      const translations = TRANSLATIONS[locale];
      return getNestedValue(
        translations as unknown as Record<string, unknown>,
        key
      );
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
