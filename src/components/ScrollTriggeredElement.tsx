
import { useEffect, useRef, useState } from "react";
import { Code, Layers, Move3d, FileCode, Monitor, Palette, Brush, Component, TerminalSquare, GitBranch, Figma, Cpu, Globe } from "lucide-react";

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
      <Component size={24} className="text-teal-400" />,
      <TerminalSquare size={24} className="text-green-400" />,
      <GitBranch size={24} className="text-blue-400" />,
      <Figma size={24} className="text-pink-400" />,
      <Cpu size={24} className="text-yellow-400" />,
      <Globe size={24} className="text-violet-400" />,
    ];
    return icons[Math.floor(offset % icons.length)];
  };
  
  // Choose a color based on offset
  const getBgGradient = () => {
    const gradients = [
      "from-purple-700/40 to-blue-600/40",
      "from-cyan-700/40 to-emerald-600/40",
      "from-amber-700/40 to-orange-600/40",
      "from-rose-700/40 to-pink-600/40",
      "from-indigo-700/40 to-violet-600/40",
    ];
    return gradients[Math.floor(offset % gradients.length)];
  };
  
  const translateX = position === "left" 
    ? -100 + scrollProgress * 100
    : 100 - scrollProgress * 100;
    
  // Add tilt effect based on scroll progress
  const tiltRotation = position === "left" 
    ? -5 + scrollProgress * 8
    : 5 - scrollProgress * 8;
    
  // Additional hover effect state
  const [isHovered, setIsHovered] = useState(false);
  
  // Get frontend dev title based on position and offset
  const getDevTitle = () => {
    if (position === "left") {
      const titles = ["React", "Vue", "Angular", "Svelte", "Next.js"];
      return titles[offset % titles.length];
    } else {
      const titles = ["CSS/SCSS", "Tailwind", "UI/UX", "Animation", "Responsive"];
      return titles[offset % titles.length];
    }
  };

  const codeSnippets = [
    "const [state, setState] = useState(null);",
    "useEffect(() => { /* ... */ }, []);",
    "export default function Component() { }",
    "<div className='flex items-center'></div>",
    "@keyframes fadeIn { from {opacity:0} to {opacity:1} }"
  ];
  
  const getCodeSnippet = () => {
    return codeSnippets[offset % codeSnippets.length];
  };
  
  return (
    <div 
      ref={elementRef}
      className={`fixed ${position === "left" ? "left-8" : "right-8"} select-none
                 pointer-events-auto z-10 py-5 px-6 rounded-xl
                 bg-gradient-to-br ${getBgGradient()} backdrop-blur-md border border-white/20
                 shadow-lg hover:shadow-2xl transition-shadow font-code`}
      style={{ 
        top: `${20 + offset * 10}%`,
        opacity: isVisible ? scrollProgress : 0,
        transform: `translateX(${translateX}%) scale(${0.6 + scrollProgress * 0.4}) rotate(${isHovered ? tiltRotation * 2 : tiltRotation}deg)`,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out, box-shadow 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div className="text-xs">
            <div className="font-semibold" style={{color: `hsl(${(offset * 40) % 360}, 90%, 75%)`}}>
              {'<'}{getDevTitle()}{'>'}
            </div>
            <div className="text-gray-300 opacity-80 text-[10px]">{getCodeSnippet()}</div>
          </div>
        </div>
        
        {/* Code snippet underneath */}
        <div className="text-[10px] bg-black/30 rounded-md p-1.5 text-gray-300 overflow-hidden">
          <div className="flex items-center gap-1">
            <span className="text-purple-400">const</span> 
            <span className="text-blue-300">handle{position === "left" ? "Code" : "Design"}</span> 
            <span className="text-white">= () </span>
            <span className="text-purple-400">{'=>'}</span> 
            <span className="text-white">&#123;</span>
          </div>
          <div className="ml-2 text-green-300">// Frontend {position === "left" ? "logic" : "styling"}</div>
          <div className="text-white">&#125;;</div>
        </div>
      </div>
      
      {/* Enhanced pulsing effect when hovered */}
      {isHovered && (
        <>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent rounded-xl animate-pulse-glow"></div>
          <div className="absolute -bottom-1 -right-1 bg-white/20 w-2 h-2 rounded-full animate-ping"></div>
        </>
      )}
    </div>
  );
};

export default ScrollTriggeredElement;
