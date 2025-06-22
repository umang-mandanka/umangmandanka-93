
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TechStackCardProps {
  name: string;
  icon: string;
  yearsExperience: number;
  projectCount: number;
  description: string;
  category: string;
  primaryColor: string;
  index: number;
}

const TechStackCard = ({
  name,
  icon,
  yearsExperience,
  projectCount,
  description,
  category,
  primaryColor,
  index
}: TechStackCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-500 hover:scale-105 cursor-pointer
                 bg-gradient-to-br from-card/80 to-card/40 border border-white/10 backdrop-blur-lg
                 hover:shadow-2xl hover:shadow-primary/20`}
      style={{ 
        animationDelay: `${index * 150}ms`,
        borderColor: isHovered ? primaryColor : undefined
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 h-full flex flex-col">
        {/* Tech Icon with Glow Effect */}
        <div className="relative mb-4 mx-auto">
          <div 
            className={`absolute inset-0 rounded-full blur-lg transition-all duration-300 ${
              isHovered ? 'opacity-60 scale-110' : 'opacity-20'
            }`}
            style={{ backgroundColor: primaryColor }}
          />
          <div className="relative w-16 h-16 flex items-center justify-center">
            <img 
              src={icon} 
              alt={name} 
              className="w-12 h-12 object-contain filter drop-shadow-lg transition-transform duration-300 group-hover:scale-110" 
            />
          </div>
        </div>

        {/* Tech Name */}
        <h3 className="text-lg font-display font-bold text-center mb-3 text-foreground">
          {name}
        </h3>

        {/* Experience Stats */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-xl" style={{ color: primaryColor }}>
              {yearsExperience}
            </div>
            <div className="text-muted-foreground font-medium">Years</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl" style={{ color: primaryColor }}>
              {projectCount}+
            </div>
            <div className="text-muted-foreground font-medium">Projects</div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
            style={{ 
              backgroundColor: `${primaryColor}20`,
              color: primaryColor,
              border: `1px solid ${primaryColor}40`
            }}
          >
            {category}
          </span>
        </div>

        {/* Description - Expands on Hover */}
        <div className={`transition-all duration-300 overflow-hidden ${
          isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <p className="text-sm text-muted-foreground leading-relaxed mt-2 border-t border-white/10 pt-3">
            {description}
          </p>
        </div>

        {/* Experience Bar */}
        <div className="mt-auto pt-4">
          <div className="w-full bg-secondary/30 rounded-full h-2 overflow-hidden">
            <div 
              className="h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${Math.min((yearsExperience / 6) * 100, 100)}%`,
                backgroundColor: primaryColor,
                boxShadow: `0 0 10px ${primaryColor}60`
              }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-center">
            Experience Level
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechStackCard;
