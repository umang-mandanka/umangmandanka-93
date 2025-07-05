
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface PersonalityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}

const PersonalityCard = ({ icon, title, description, color, index }: PersonalityCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-500 cursor-pointer
                 bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-white/10 
                 hover:scale-105 hover:border-white/20 min-h-[120px]`}
      style={{ 
        animationDelay: `${index * 100}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 h-full flex flex-col">
        {/* Background gradient that appears on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon and Title - always visible and aligned */}
          <div className="flex items-center gap-3 mb-2">
            <div className="transform transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
              {icon}
            </div>
            <h4 className="text-white font-display text-sm font-semibold leading-tight">
              {title}
            </h4>
          </div>
          
          {/* Description - appears on hover with smooth transition */}
          <div className={`transition-all duration-500 overflow-hidden flex-1 ${
            isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-gray-300 text-xs leading-relaxed pt-1">
              {description}
            </p>
          </div>
          
          {/* Subtle indicator when not hovered - positioned at bottom */}
          <div className={`transition-all duration-300 mt-auto ${
            isHovered ? 'opacity-0 max-h-0' : 'opacity-100 max-h-6'
          }`}>
            <div className="text-gray-500 text-xs">
              Hover to learn more
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalityCard;
