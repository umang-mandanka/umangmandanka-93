
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const FloatingCodeSnippet = () => {
  const [isVisible, setIsVisible] = useState(true);
  const codeRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="fixed bottom-10 right-10 z-10">
      <motion.div
        ref={codeRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0.7, 
          y: 0, 
          rotate: [0, 2, 0, -2, 0],
          transition: { 
            rotate: { repeat: Infinity, duration: 5, ease: "easeInOut" } 
          }
        }}
        whileHover={{ scale: 1.03 }}
        className="bg-black/80 backdrop-blur-sm text-blue-400 p-4 rounded-lg border border-blue-500/40 shadow-lg shadow-blue-500/20 max-w-[270px] hover:shadow-blue-400/30 transition-all duration-300"
      >
        <pre className="text-xs font-code overflow-x-auto scrollbar-none">
          <code>{`import React from 'react';

function App() {
  return (
    <div className="app">
      Hello World!
    </div>
  );
}`}
          </code>
        </pre>
      </motion.div>
    </div>
  );
};

export default FloatingCodeSnippet;
