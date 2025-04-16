import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = {
    ro: 'Română',
    en: 'English'
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1.5 rounded-lg hover:bg-white/10 transition-colors duration-300"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{languages[language]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg bg-dark-800 shadow-lg shadow-accent-blue/10 border border-dark-700 backdrop-blur-sm overflow-hidden">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code as 'ro' | 'en');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors duration-300 ${
                language === code
                  ? 'bg-accent-blue text-white'
                  : 'hover:bg-white/10 text-white/90'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitch;