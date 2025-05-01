
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Code, Laptop, Braces, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [text, setText] = useState("");
  const fullText = "Frontend Developer";
  const [index, setIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const codeFlowRef = useRef<HTMLDivElement>(null);
  
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

  // Mouse move effect for subtle parallax
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
        gridRef.current.style.transform = `perspective(1000px) rotateX(${gridY * 3}deg) rotateY(${-gridX * 3}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (codeFlowRef.current) {
        const scrollY = window.scrollY;
        codeFlowRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating code elements that simulate developer environment
  const codeElements = [
    { icon: <Code size={16} />, label: "html", color: "text-orange-400", delay: 0 },
    { icon: <Braces size={16} />, label: "css", color: "text-blue-400", delay: 1 },
    { icon: <LayoutGrid size={16} />, label: "react", color: "text-cyan-400", delay: 2 },
    { icon: <Laptop size={16} />, label: "js", color: "text-yellow-400", delay: 3 },
  ];

  return (
    <section id="home" ref={heroRef} className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-black font-display">
      {/* Code flow background - continuous scrolling code that resembles development */}
      <div 
        ref={codeFlowRef}
        className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden z-0"
      >
        <div className="animate-code-flow whitespace-nowrap">
          {Array.from({length: 20}).map((_, rowIndex) => (
            <div key={rowIndex} className="font-code text-xs leading-loose pl-4" style={{
              opacity: 0.3 + Math.random() * 0.7,
              color: `hsl(${(rowIndex * 20) % 360}, 70%, 70%)`
            }}>
              {`import { useState, useEffect } from 'react';`} <br/>
              {`const Component = () => {`} <br/>
              {`  const [state, setState] = useState(null);`} <br/>
              {`  useEffect(() => {`} <br/>
              {`    // Frontend code implementation`} <br/>
              {`    fetch('/api/data').then(res => res.json());`} <br/>
              {`  }, []);`} <br/>
              {`  return <div className="flex items-center">Content</div>;`} <br/>
              {`};`} <br/>
            </div>
          ))}
        </div>
      </div>
      
      {/* Grid Background with improved design */}
      <div 
        ref={gridRef}
        className="absolute inset-0 z-0"
        style={{ perspective: '1000px' }}
      >
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i}
              className="border border-purple-500/10 transition-all"
              style={{
                transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1)',
                backdropFilter: 'blur(1px)',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Interactive code elements floating around */}
      <div className="absolute inset-0 pointer-events-none">
        {codeElements.map((el, i) => (
          <div 
            key={i}
            className="absolute bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2"
            style={{
              top: `${30 + (i * 15)}%`,
              left: `${65 + (Math.sin(i) * 15)}%`,
              transform: `translateY(${Math.sin(i * 0.5) * 10}px)`,
              animation: `float ${3 + i}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <span className={el.color}>{el.icon}</span>
            <span className="font-code text-sm text-gray-300">{el.label}</span>
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl" style={{ 
          transform: `rotateY(${mousePosition.x * 0.3}deg) rotateX(${-mousePosition.y * 0.3}deg)`,
          transition: 'transform 0.1s ease-out'
        }}>
          <span className="inline-block mb-3 px-4 py-1 text-sm font-code bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full text-blue-300 border border-blue-500/20">Welcome to my Portfolio</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-white">
            Hello, I'm <span className="relative inline-block">
              <span className="animate-text-shimmer bg-clip-text text-transparent bg-[length:200%] bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-400">
                Umang Mandnaka
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-400/20 blur-xl opacity-20"></span>
            </span>
          </h1>
          <h2 className="text-2xl md:text-4xl mb-6 flex text-gray-300 items-center font-code">
            <span className="mr-2 text-gray-400">&lt;</span> 
            <span className="text-blue-400 border-r-2 border-blue-400 pr-1">{text}</span>
            <span className="ml-1 text-gray-400">/&gt;</span>
          </h2>
          
          {/* Code snippets that appear like commands being typed */}
          <div className="mb-8 bg-black/40 backdrop-blur-md border border-gray-700/30 p-4 rounded-lg font-code text-sm overflow-hidden max-w-md">
            <div className="flex items-center gap-2 mb-2 text-gray-400">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="ml-2 text-xs">terminal</span>
            </div>
            <div className="text-gray-300">
              <div><span className="text-green-400">$</span> <span className="text-blue-300">npm</span> create next-app portfolio</div>
              <div><span className="text-green-400">$</span> <span className="text-blue-300">cd</span> portfolio</div>
              <div><span className="text-green-400">$</span> <span className="text-blue-300">npm</span> install tailwindcss</div>
              <div className="text-purple-400">// Building interfaces that users love...</div>
              <div className="animate-pulse">&nbsp;_</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 group relative overflow-hidden font-code">
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" asChild className="text-gray-300 border-gray-700 hover:bg-gray-800/50 group relative overflow-hidden font-code">
              <a href="#contact">
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </a>
            </Button>
          </div>
          
          <div className="mt-12 flex gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-full hover:scale-110 hover:rotate-6 transition-all duration-300 text-blue-400 border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-full hover:scale-110 hover:rotate-6 transition-all duration-300 text-blue-400 border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="mailto:hello@example.com" target="_blank" rel="noopener noreferrer" 
               className="bg-gray-800/80 backdrop-blur-sm p-3 rounded-full hover:scale-110 hover:rotate-6 transition-all duration-300 text-blue-400 border border-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-blue-400 transition-colors font-code">
          <span className="text-sm mb-2">$ cd about</span>
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
