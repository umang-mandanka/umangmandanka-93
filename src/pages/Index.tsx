
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
import { useEffect, useState } from "react";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

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

    // Initialize parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = (layer as HTMLElement).dataset.speed || '0.1';
        const x = (window.innerWidth - e.pageX * parseFloat(speed)) / 100;
        const y = (window.innerHeight - e.pageY * parseFloat(speed)) / 100;
        (layer as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    // Track scroll position
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate gradient rotation based on mouse position
  const gradientRotation = `${(mousePosition.x / window.innerWidth) * 360}deg`;

  return (
    <div className="min-h-screen bg-background">
      <FooterCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      
      {/* Colorful background gradient */}
      <div 
        className="fixed inset-0 -z-10 opacity-10"
        style={{
          background: `linear-gradient(${gradientRotation}, 
            rgba(153, 102, 255, 0.5), 
            rgba(76, 201, 240, 0.5), 
            rgba(114, 239, 221, 0.5), 
            rgba(247, 37, 133, 0.5))`,
          transform: `rotate(${scrollY * 0.02}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
      
      {/* Interactive elements */}
      <AnimatedSvgElements />
      <ScrollTriggeredElement position="left" offset={0} />
      <ScrollTriggeredElement position="right" offset={1} />
      <ScrollTriggeredElement position="left" offset={2} />
      <ScrollTriggeredElement position="right" offset={3} />
      <ScrollTriggeredElement position="left" offset={4} />
      <FloatingCodeSnippet />
      
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-cyan-400/30 animate-float"></div>
        <div className="absolute top-1/2 left-1/5 w-3 h-3 rounded-full bg-purple-400/20 animate-float" style={{animationDelay: "1.5s"}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-amber-400/40 animate-float" style={{animationDelay: "2.2s"}}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-emerald-400/20 animate-float" style={{animationDelay: "0.7s"}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-rose-400/30 animate-float" style={{animationDelay: "1.3s"}}></div>
        
        {/* Code symbol particles */}
        <div className="absolute top-2/3 right-1/5 text-indigo-400/30 animate-float text-lg" style={{animationDelay: "1.1s"}}>&lt;/&gt;</div>
        <div className="absolute top-1/5 right-1/3 text-orange-400/20 animate-float text-lg" style={{animationDelay: "2.4s"}}>&#123; &#125;</div>
        <div className="absolute bottom-2/5 left-1/3 text-teal-400/30 animate-float text-lg" style={{animationDelay: "0.9s"}}>&lt;div&gt;</div>
        
        {/* Color dots */}
        <div className="absolute top-3/5 right-2/5 flex gap-1 animate-float" style={{animationDelay: "1.7s"}}>
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
        </div>
      </div>
      
      {/* Dynamic radial gradient that follows cursor */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 58, 237, 0.5), transparent)`,
          mixBlendMode: 'overlay'
        }}
      ></div>
    </div>
  );
};

export default Index;
