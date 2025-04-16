import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, images, title }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const previousImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-dark-950/90 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-5xl rounded-3xl bg-dark-50 shadow-xl shadow-accent-blue/20 overflow-hidden">
          <div className="relative">
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-dark-50/80 backdrop-blur-sm border-b border-dark-200">
              <Dialog.Title className="text-2xl font-bold text-gradient">
                {title}
              </Dialog.Title>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-dark-200 transition-colors"
              >
                <X className="w-6 h-6 text-dark-600" />
              </button>
            </div>

            <div className="relative aspect-video bg-dark-900/50">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'opacity-100 translate-x-0'
                      : index < currentImageIndex
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${title} - Image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={previousImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-950/50 hover:bg-dark-950/80 text-white transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-dark-950/50 hover:bg-dark-950/80 text-white transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="p-6 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (isAnimating) return;
                      setIsAnimating(true);
                      setCurrentImageIndex(index);
                      setTimeout(() => setIsAnimating(false), 300);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-accent-blue w-8'
                        : 'bg-dark-300 hover:bg-dark-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default GalleryModal;