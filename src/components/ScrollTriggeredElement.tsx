
import { useEffect, useRef, useState } from "react";
import { Code, Layers, Move3d, FileCode, Monitor, Palette, Brush, Component, TerminalSquare, GitBranch, Figma, Cpu, Globe } from "lucide-react";

interface ScrollElementProps {
  position: "left" | "right";
  offset: number;
}

const ScrollTriggeredElement = ({
  position,
  offset
}: ScrollElementProps) => {
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
    handleScroll();
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
      <Globe size={24} className="text-violet-400" />
    ];
    return icons[Math.floor(offset % icons.length)];
  };

  const getBgGradient = () => {
    const gradients = [
      "from-purple-700/40 to-blue-600/40", 
      "from-cyan-700/40 to-emerald-600/40", 
      "from-amber-700/40 to-orange-600/40", 
      "from-rose-700/40 to-pink-600/40", 
      "from-indigo-700/40 to-violet-600/40"
    ];
    return gradients[Math.floor(offset % gradients.length)];
  };

  const translateX = position === "left" ? -100 + scrollProgress * 100 : 100 - scrollProgress * 100;
  const tiltRotation = position === "left" ? -5 + scrollProgress * 8 : 5 - scrollProgress * 8;

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

  if (!isVisible) return null;

  return (
    <div className={`bg-gradient-to-br ${getBgGradient()} backdrop-blur-lg p-4 rounded-xl border border-white/10 max-w-xs hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center gap-3 mb-2">
        {getIcon()}
        <span className="text-white font-code text-sm font-semibold">{getDevTitle()}</span>
      </div>
      <div className="text-xs text-gray-300 font-code bg-black/20 p-2 rounded">
        {getCodeSnippet()}
      </div>
    </div>
  );
};

export default ScrollTriggeredElement;
