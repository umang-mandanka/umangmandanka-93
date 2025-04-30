
import { useEffect, useRef, useState } from "react";
import { Code, Layers, Move3d, FileCode } from "lucide-react";

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
      <Code size={24} className="text-primary" />,
      <Layers size={24} className="text-primary" />,
      <Move3d size={24} className="text-primary" />,
      <FileCode size={24} className="text-primary" />
    ];
    return icons[Math.floor(offset % icons.length)];
  };
  
  const translateX = position === "left" 
    ? -100 + scrollProgress * 100
    : 100 - scrollProgress * 100;
    
  return (
    <div 
      ref={elementRef}
      className={`fixed ${position === "left" ? "left-8" : "right-8"} select-none
                 pointer-events-none z-10 py-4 px-6 rounded-lg
                 bg-card/30 backdrop-blur-sm border border-primary/10
                 shadow-lg`}
      style={{ 
        top: `${20 + offset * 10}%`,
        opacity: isVisible ? scrollProgress : 0,
        transform: `translateX(${translateX}%) scale(${0.5 + scrollProgress * 0.5})`,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
      }}
    >
      <div className="flex items-center gap-2">
        {getIcon()}
        <div className="font-mono text-xs">
          <div className="text-primary font-semibold">{'<'}{position === "left" ? "code" : "style"}{'>'}</div>
          <div className="text-muted-foreground">frontend dev</div>
          <div className="text-primary font-semibold">{'</'}{position === "left" ? "code" : "style"}{'>'}</div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTriggeredElement;
