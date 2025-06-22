
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
                 hover:scale-105 hover:border-white/20`}
      style={{ 
        animationDelay: `${index * 100}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4 h-full">
        {/* Background gradient that appears on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        <div className="relative z-10">
          {/* Icon */}
          <div className="mb-3 transform transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          
          {/* Title */}
          <h4 className="text-white font-display text-sm font-semibold mb-2">
            {title}
          </h4>
          
          {/* Description - appears on hover */}
          <div className={`transition-all duration-300 overflow-hidden ${
            isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <p className="text-gray-400 text-xs leading-relaxed">
              {description}
            </p>
          </div>
          
          {/* Subtle indicator when not hovered */}
          {!isHovered && (
            <div className="text-gray-500 text-xs">
              Hover to learn more
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalityCard;
