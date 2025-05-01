
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const currentYear = new Date().getFullYear();
  
  // Interactive hover state for each link
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  // Scroll position for parallax effect
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="py-12 relative overflow-hidden bg-black">
      {/* Background elements with parallax effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`
        }}
      ></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white h-full"></div>
          ))}
        </div>
        <div className="grid grid-rows-6 w-full h-full absolute top-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-b border-white w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Code elements */}
      <div className="absolute top-10 left-[10%] text-purple-500/20 text-5xl font-mono rotate-6">{'<>'}</div>
      <div className="absolute bottom-10 right-[10%] text-blue-500/20 text-5xl font-mono rotate-12">{'</>'}</div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
                <span className="font-bold text-white text-xl">U</span>
              </div>
              <h3 className="font-semibold text-xl text-white">Umang Mandnaka</h3>
            </div>
            <p className="text-gray-400">
              © {currentYear} All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Crafted with passion and precision
            </p>
            
            <div className="mt-6">
              <div className="text-gray-400 font-mono text-sm">
                <span className="text-purple-500">const</span> <span className="text-blue-400">contact</span> = <span className="text-purple-500">{`{`}</span><br />
                &nbsp;&nbsp;<span className="text-green-400">"email"</span>: <span className="text-amber-400">"umang@example.com"</span>,<br />
                &nbsp;&nbsp;<span className="text-green-400">"phone"</span>: <span className="text-amber-400">"+1 (234) 567-890"</span><br />
                <span className="text-purple-500">{`}`}</span>;
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-white">Links</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#home" 
                    className="text-gray-400 hover:text-blue-400 transition-colors relative overflow-hidden block"
                    onMouseEnter={() => setHoveredLink('home')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="relative z-10">Home</span>
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 origin-left"
                      style={{ 
                        transform: hoveredLink === 'home' ? 'scaleX(1)' : 'scaleX(0)'
                      }}
                    ></span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    className="text-gray-400 hover:text-blue-400 transition-colors relative overflow-hidden block"
                    onMouseEnter={() => setHoveredLink('about')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="relative z-10">About</span>
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 origin-left"
                      style={{ 
                        transform: hoveredLink === 'about' ? 'scaleX(1)' : 'scaleX(0)'
                      }}
                    ></span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#projects" 
                    className="text-gray-400 hover:text-blue-400 transition-colors relative overflow-hidden block"
                    onMouseEnter={() => setHoveredLink('projects')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="relative z-10">Projects</span>
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 origin-left"
                      style={{ 
                        transform: hoveredLink === 'projects' ? 'scaleX(1)' : 'scaleX(0)'
                      }}
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">More</h4>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#skills" 
                    className="text-gray-400 hover:text-blue-400 transition-colors relative overflow-hidden block"
                    onMouseEnter={() => setHoveredLink('skills')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="relative z-10">Skills</span>
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 origin-left"
                      style={{ 
                        transform: hoveredLink === 'skills' ? 'scaleX(1)' : 'scaleX(0)'
                      }}
                    ></span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#testimonials" 
                    className="text-gray-400 hover:text-blue-400 transition-colors relative overflow-hidden block"
                    onMouseEnter={() => setHoveredLink('testimonials')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="relative z-10">Testimonials</span>
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 origin-left"
                      style={{ 
                        transform: hoveredLink === 'testimonials' ? 'scaleX(1)' : 'scaleX(0)'
                      }}
                    ></span>
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-gray-400 hover:text-blue-400 transition-colors relative overflow-hidden block"
                    onMouseEnter={() => setHoveredLink('contact')}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span className="relative z-10">Contact</span>
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300 origin-left"
                      style={{ 
                        transform: hoveredLink === 'contact' ? 'scaleX(1)' : 'scaleX(0)'
                      }}
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button 
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="group"
            >
              <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600 hover:to-blue-600 p-4 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 mb-6">
                <ArrowUp className="text-white h-5 w-5 group-hover:animate-bounce" />
              </div>
            </button>
            
            <div className="flex gap-5 mb-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-125 transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-125 transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-125 transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
            
            <div className="inline-block p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg">
              <div className="text-center">
                <div className="mb-1 text-gray-400 text-sm">Made with</div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-red-500">❤</span>
                  <span className="text-blue-400">React</span>
                  <span className="text-cyan-400">Tailwind</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
