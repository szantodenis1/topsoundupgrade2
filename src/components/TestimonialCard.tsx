import React, { memo } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

const StarRating = memo(({ rating }: { rating: number }) => (
  <div className="flex mb-4">
    {[...Array(rating)].map((_, i) => (
      <Star key={i} className="w-5 h-5 text-accent-blue fill-current group-hover:text-white transition-colors duration-500" />
    ))}
  </div>
));

StarRating.displayName = 'StarRating';

const TestimonialCard: React.FC<TestimonialCardProps> = memo(({ name, role, content, rating }) => {
  const { isChanging } = useLanguage();

  return (
    <div className={`group h-full flex flex-col bg-dark-50/50 hover:bg-gradient-to-r hover:from-accent-blue hover:via-accent-teal hover:to-accent-blue hover:bg-[length:200%_200%] hover:animate-gradient-x backdrop-blur-sm p-8 rounded-xl border border-dark-200 hover:border-transparent transform transition-all duration-500 ease-in-out hover:-translate-y-1 before:absolute before:inset-0 before:rounded-xl before:transition-opacity before:duration-500 before:bg-gradient-to-r before:from-accent-blue before:via-accent-teal before:to-accent-blue before:opacity-0 hover:before:opacity-100 relative overflow-hidden language-transition ${isChanging ? 'language-transition-exit' : 'language-transition-enter-active'}`}>
      <div className="relative z-10 flex flex-col h-full">
        <StarRating rating={rating} />
        <p className="text-dark-600 group-hover:text-white/90 mb-6 leading-relaxed flex-grow">{content}</p>
        <div className="mt-auto">
          <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-accent-blue to-accent-teal group-hover:text-white transition-colors duration-500 ease-in-out">
            {name}
          </p>
          <p className="text-dark-500 group-hover:text-white/70 text-sm mt-1 transition-colors duration-500 ease-in-out">{role}</p>
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;