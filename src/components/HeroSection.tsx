
import { useState, useEffect, useRef } from "react";
import { ArrowRight, MousePointer } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [text, setText] = useState("");
  const fullText = "Frontend Developer";
  const [index, setIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
  const [spherePosition, setSpherePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  // Text typing animation
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [index]);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 25;
      const y = (e.clientY - top - height / 2) / 25;
      
      setMousePosition({ x, y });
      
      // Update grid perspective based on mouse position
      if (gridRef.current) {
        const gridX = (e.clientX - left) / width - 0.5;
        const gridY = (e.clientY - top) / height - 0.5;
        gridRef.current.style.transform = `perspective(1000px) rotateX(${gridY * 5}deg) rotateY(${-gridX * 5}deg)`;
      }
      
      // Move sphere if dragging
      if (isDragging && sphereRef.current) {
        const newX = spherePosition.x + (e.clientX - startDragPos.x) * 0.1;
        const newY = spherePosition.y + (e.clientY - startDragPos.y) * 0.1;
        setSpherePosition({ x: newX, y: newY });
        setStartDragPos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, startDragPos, spherePosition]);
  
  // Drag handlers for sphere
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartDragPos({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (sphereRef.current) {
        const scrollY = window.scrollY;
        sphereRef.current.style.transform = `translate(${spherePosition.x}px, ${spherePosition.y + scrollY * 0.2}px) scale(${1 - Math.min(scrollY * 0.001, 0.3)})`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [spherePosition]);

  return (
    <section id="home" ref={heroRef} className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-black">
      {/* Grid Background */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0"
        style={{ perspective: '1000px' }}
      >
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i}
              className="border border-purple-500/10"
              style={{
                transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)',
                backdropFilter: 'blur(1px)',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Interactive Sphere */}
      <div 
        ref={sphereRef}
        className="absolute top-1/2 right-[10%] transform -translate-y-1/2 w-[400px] h-[400px] cursor-grab active:cursor-grabbing z-10"
        style={{ 
          transform: `translate(${spherePosition.x}px, ${spherePosition.y}px)`,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-400 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[350px] h-[350px]">
            {/* Particle sphere */}
            {Array.from({ length: 120 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const radius = 170 + Math.random() * 20;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const size = Math.random() * 4 + 1;
              const hue = Math.floor(Math.random() * 60) + 240; // Blue to purple
              const opacity = Math.random() * 0.8 + 0.2;
              
              return (
                <div 
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `hsla(${hue}, 80%, 70%, ${opacity})`,
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    boxShadow: `0 0 ${size * 2}px ${size/2}px hsla(${hue}, 80%, 70%, ${opacity})`,
                    animation: `float ${Math.random() * 3 + 3}s ease-in-out infinite alternate`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              );
            })}
          </div>
        </div>
        
        {/* Drag indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/50 flex flex-col items-center">
          <MousePointer className="w-6 h-6 mb-2 animate-bounce" />
          <span className="text-sm font-light">Drag Me</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl parallax" style={{ 
          transform: `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)` 
        }}>
          <span className="inline-block mb-2 px-4 py-1 text-sm bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white">Welcome to my Portfolio</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">
            Hello, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-400">Umang Mandnaka</span>
          </h1>
          <h2 className="text-2xl md:text-4xl mb-6 flex text-gray-300">
            <span className="mr-2">I build</span> 
            <span className="text-blue-400 border-r-2 border-blue-400 pr-1">{text}</span>
          </h2>
          
          <p className="text-gray-400 text-lg mb-8 max-w-lg">
            I craft responsive websites where technology meets creativity. 
            Passionate about building excellent software that improves the lives of those around me.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 group relative overflow-hidden">
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" asChild className="text-gray-300 border-gray-700 hover:bg-gray-800/50 group relative overflow-hidden">
              <a href="#contact">
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </a>
            </Button>
          </div>
          
          <div className="mt-12 flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="bg-gray-800 p-3 rounded-full hover:scale-110 hover:rotate-6 transition-all duration-300 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className="bg-gray-800 p-3 rounded-full hover:scale-110 hover:rotate-6 transition-all duration-300 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="mailto:hello@example.com" target="_blank" rel="noopener noreferrer" 
               className="bg-gray-800 p-3 rounded-full hover:scale-110 hover:rotate-6 transition-all duration-300 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition-colors">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
