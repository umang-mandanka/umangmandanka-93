
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Software Engineer",
  ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Background animated code elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Background animated text - make it more visible */}
        <div className="matrix-animation-container absolute inset-0 pointer-events-none z-0">
          {/* Matrix-style animation with enhanced visibility */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={`code-line-${i}`} 
              className="matrix-code move-down" 
              style={{
                left: `${Math.random() * 100}%`,
                opacity: "0.4", // Increased opacity for better visibility
                animationDuration: `${Math.random() * 10 + 10}s`,
                fontSize: `${Math.random() * 12 + 10}px`,
              }}
            >
              {">_<div className='text'>\nconst App = () => {\n  return <Component />;\n}"}
            </div>
          ))}
          
          {/* Horizontal moving code (yellow) - enhanced visibility */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={`code-flow-${i}`} 
              className="matrix-code move-right" 
              style={{
                top: `${Math.random() * 100}%`,
                opacity: "0.5", // Increased opacity for better visibility
                animationDuration: `${Math.random() * 15 + 10}s`,
                fontSize: `${Math.random() * 12 + 10}px`,
                color: "#ffcc00",
                textShadow: "0 0 8px #ffcc00",
              }}
            >
              {"{props => <Component {...props} />}"}
            </div>
          ))}
        </div>
      </div>

      {/* Rest of hero section content */}
      <div className="container mx-auto text-center relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 hero-code-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Hi, I'm <span className="text-blue-400 animate-text-shimmer">Your Name</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {/* A dynamic and engaging introduction */}
          <span className="wrap">{text}</span>
        </motion.p>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          {/* Call to action buttons */}
          <a href="#projects" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mr-4">
            Explore My Work
          </a>
          <a href="#contact" className="bg-transparent hover:bg-blue-500 text-blue-500 font-bold hover:text-white py-2 px-4 rounded-full border border-blue-500 hover:border-transparent transition-colors duration-300">
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Add proper style element without jsx property */}
      <style>
        {`
          .matrix-animation-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            z-index: -1;
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
