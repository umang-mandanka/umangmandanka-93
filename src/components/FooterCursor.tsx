
import { useEffect, useState } from "react";

const FooterCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <>
      <div 
        className={`custom-cursor cursor-dot ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      ></div>
      <div 
        className={`custom-cursor cursor-outline ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transitionDuration: '0.1s',
          transitionTimingFunction: 'ease-out',
          transitionDelay: '0.02s'
        }}
      ></div>
    </>
  );
};

export default FooterCursor;
