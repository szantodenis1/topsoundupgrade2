import React, { memo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: {
    mainText: string;
    bulletPoints?: string[];
    brands?: string;
  };
}

const ServiceCard: React.FC<ServiceCardProps> = memo(({ 
  icon, 
  title, 
  description,
  details
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-accent-blue via-accent-teal to-accent-blue bg-[length:200%_200%] animate-gradient-x rounded-xl card-hover p-6 h-full flex flex-col transition-all duration-300">
      <div className="text-white mb-3 transform transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white transition-opacity duration-300">
        {title}
      </h3>
      <p className="text-sm text-white/90 transition-opacity duration-300">
        {description}
      </p>
      
      {details && (
        <div className="mt-4 space-y-3 text-white/90">
          <p className="text-xs leading-relaxed">
            {details.mainText}
          </p>
          {details.bulletPoints && (
            <ul className="list-disc list-inside space-y-0.5 text-xs">
              {details.bulletPoints.map((point, index) => (
                <li key={index} className="text-white/80">{point}</li>
              ))}
            </ul>
          )}
          {details.brands && (
            <p className="text-xs text-white/80 pt-2 border-t border-white/10">
              {details.brands}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;