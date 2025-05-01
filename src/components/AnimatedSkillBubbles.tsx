
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

// Reduced to 8 skills
const skillsList = [
  "HTML5", "CSS3", "JavaScript", 
  "React", "TypeScript", "Tailwind", 
  "Firebase", "REST API"
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
    
    // Create bubbles - limited to 8 skills
    const initialBubbles = skillsList.map((skill, index) => ({
      id: index,
      name: skill,
      size: Math.random() * 30 + 50, // Slightly larger bubbles (50-80px)
      x: Math.random() * (dimensions.width || 500),
      y: Math.random() * (dimensions.height || 400),
      vx: (Math.random() - 0.5) * 1.2, // Slightly slower movement
      vy: (Math.random() - 0.5) * 1.2,
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
      className="relative h-[400px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/20 to-purple-800/20 backdrop-blur-sm"
    >
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`absolute flex items-center justify-center rounded-full 
                    text-sm font-semibold transition-transform hover:scale-110
                    cursor-pointer border hover:shadow-lg hover:shadow-purple-500/20
                    bg-gradient-to-br from-blue-800/40 to-purple-800/40 backdrop-blur-sm
                    border-blue-500/30 text-white`}
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
