
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
import FloatingCodeSnippet from "@/components/FloatingCodeSnippet";
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
    <div className="min-h-screen bg-black text-white font-sans">
      <FooterCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      
      {/* Enhanced background grid with improved design */}
      <div 
        ref={gridRef}
        className="fixed inset-0 -z-10 opacity-5 pointer-events-none"
        style={{ 
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.17, 0.55, 0.55, 1)'
        }}
      >
        <div className="grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)] h-full w-full">
          {Array.from({ length: 1600 }).map((_, i) => (
            <div key={i} className="border border-purple-500/10"></div>
          ))}
        </div>
      </div>
      
      {/* Enhanced background gradient with vibrant frontend developer colors */}
      <div 
        className="fixed inset-0 -z-20 opacity-30"
        style={{
          background: `linear-gradient(${gradientRotation}, 
            rgba(124, 58, 237, 0.8),  
            rgba(59, 130, 246, 0.8), 
            rgba(99, 102, 241, 0.8),
            rgba(217, 70, 239, 0.8))`,
          transform: `rotate(${scrollY * 0.02}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
      
      {/* Interactive elements with improved positioning */}
      <AnimatedSvgElements />
      <ScrollTriggeredElement position="left" offset={0} />
      <ScrollTriggeredElement position="right" offset={1} />
      <ScrollTriggeredElement position="left" offset={2} />
      <ScrollTriggeredElement position="right" offset={3} />
      <FloatingCodeSnippet />
      
      {/* Reduced background particles with enhanced quality */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-cyan-400/60 blur-sm animate-float"></div>
        <div className="absolute top-1/2 left-1/5 w-4 h-4 rounded-full bg-purple-400/50 blur-sm animate-float" style={{animationDelay: "1.5s"}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-amber-400/70 blur-sm animate-float" style={{animationDelay: "2.2s"}}></div>
        
        {/* Code symbol particles with improved visual appearance */}
        <div className="absolute top-2/3 right-1/5 text-indigo-400/60 animate-float text-2xl font-code" style={{animationDelay: "1.1s"}}>&lt;/&gt;</div>
        <div className="absolute top-1/5 right-1/3 text-orange-400/50 animate-float text-2xl font-bold" style={{animationDelay: "2.4s"}}>&#123; &#125;</div>
        <div className="absolute bottom-2/5 left-1/3 text-teal-400/60 animate-float text-xl font-code" style={{animationDelay: "0.9s"}}>&lt;div&gt;</div>
      </div>
      
      {/* Enhanced dynamic radial gradient */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(124, 58, 237, 0.5), 
            rgba(59, 130, 246, 0.3), 
            transparent)`,
        }}
      ></div>
    </div>
  );
};

export default Index;
