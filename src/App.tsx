import React, { useState, useEffect, useMemo, memo } from 'react';
import { 
  Music4, 
  LayoutGrid as StageIcon, 
  MonitorPlay, 
  Phone, 
  Mail, 
  MapPin, 
  Star, 
  ChevronRight, 
  Facebook, 
  Instagram,
  Wrench
} from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import ContactForm from './components/ContactForm';
import ServiceCard from './components/ServiceCard';
import TestimonialCard from './components/TestimonialCard';
import Gallery from './components/Gallery';
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import SpotlightIcon from './components/icons/SpotlightIcon';

const testimonials = [
  {
    name: "Ovidiu Naghiu",
    role: "Organizator Evenimente",
    content: "Firma care poate sa ofere cea mai bună sonorizare pentru evenimente. Recomand cu încredere",
    rating: 5
  },
  {
    name: "Adrian Ionescu",
    role: "Director Festival",
    content: "Colaborarea cu Top Sound a fost o experiență extraordinară. Echipamentele și expertiza lor tehnică sunt de neegalat.",
    rating: 5
  },
  {
    name: "Elena Dumitrescu",
    role: "Wedding Planner",
    content: "Au făcut recepția nunții de neuitat. Iluminatul și sunetul au fost perfecte. Mari multumiri echipei pentru treaba minunata!",
    rating: 5
  }
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  const services = useMemo(() => [
    {
      icon: <Music4 className="w-8 h-8" />,
      title: t('services.audio.title'),
      description: t('services.audio.description'),
      details: {
        mainText: t('services.audio.details.mainText'),
        bulletPoints: t('services.audio.details.bulletPoints'),
        brands: t('services.audio.details.brands')
      }
    },
    {
      icon: <SpotlightIcon className="w-8 h-8" />,
      title: t('services.lighting.title'),
      description: t('services.lighting.description'),
      details: {
        mainText: t('services.lighting.details.mainText'),
        bulletPoints: t('services.lighting.details.bulletPoints'),
        brands: t('services.lighting.details.brands')
      }
    },
    {
      icon: <StageIcon className="w-8 h-8" />,
      title: t('services.stage.title'),
      description: t('services.stage.description'),
      details: {
        mainText: t('services.stage.details.mainText'),
        bulletPoints: t('services.stage.details.bulletPoints'),
        brands: t('services.stage.details.brands')
      }
    },
    {
      icon: <MonitorPlay className="w-8 h-8" />,
      title: t('services.video.title'),
      description: t('services.video.description'),
      details: {
        mainText: t('services.video.details.mainText'),
        bulletPoints: t('services.video.details.bulletPoints'),
        brands: t('services.video.details.brands')
      }
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: t('services.technical.title'),
      description: t('services.technical.description'),
      details: {
        mainText: t('services.technical.details')
      }
    }
  ], [t]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const TestimonialsSection = memo(() => (
    <section id="testimonials" className="py-20 bg-dark-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient" data-aos="fade-up">
          {t('testimonials.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  ));

  TestimonialsSection.displayName = 'TestimonialsSection';

  return (
    <div className="min-h-screen bg-dark-100">
      <Navigation isScrolled={isScrolled} />

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://i.postimg.cc/J4jZ1qwv/upscalemedia-transformed.jpg"
            alt="Concert Stage"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-dark-950/95 via-dark-950/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-dark-950/95 via-dark-950/50 to-transparent"></div>
        </div>
        <div className="relative text-center text-white px-4 max-w-4xl mx-auto" data-aos="fade-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-6 hero-text-glow font-orbitron tracking-wider leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
            <span className="text-gradient">{t('hero.title')}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-white/90 hero-text-glow">{t('hero.subtitle')}</p>
          <a href="#contact" className="bg-accent-blue hover:bg-accent-blue/90 text-white px-6 sm:px-8 py-3 rounded-full inline-flex items-center transform hover:scale-105 transition-all glow-hover text-sm sm:text-base">
            {t('hero.cta')}
            <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </a>
        </div>
      </header>

      {/* About Section */}
      <section className="relative py-16 md:py-20 bg-dark-50 overflow-hidden">
        <AnimatedBackground variant="light" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square w-full max-w-xl mx-auto" data-aos="fade-right">
              <img 
                src="https://topsound.ro/media/com_kausgallery/upload/33/big/071cd828cdf514b81d149ac97dec6e47-001.jpg" 
                alt="Concert Setup" 
                className="absolute inset-0 w-full h-full object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-dark-900/40 to-transparent rounded-xl"></div>
            </div>
            <div className="space-y-6" data-aos="fade-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">{t('about.title')}</h2>
              <div className="space-y-4 text-dark-600">
                <p className="leading-relaxed text-sm sm:text-base">{t('about.description1')}</p>
                <p className="leading-relaxed text-sm sm:text-base">{t('about.description2')}</p>
                <p className="leading-relaxed font-semibold text-dark-800 text-sm sm:text-base">{t('about.description3')}</p>
              </div>
              <div className="pt-4">
                <a 
                  href="#contact" 
                  className="inline-flex items-center px-4 sm:px-6 py-3 bg-gradient-to-r from-accent-blue via-accent-teal to-accent-blue bg-[length:200%_200%] animate-gradient-x text-white rounded-xl hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 group text-sm sm:text-base"
                >
                  <span className="font-semibold">{t('about.cta')}</span>
                  <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-16 md:py-20 bg-dark-100 overflow-hidden">
        <AnimatedBackground variant="light" />
        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gradient" data-aos="fade-up">
            {t('services.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-4">
            {services.map((service, index) => (
              <div key={index} className="h-full" data-aos="fade-up" data-aos-delay={index * 100}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event CTA Section */}
      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <AnimatedBackground variant="light" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl font-bold text-gradient">
              {t('eventCta.title')}
            </h2>
            <p className="text-dark-600 text-lg">
              {t('eventCta.description')}
            </p>
            <div>
              <a 
                href="#contact" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent-blue via-accent-teal to-accent-blue bg-[length:200%_200%] animate-gradient-x text-white rounded-xl hover:shadow-lg hover:shadow-accent-blue/20 transition-all duration-300 group"
              >
                <span className="font-semibold">{t('eventCta.button')}</span>
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-20 bg-dark-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gradient" data-aos="fade-up">
            {t('gallery.title')}
          </h2>
          <Gallery />
        </div>
      </section>

      <TestimonialsSection />

      {/* Contact Section */}
      <section id="contact" className="relative py-16 md:py-20 bg-dark-50 overflow-hidden">
        <AnimatedBackground variant="light" />
        <div className="container mx-auto px-4 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gradient" data-aos="fade-up">
            {t('contact.title')}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div data-aos="fade-right">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 text-dark-800">{t('contact.info.title')}</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 mr-4 text-accent-blue" />
                  <span className="text-dark-600 text-sm sm:text-base">{t('contact.info.phone')}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 mr-4 text-accent-blue" />
                  <span className="text-dark-600 text-sm sm:text-base">{t('contact.info.email')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 mr-4 text-accent-blue" />
                  <span className="text-dark-600 text-sm sm:text-base">{t('contact.info.address')}</span>
                </div>
              </div>
              <div className="mt-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2740.9937579843233!2d21.915319015739504!3d47.06214327915266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4746473e8cbf2fd9%3A0x3789b792902c0e33!2sStrada%20Piatra%20Craiului%208%2C%20Oradea%20410001%2C%20Romania!5e0!3m2!1sro!2sro!4v1712570412345!5m2!1sro!2sro"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            <div data-aos="fade-left">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="w-20 mb-3">
                <img src="https://topsound.ro/images/logo-topsound.png" alt="Top Sound Logo" className="w-full h-auto" />
              </div>
              <p className="text-dark-300 text-sm">{t('footer.description')}</p>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2 text-white">{t('footer.quickLinks')}</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#services" className="text-dark-300 hover:text-accent-blue transition-colors">{t('nav.services')}</a></li>
                <li><a href="#gallery" className="text-dark-300 hover:text-accent-blue transition-colors">{t('nav.gallery')}</a></li>
                <li><a href="#testimonials" className="text-dark-300 hover:text-accent-blue transition-colors">{t('nav.testimonials')}</a></li>
                <li><a href="#contact" className="text-dark-300 hover:text-accent-blue transition-colors">{t('nav.contact')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold mb-2 text-white">{t('footer.followUs')}</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.facebook.com/topsoundevents/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-dark-300 hover:text-accent-blue transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.instagram.com/topsound.oradea/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-300 hover:text-accent-blue transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-dark-700 mt-4 pt-4 text-center text-dark-400 text-xs">
            <p>&copy; {new Date().getFullYear()} Top Sound. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;