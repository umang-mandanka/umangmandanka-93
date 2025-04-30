
import { useEffect, useState } from "react";

interface SvgShape {
  id: number;
  x: number;
  y: number;
  type: "circle" | "square" | "triangle" | "hexagon";
  size: number;
  color: string;
  speed: number;
  direction: number;
  rotation: number;
}

const AnimatedSvgElements = () => {
  const [shapes, setShapes] = useState<SvgShape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Generate random shapes
  useEffect(() => {
    const generatedShapes: SvgShape[] = [];
    const shapeTypes = ["circle", "square", "triangle", "hexagon"] as const;
    const colors = ["primary", "secondary", "accent"];
    
    for (let i = 0; i < 8; i++) {
      generatedShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        size: Math.random() * 30 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() > 0.5 ? 1 : -1,
        rotation: Math.random() * 360
      });
    }
    setShapes(generatedShapes);
  }, []);
  
  // Move shapes around
  useEffect(() => {
    const moveShapes = () => {
      setShapes(prevShapes => 
        prevShapes.map(shape => {
          let newX = shape.x + shape.speed * shape.direction;
          if (newX > 100) newX = 0;
          if (newX < 0) newX = 100;
          
          return {
            ...shape,
            x: newX,
            rotation: (shape.rotation + shape.speed) % 360
          };
        })
      );
    };
    
    const interval = setInterval(moveShapes, 50);
    return () => clearInterval(interval);
  }, []);
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Render shape based on type
  const renderShape = (shape: SvgShape) => {
    const baseClassName = `fill-${shape.color}/20 stroke-${shape.color}/60 stroke-[1.5]`;
    
    switch(shape.type) {
      case "circle":
        return <circle 
          cx={shape.size / 2} 
          cy={shape.size / 2} 
          r={shape.size / 2 - 2} 
          className={baseClassName}
        />;
      case "square":
        return <rect 
          width={shape.size} 
          height={shape.size} 
          className={baseClassName}
        />;
      case "triangle":
        const points = `${shape.size/2},0 ${shape.size},${shape.size} 0,${shape.size}`;
        return <polygon 
          points={points}
          className={baseClassName}
        />;
      case "hexagon":
        const side = shape.size / 2;
        const hexPoints = Array.from({ length: 6 }, (_, i) => {
          const angle = i * Math.PI / 3;
          const x = side * Math.cos(angle) + shape.size / 2;
          const y = side * Math.sin(angle) + shape.size / 2;
          return `${x},${y}`;
        }).join(' ');
        
        return <polygon 
          points={hexPoints} 
          className={baseClassName}
        />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg width="100%" height="100%">
        {shapes.map(shape => {
          // Add subtle interaction with mouse position
          const mouseInfluence = {
            x: (mousePosition.x - shape.x) * 0.02,
            y: (mousePosition.y - shape.y) * 0.02
          };
          
          return (
            <g 
              key={shape.id}
              style={{
                transform: `translate(${shape.x - mouseInfluence.x}%, ${shape.y - mouseInfluence.y}%) rotate(${shape.rotation}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              {renderShape(shape)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AnimatedSvgElements;
