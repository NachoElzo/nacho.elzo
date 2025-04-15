"use client";
import { createContext, useState, ReactNode } from 'react';

type LanguageContextType = {
  language: 'es' | 'en';
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  toggleLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};