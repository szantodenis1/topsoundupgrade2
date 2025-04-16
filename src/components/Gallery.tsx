import React, { memo, useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  title: string;
  image: string;
}

const GalleryImage = memo(({ item }: { item: GalleryItem }) => (
  <div 
    className="relative flex-none w-full px-4 md:px-0"
    data-aos="fade-up"
  >
    <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden mx-auto max-w-[800px]">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover rounded-xl transform transition-transform duration-500 hover:scale-105"
        loading="lazy"
        draggable="false"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 rounded-xl">
        <p className="text-white text-lg font-semibold">
          {item.title}
        </p>
      </div>
    </div>
  </div>
));

GalleryImage.displayName = 'GalleryImage';

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const galleries: GalleryItem[] = [
    {
      title: "Concert Parazitii, BAZOOKA, Macanache 2024",
      image: "https://i.postimg.cc/yYfZVX7y/parazitii.jpg"
    },
    {
      title: "Bucovina Rock Castle 2019",
      image: "https://topsound.ro/media/com_kausgallery/upload/41/big/e3b28094d6930ab02180fdb9f9dc1319-001.1.jpg"
    },
    {
      title: "Oradea Festifall 2019",
      image: "https://topsound.ro/media/com_kausgallery/upload/39/big/9c1b91fd26c1c87c2587817ea675809f-02--1-.jpg"
    },
    {
      title: "Orasul Faptelor Bune 2019",
      image: "https://topsound.ro/media/com_kausgallery/upload/40/big/bf787b24a23b96388dff78f2c6614d37-002--1-.jpg"
    },
    {
      title: "Toamna Oradeana 2018",
      image: "https://topsound.ro/media/com_kausgallery/upload/37/big/5dd9f37e213388d9192165a335472d10-04.%20toamna-oradeana-2018-ziua-a-4-a-concert-carlas-dreams-59880.jpg"
    },
    {
      title: "Zilele Sf. Ladislau 2017",
      image: "https://topsound.ro/media/com_kausgallery/upload/36/big/1a75074eeb8146b9153ed933fa40ac74-04.1.jpg"
    },
    {
      title: "Oradea Festifall 2019",
      image: "https://topsound.ro/media/com_kausgallery/upload/39/big/e3da762a32100118d90f723c812dbea7-01--1-.jpg"
    },
    {
      title: "Orasul Faptelor Bune 2019",
      image: "https://topsound.ro/media/com_kausgallery/upload/40/big/e896471b38fbf0516c843ecea2b35524-002.1%20(1).jpg"
    }
  ];

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (isAnimating) return;
    setIsAnimating(true);

    const direction = distance > 0 ? 'right' : 'left';
    const newIndex = direction === 'left'
      ? (currentIndex - 1 + galleries.length) % galleries.length
      : (currentIndex + 1) % galleries.length;
    
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    handleSwipe();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleNavigation = (direction: 'prev' | 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIndex = direction === 'prev'
      ? (currentIndex - 1 + galleries.length) % galleries.length
      : (currentIndex + 1) % galleries.length;

    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleNavigation('prev');
      } else if (e.key === 'ArrowRight') {
        handleNavigation('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="relative touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {galleries.map((gallery, index) => (
              <GalleryImage key={index} item={gallery} />
            ))}
          </div>
        </div>

        {/* Navigation Arrows - Only visible on desktop */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNavigation('prev')}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-950/50 hover:bg-dark-950/80 text-white transition-all hover:scale-110 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-950/50 hover:bg-dark-950/80 text-white transition-all hover:scale-110 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {galleries.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-accent-blue w-6' 
                  : 'bg-dark-300 hover:bg-dark-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;