import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LANGUAGES = {
  en: {
    name: "English",
    nativeName: "English",
    speech: "en-IN",
  },

  ta: {
    name: "Tamil",
    nativeName: "தமிழ்",
    speech: "ta-IN",
  },

  hi: {
    name: "Hindi",
    nativeName: "हिन्दी",
    speech: "hi-IN",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("argi_language") || "en"
  );

  const changeLanguage = (newLanguage) => {
    // Only allow the 3 supported languages
    if (!LANGUAGES[newLanguage]) {
      return;
    }

    setLanguage(newLanguage);
    localStorage.setItem("argi_language", newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        languages: LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}