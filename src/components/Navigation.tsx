import React, { memo, useState } from 'react';
import { Menu, X as Close } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';

interface NavigationProps {
  isScrolled: boolean;
}

const MobileMenu = memo(({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { t } = useLanguage();
  
  return (
    <div className={`fixed inset-0 bg-dark-950/95 backdrop-blur-lg z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-end p-4">
        <button onClick={onClose} className="p-2 text-white hover:text-accent-blue transition-colors">
          <Close className="w-8 h-8" />
        </button>
      </div>
      <div className="flex flex-col items-center space-y-8 p-8">
        <a href="#services" onClick={onClose} className="text-2xl font-bold text-white hover:text-accent-blue transition-colors">{t('nav.services')}</a>
        <a href="#gallery" onClick={onClose} className="text-2xl font-bold text-white hover:text-accent-blue transition-colors">{t('nav.gallery')}</a>
        <a href="#testimonials" onClick={onClose} className="text-2xl font-bold text-white hover:text-accent-blue transition-colors">{t('nav.testimonials')}</a>
        <a href="#contact" onClick={onClose} className="text-2xl font-bold text-white hover:text-accent-blue transition-colors">{t('nav.contact')}</a>
        <LanguageSwitch />
      </div>
    </div>
  );
});

MobileMenu.displayName = 'MobileMenu';

const Navigation: React.FC<NavigationProps> = memo(({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <nav 
        className={`fixed w-full z-40 transition-all duration-500 ease-in-out transform ${
          isScrolled 
            ? 'bg-dark-800/60 backdrop-blur-navbar shadow-lg translate-y-0' 
            : 'bg-transparent -translate-y-1'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="w-24 md:w-32">
              <img src="https://topsound.ro/images/logo-topsound.png" alt="Top Sound Logo" className="w-full h-auto" />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="font-bold text-white hover:text-accent-blue transition-colors">{t('nav.services')}</a>
              <a href="#gallery" className="font-bold text-white hover:text-accent-blue transition-colors">{t('nav.gallery')}</a>
              <a href="#testimonials" className="font-bold text-white hover:text-accent-blue transition-colors">{t('nav.testimonials')}</a>
              <a href="#contact" className="font-bold text-white hover:text-accent-blue transition-colors">{t('nav.contact')}</a>
              <LanguageSwitch />
            </div>
            <button 
              className="md:hidden text-white hover:text-accent-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
});

Navigation.displayName = 'Navigation';

export default Navigation;