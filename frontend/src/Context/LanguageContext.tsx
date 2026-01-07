import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = {
  label: string;
  value: string;
  short: string;
  flagSrc: string;
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  lang: string;
  languages: Language[];
};

export const LANGUAGES: Language[] = [
  { label: "English", value: "en", short: "En", flagSrc: "/img/flags/gb.svg" },
  { label: "Amharic", value: "am", short: "Am", flagSrc: "/img/flags/et.svg" },
  { label: "Afan Oromo", value: "ao", short: "Ao", flagSrc: "/img/flags/et.svg" },
];

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("app_language");
    return (
      LANGUAGES.find((l) => l.value === saved) || LANGUAGES[0]
    );
  });

  useEffect(() => {
    localStorage.setItem("app_language", language.value);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        lang: language.value,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return ctx;
}
