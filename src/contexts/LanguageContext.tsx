import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { translations } from '../i18n/translations';

type Language = 'ro' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isChanging: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ro');
  const [isChanging, setIsChanging] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    if (newLang === language) return;
    
    setIsChanging(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setLanguageState(newLang);
      timeoutRef.current = setTimeout(() => {
        setIsChanging(false);
      }, 300);
    }, 150);
  }, [language]);

  const t = useCallback((key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value === undefined) return key;
        value = value[k];
      }
      
      return value || key;
    } catch (error) {
      console.warn(`Translation key error: ${key}`, error);
      return key;
    }
  }, [language]);

  const contextValue = React.useMemo(() => ({
    language,
    setLanguage,
    t,
    isChanging
  }), [language, setLanguage, t, isChanging]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};