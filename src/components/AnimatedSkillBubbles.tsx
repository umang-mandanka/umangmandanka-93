
import { useEffect, useState, useRef } from "react";

interface SkillBubble {
  id: number;
  name: string;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
}

const skillsList = [
  "HTML5", "CSS3", "JavaScript", "TypeScript", 
  "React", "Angular", "Tailwind", "Bootstrap",
  "Firebase", "REST API", "Git", "Figma",
  "UI/UX", "Responsive", "Animation", "Performance",
  "Accessibility", "SEO", "VSCode", "npm"
];

const colors = [
  "primary", "secondary", "accent", "muted"
];

const AnimatedSkillBubbles = () => {
  const [bubbles, setBubbles] = useState<SkillBubble[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  
  // Initialize bubbles
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    // Initial dimensions
    updateDimensions();
    
    // Create bubbles
    const initialBubbles = skillsList.map((skill, index) => ({
      id: index,
      name: skill,
      size: Math.random() * 30 + 40, // Random size between 40-70px
      x: Math.random() * (dimensions.width || 500),
      y: Math.random() * (dimensions.height || 400),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      color: colors[index % colors.length]
    }));
    
    setBubbles(initialBubbles);
    
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    
    const animate = () => {
      setBubbles(prevBubbles => 
        prevBubbles.map(bubble => {
          // Update position
          let newX = bubble.x + bubble.vx;
          let newY = bubble.y + bubble.vy;
          let newVx = bubble.vx;
          let newVy = bubble.vy;
          
          // Bounce off walls
          if (newX < 0 || newX > dimensions.width - bubble.size) {
            newVx = -bubble.vx;
            newX = newX < 0 ? 0 : dimensions.width - bubble.size;
          }
          
          if (newY < 0 || newY > dimensions.height - bubble.size) {
            newVy = -bubble.vy;
            newY = newY < 0 ? 0 : dimensions.height - bubble.size;
          }
          
          return {
            ...bubble,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);
  
  return (
    <div 
      ref={containerRef}
      className="relative h-[400px] w-full overflow-hidden rounded-lg bg-muted/20 backdrop-blur-sm"
    >
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`absolute flex items-center justify-center rounded-full 
                    text-xs font-semibold transition-transform hover:scale-110
                    cursor-pointer border bg-${bubble.color}/10 border-${bubble.color}/40 text-foreground`}
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            transform: `translate(${bubble.x}px, ${bubble.y}px)`,
            transition: 'transform 0.1s linear',
            fontSize: `${0.8 + bubble.size / 80}rem`
          }}
        >
          {bubble.name}
        </div>
      ))}
    </div>
  );
};

export default AnimatedSkillBubbles;
