
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
import { useEffect } from "react";

const Index = () => {
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
      document.querySelectorAll('.parallax-layer').forEach(layer => {
        const speed = (layer as HTMLElement).dataset.speed || '0.1';
        const x = (window.innerWidth - e.pageX * parseFloat(speed)) / 100;
        const y = (window.innerHeight - e.pageY * parseFloat(speed)) / 100;
        (layer as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      
      {/* Interactive elements */}
      <AnimatedSvgElements />
      <ScrollTriggeredElement position="left" offset={0} />
      <ScrollTriggeredElement position="right" offset={1} />
      <ScrollTriggeredElement position="left" offset={2} />
      <FloatingCodeSnippet />
      
      {/* Background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-primary/30 animate-float"></div>
        <div className="absolute top-1/2 left-1/5 w-3 h-3 rounded-full bg-primary/20 animate-float" style={{animationDelay: "1.5s"}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-primary/40 animate-float" style={{animationDelay: "2.2s"}}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-primary/20 animate-float" style={{animationDelay: "0.7s"}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full bg-primary/30 animate-float" style={{animationDelay: "1.3s"}}></div>
      </div>
    </div>
  );
};

export default Index;
