
import { useState, useEffect } from "react";

interface FloatingCodeProps {
  delay?: number;
}

const codeSnippets = [
  {
    language: "javascript",
    code: `const animateElements = () => {
  elements.forEach(el => {
    gsap.to(el, {
      y: -20,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
      delay: el.dataset.delay
    });
  });
};`,
    position: { top: "60%", right: "5%" }
  },
  {
    language: "html",
    code: `<div class="project-card">
  <img src="project.jpg" alt="Project" />
  <div class="card-overlay">
    <h3>Amazing Project</h3>
    <p>Vue • Node.js • MongoDB</p>
  </div>
</div>`,
    position: { bottom: "15%", left: "8%" }
  }
];

const FloatingCodeSnippet: React.FC<FloatingCodeProps> = ({ delay = 0 }) => {
  const [visibleSnippets, setVisibleSnippets] = useState<number[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Make snippets visible as user scrolls
      const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      
      if (scrollPercentage > 0.2) setVisibleSnippets(prev => Array.from(new Set([...prev, 0])));
      if (scrollPercentage > 0.5) setVisibleSnippets(prev => Array.from(new Set([...prev, 1])));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {codeSnippets.map((snippet, index) => {
        const isVisible = visibleSnippets.includes(index);
        const parallaxOffset = scrollPosition * 0.05 * (index + 1);
        
        // Calculate position from object
        const style: React.CSSProperties = {
          opacity: isVisible ? 0.7 : 0,
          transform: `translateY(${isVisible ? parallaxOffset : 50}px)`,
          transition: `opacity 0.8s ease, transform 0.8s ease`,
        };
        
        if (snippet.position.top) style.top = snippet.position.top;
        if (snippet.position.bottom) style.bottom = snippet.position.bottom;
        if (snippet.position.left) style.left = snippet.position.left;
        if (snippet.position.right) style.right = snippet.position.right;
        
        return (
          <div 
            key={`${snippet.language}-${index}-${btoa(encodeURIComponent(snippet.code)).slice(0,8)}`} 
            className="absolute z-0 max-w-xs"
            style={{ 
              ...style,
              transitionDelay: `${delay + index * 0.2}s`
            }}
          >
            <div className="bg-black/80 backdrop-blur-md p-3 rounded-lg border border-primary/30 shadow-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs text-primary/70">{snippet.language}</span>
              </div>
              <pre className="text-xs overflow-x-auto scrollbar-none">
                <code className="font-mono text-green-400">
                  {snippet.code}
                </code>
              </pre>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FloatingCodeSnippet;
