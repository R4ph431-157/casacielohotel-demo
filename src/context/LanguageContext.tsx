import { createContext, useContext, useState, type ReactNode } from 'react';
import { fr, type Translations } from '../i18n/fr';
import { en } from '../i18n/en';

type Language = 'fr' | 'en';

interface LanguageContextValue {
  language: Language;
  t: Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const toggleLanguage = () => setLanguage(l => (l === 'fr' ? 'en' : 'fr'));

  const t = language === 'fr' ? fr : en;

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
