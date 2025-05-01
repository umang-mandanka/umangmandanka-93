
import { useEffect, useState } from "react";

interface SvgShape {
  id: number;
  x: number;
  y: number;
  type: "circle" | "square" | "triangle" | "hexagon" | "code" | "bracket" | "curlyBrace" | "tag" | "react" | "javascript" | "css" | "html";
  size: number;
  color: string;
  speed: number;
  direction: number;
  rotation: number;
}

const AnimatedSvgElements = () => {
  const [shapes, setShapes] = useState<SvgShape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Generate random shapes - reduced count from 12 to 8
  useEffect(() => {
    const generatedShapes: SvgShape[] = [];
    const shapeTypes = [
      "circle", "square", "triangle", "hexagon", "code", "bracket", "curlyBrace", "tag", 
      "react", "javascript", "css", "html"
    ] as const;
    
    // Color palette for frontend dev theme
    const colors = [
      "text-blue-500", "text-purple-500", "text-cyan-500", "text-emerald-500", 
      "text-amber-500", "text-rose-500", "text-indigo-500", "text-orange-500"
    ];
    
    for (let i = 0; i < 8; i++) {
      generatedShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        size: Math.random() * 30 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.3 + 0.1, // Slower speed
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
    const baseClassName = `${shape.color}/30 stroke-${shape.color.replace('text-', '')}/60 stroke-[1.5]`;
    
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
      case "code":
        return (
          <g className={baseClassName}>
            <text x={0} y={shape.size/2} fontSize={shape.size-5} fontFamily="monospace">&lt;/&gt;</text>
          </g>
        );
      case "bracket":
        return (
          <g className={baseClassName}>
            <text x={2} y={shape.size/1.5} fontSize={shape.size-2} fontFamily="monospace">[ ]</text>
          </g>
        );
      case "curlyBrace":
        return (
          <g className={baseClassName}>
            <text x={2} y={shape.size/1.5} fontSize={shape.size-2} fontFamily="monospace">{ }</text>
          </g>
        );
      case "tag":
        return (
          <g className={baseClassName}>
            <text x={0} y={shape.size/1.5} fontSize={shape.size-8} fontFamily="monospace">&lt;div&gt;</text>
          </g>
        );
      case "react":
        // Simple React logo
        return (
          <g className={baseClassName}>
            <circle cx={shape.size/2} cy={shape.size/2} r={shape.size/6} />
            <ellipse cx={shape.size/2} cy={shape.size/2} rx={shape.size/2.2} ry={shape.size/6} />
            <ellipse cx={shape.size/2} cy={shape.size/2} rx={shape.size/2.2} ry={shape.size/6} transform={`rotate(60 ${shape.size/2} ${shape.size/2})`} />
            <ellipse cx={shape.size/2} cy={shape.size/2} rx={shape.size/2.2} ry={shape.size/6} transform={`rotate(120 ${shape.size/2} ${shape.size/2})`} />
          </g>
        );
      case "javascript":
        return (
          <g className={baseClassName}>
            <rect x={0} y={0} width={shape.size} height={shape.size} rx={2} />
            <text x={shape.size/6} y={shape.size/1.5} fontSize={shape.size/2} fontFamily="monospace">JS</text>
          </g>
        );
      case "css":
        return (
          <g className={baseClassName}>
            <path d={`M0,0 L${shape.size},0 L${shape.size*0.9},${shape.size} L${shape.size*0.1},${shape.size} Z`} />
            <text x={shape.size/5} y={shape.size/2} fontSize={shape.size/3} fontFamily="monospace">CSS</text>
          </g>
        );
      case "html":
        return (
          <g className={baseClassName}>
            <text x={0} y={shape.size/1.5} fontSize={shape.size/2.5} fontFamily="monospace">HTML</text>
          </g>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <svg width="100%" height="100%">
        <defs>
          <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(255,0,0)" />
            <stop offset="16%" stopColor="rgb(255,127,0)" />
            <stop offset="33%" stopColor="rgb(255,255,0)" />
            <stop offset="50%" stopColor="rgb(0,255,0)" />
            <stop offset="66%" stopColor="rgb(0,0,255)" />
            <stop offset="83%" stopColor="rgb(127,0,255)" />
            <stop offset="100%" stopColor="rgb(255,0,255)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {shapes.map(shape => {
          // Add subtle interaction with mouse position
          const mouseInfluence = {
            x: (mousePosition.x - shape.x) * 0.02,
            y: (mousePosition.y - shape.y) * 0.02
          };
          
          const glowEffect = shape.id % 3 === 0 ? {filter: "url(#glow)"} : {};
          const rainbowEffect = shape.id % 5 === 0 ? {filter: "url(#rainbow)"} : {};
          
          return (
            <g 
              key={shape.id}
              style={{
                transform: `translate(${shape.x - mouseInfluence.x}%, ${shape.y - mouseInfluence.y}%) rotate(${shape.rotation}deg)`,
                transition: 'transform 0.3s ease-out',
                ...glowEffect,
                ...rainbowEffect
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
