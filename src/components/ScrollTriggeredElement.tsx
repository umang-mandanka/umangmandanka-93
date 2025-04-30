
import { useEffect, useRef, useState } from "react";
import { Code, Layers, Move3d, FileCode, Monitor, Palette, Brush, Component } from "lucide-react";

interface ScrollElementProps {
  position: "left" | "right";
  offset: number;
}

const ScrollTriggeredElement = ({ position, offset }: ScrollElementProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      
      const rect = elementRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      
      if (isInView) {
        setIsVisible(true);
        
        // Calculate scroll progress (0 to 1) for this element
        const scrollStart = window.innerHeight;
        const scrollEnd = 0;
        const current = rect.top;
        const progress = 1 - (current - scrollEnd) / (scrollStart - scrollEnd);
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
      } else if (rect.top > window.innerHeight) {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getIcon = () => {
    const icons = [
      <Code size={24} className="text-cyan-400" />,
      <Layers size={24} className="text-purple-400" />,
      <Move3d size={24} className="text-amber-400" />,
      <FileCode size={24} className="text-emerald-400" />,
      <Monitor size={24} className="text-rose-400" />,
      <Palette size={24} className="text-indigo-400" />,
      <Brush size={24} className="text-orange-400" />,
      <Component size={24} className="text-teal-400" />
    ];
    return icons[Math.floor(offset % icons.length)];
  };
  
  // Choose a color based on offset
  const getBgColor = () => {
    const colors = [
      "from-purple-500/30 to-blue-500/30",
      "from-cyan-500/30 to-emerald-500/30",
      "from-amber-500/30 to-orange-500/30",
      "from-rose-500/30 to-pink-500/30",
      "from-indigo-500/30 to-violet-500/30",
    ];
    return colors[Math.floor(offset % colors.length)];
  };
  
  const translateX = position === "left" 
    ? -100 + scrollProgress * 100
    : 100 - scrollProgress * 100;
    
  return (
    <div 
      ref={elementRef}
      className={`fixed ${position === "left" ? "left-8" : "right-8"} select-none
                 pointer-events-none z-10 py-4 px-6 rounded-lg
                 bg-gradient-to-br ${getBgColor()} backdrop-blur-sm border border-primary/20
                 shadow-lg`}
      style={{ 
        top: `${20 + offset * 10}%`,
        opacity: isVisible ? scrollProgress : 0,
        transform: `translateX(${translateX}%) scale(${0.5 + scrollProgress * 0.5}) rotate(${position === "left" ? -2 : 2}deg)`,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
      }}
    >
      <div className="flex items-center gap-2">
        {getIcon()}
        <div className="font-mono text-xs">
          <div className="font-semibold" style={{color: `hsl(${(offset * 40) % 360}, 80%, 70%)`}}>{'<'}{position === "left" ? "code" : "design"}{'>'}</div>
          <div className="text-muted-foreground">frontend dev</div>
          <div className="font-semibold" style={{color: `hsl(${(offset * 40) % 360}, 80%, 70%)`}}>{'</'}{position === "left" ? "code" : "design"}{'>'}</div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTriggeredElement;
