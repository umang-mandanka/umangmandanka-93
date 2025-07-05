import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectSection from "@/components/ProjectSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import FooterCursor from "@/components/FooterCursor";
import AnimatedSvgElements from "@/components/AnimatedSvgElements";
import ScrollTriggeredElement from "@/components/ScrollTriggeredElement";
import { useEffect, useState, useRef } from "react";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // Smooth scrolling effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Initialize mousemove effect with enhanced parallax
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Enhanced parallax for elements with parallax class
      document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = (layer as HTMLElement).dataset.speed || '0.1';
        const x = (window.innerWidth - e.pageX * parseFloat(speed)) / 100;
        const y = (window.innerHeight - e.pageY * parseFloat(speed)) / 100;
        (layer as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
      
      // Improved grid effect for background
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const moveX = x * 0.01;
        const moveY = y * 0.01;
        gridRef.current.style.transform = `perspective(1000px) rotateX(${moveY}deg) rotateY(${-moveX}deg)`;
      }
    };

    // Track scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Add drag functionality for whole page
    const handleMouseDown = () => {
      setIsDragging(true);
      document.body.style.cursor = 'grabbing';
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'auto';
    };
    
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Calculate gradient rotation based on mouse position
  const gradientRotation = `${(mousePosition.x / window.innerWidth) * 360}deg`;

  return (
    <div className="min-h-screen bg-black text-white font-code">
      <FooterCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      
      {/* Enhanced background grid with improved design - lower opacity */}
      <div 
        ref={gridRef}
        className="fixed inset-0 -z-10 opacity-3 pointer-events-none"
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1)'
        }}
      >
        <div className="grid grid-cols-[repeat(30,1fr)] grid-rows-[repeat(30,1fr)] h-full w-full">
          {Array.from({ length: 900 }).map((_, i) => (
            <div key={i} className="border border-blue-500/5 grid-cell"></div>
          ))}
        </div>
      </div>
      
      {/* Enhanced background gradient with vibrant frontend developer colors - lower opacity */}
      <div 
        className="fixed inset-0 -z-20 opacity-15"
        style={{
          background: `linear-gradient(${gradientRotation}, 
            rgba(59, 130, 246, 0.5),  
            rgba(139, 92, 246, 0.5), 
            rgba(96, 165, 250, 0.5),
            rgba(147, 51, 234, 0.5))`,
          transform: `rotate(${scrollY * 0.02}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
      
      {/* Reduced floating elements with only 2 elements per side */}
      <AnimatedSvgElements />
      <ScrollTriggeredElement position="left" offset={0} />
      <ScrollTriggeredElement position="right" offset={1} />
      
      {/* Only a few background code particles - removed React/Tailwind references */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-cyan-400/40 blur-sm animate-floating"></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-amber-400/40 blur-sm animate-floating" style={{animationDelay: "2.2s"}}></div>
        
        {/* Just a couple generic code symbols */}
        <div className="absolute top-2/3 right-1/5 text-blue-400/40 animate-floating text-2xl font-code" style={{animationDelay: "1.1s"}}>&lt;/&gt;</div>
        <div className="absolute bottom-2/5 left-1/3 text-purple-400/40 animate-floating text-xl font-code" style={{animationDelay: "0.9s"}}>{'{ }'}</div>
      </div>
      
      {/* Reduced dynamic radial gradient */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(59, 130, 246, 0.3), 
            rgba(139, 92, 246, 0.2), 
            transparent)`,
        }}
      ></div>
    </div>
  );
};

export default Index;
