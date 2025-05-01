
import { useState, useEffect, useRef } from "react";
import { Code, Menu, Moon, Sun, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  // Set darkMode to true by default
  const [darkMode, setDarkMode] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update active link based on scroll position - fixed TypeScript errors
      const sections = document.querySelectorAll<HTMLElement>('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id') as string;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Apply dark mode by default when component mounts
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Initialize dark mode on first render
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 font-code ${
        isScrolled 
        ? "py-2 bg-black/80 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-500/10" 
        : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="relative group flex items-center gap-2">
          <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-md transform transition-transform group-hover:rotate-12">
            <Code className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400">
              Umang
            </span>
            <span className="text-white">.dev</span>
          </span>
          <div className="hidden md:flex ml-2 gap-1 opacity-70">
            <Terminal size={14} className="text-purple-400" />
            <span className="text-xs text-cyan-400">/&gt;</span>
          </div>
        </a>
        
        <div className="hidden md:flex space-x-5">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className={`relative font-code text-sm group overflow-hidden px-3 py-2 transition-colors ${
                activeLink === link.href.substring(1) 
                ? "text-white" 
                : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="relative z-10">{link.name}</span>
              {activeLink === link.href.substring(1) && (
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-md"></span>
              )}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className="relative overflow-hidden rounded-full bg-gray-900/30"
          >
            <span className="absolute inset-0 bg-purple-500/10 scale-0 hover:scale-100 transition-transform duration-300 rounded-full"></span>
            <span className="relative z-10">
              {darkMode ? <Sun className="h-5 w-5 text-yellow-300" /> : <Moon className="h-5 w-5 text-blue-300" />}
            </span>
          </Button>
          
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button className="hidden md:flex relative overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 border-none">
              <span className="relative z-10 font-code text-sm">Resume.pdf</span>
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </a>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
          >
            <Menu />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu with improved design */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full backdrop-blur-md bg-black/80 border-b border-purple-500/20 shadow-lg py-4 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="py-2 px-4 font-code text-sm hover:bg-purple-500/10 rounded-md transition-colors flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-purple-400">#</span>
              {link.name}
            </a>
          ))}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="py-2 px-4 mt-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-md text-white font-code text-sm flex items-center gap-2"
          >
            <span className="text-green-400">&gt;</span>
            Resume.pdf
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
