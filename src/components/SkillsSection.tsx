import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Skill {
  name: string;
  icon: string;
  level: number;
  category: string;
  description: string;
}

const skills: Skill[] = [
  // Frontend
  {
    name: "HTML",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    level: 95,
    category: "Frontend",
    description: "Expertise in semantic HTML5, accessibility, and SEO best practices."
  },
  {
    name: "CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    level: 90,
    category: "Frontend",
    description: "Strong knowledge of CSS3, animations, flexbox, and grid layouts."
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    level: 85,
    category: "Frontend",
    description: "Proficient in ES6+ features, async programming, and DOM manipulation."
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: 80,
    category: "Frontend",
    description: "Experience with type systems, interfaces, and enhancing code quality."
  },
  // Frameworks
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    level: 85,
    category: "Frameworks",
    description: "Building complex SPAs with Angular, including state management with NgRx."
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: 75,
    category: "Frameworks",
    description: "Creating interactive UIs with React, hooks, and context API."
  },
  // CSS Frameworks
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    level: 90,
    category: "CSS Frameworks",
    description: "Rapidly developing responsive websites with Bootstrap components."
  },
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    level: 85,
    category: "CSS Frameworks",
    description: "Building custom designs efficiently with utility-first approach."
  },
  // Backend & Tools
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    level: 75,
    category: "Backend & Tools",
    description: "Implementing authentication, real-time databases, and cloud functions."
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: 80,
    category: "Backend & Tools",
    description: "Version control, branching strategies, and collaborative workflows."
  },
  {
    name: "NodeJS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    level: 85,
    category: "Backend & Tools",
    description: "Building APIs and server-side applications with Node.js."
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    level: 80,
    category: "Backend & Tools",
    description: "Creating intuitive user interfaces and thoughtful user experiences."
  },
];

const categories = ["All", "Frontend", "Frameworks", "CSS Frameworks", "Backend & Tools"];

interface DraggableSkillProps {
  skill: Skill;
  onDrag: (name: string, x: number, y: number) => void;
  position: { x: number, y: number } | null;
  containerBounds: { width: number; height: number } | null;
}

const DraggableSkill = ({ skill, onDrag, position, containerBounds }: DraggableSkillProps) => {
  const controls = useAnimation();
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  const x = useMotionValue(position?.x || Math.random() * (containerBounds?.width || 500) - 50);
  const y = useMotionValue(position?.y || Math.random() * (containerBounds?.height || 400) - 50);
  
  // Random floating motion
  useEffect(() => {
    let animationFrameId: number;
    
    const animate = () => {
      if (!dragging && containerBounds) {
        const newX = x.get() + (Math.random() - 0.5) * 1;
        const newY = y.get() + (Math.random() - 0.5) * 1;
        
        // Keep within bounds
        const iconSize = 70;
        const boundedX = Math.max(0, Math.min(newX, containerBounds.width - iconSize));
        const boundedY = Math.max(0, Math.min(newY, containerBounds.height - iconSize));
        
        x.set(boundedX);
        y.set(boundedY);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    if (containerBounds) {
      animationFrameId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [dragging, containerBounds, x, y]);
  
  const onDragEnd = (event: any, info: any) => {
    setDragging(false);
    if (containerBounds) {
      // Ensure we stay within bounds
      const iconSize = 70;
      const boundedX = Math.max(0, Math.min(info.point.x, containerBounds.width - iconSize));
      const boundedY = Math.max(0, Math.min(info.point.y, containerBounds.height - iconSize));
      
      onDrag(skill.name, boundedX, boundedY);
    }
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0.1}
          style={{ x, y, zIndex: dragging ? 10 : 1 }}
          whileDrag={{ scale: 1.1, zIndex: 10 }}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
          animate={controls}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="absolute cursor-grab active:cursor-grabbing"
        >
          <div className={`w-16 h-16 flex items-center justify-center rounded-full 
                      transition-all duration-300 ${
                        hovered ? 'scale-110 shadow-lg shadow-primary/30' : ''
                      }`}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 backdrop-blur-sm rounded-full"></div>
            <motion.div 
              animate={{ 
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ 
                duration: 6, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
              className="relative z-10"
            >
              <img src={skill.icon} alt={skill.name} className="w-10 h-10 drop-shadow-md" />
            </motion.div>
          </div>
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="w-64 bg-card/80 backdrop-blur-md border border-primary/20">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{skill.name}</h4>
            <Badge className="bg-primary/10 text-primary text-xs">{skill.level}%</Badge>
          </div>
          <div className="w-full h-2 bg-secondary/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${skill.level}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{skill.description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);
  const [isVisible, setIsVisible] = useState(false);
  const [skillPositions, setSkillPositions] = useState<Record<string, { x: number, y: number }>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerBounds, setContainerBounds] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(skill => skill.category === activeCategory));
    }
  }, [activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('skills');
    if (section) {
      observer.observe(section);
    }

    const updateBounds = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerBounds({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    return () => {
      if (section) {
        observer.disconnect();
      }
      window.removeEventListener('resize', updateBounds);
    };
  }, []);

  const handleSkillDrag = (name: string, x: number, y: number) => {
    setSkillPositions(prev => ({
      ...prev,
      [name]: { x, y }
    }));
  };

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/5%),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I've worked with a variety of technologies in the web development world.
            Here's my tech stack and areas of expertise.
          </p>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-colors relative overflow-hidden ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/70"
              }`}
              onClick={() => setActiveCategory(category)}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </div>
        
        {/* Interactive draggable skill icons */}
        <div 
          ref={containerRef}
          className="relative h-[500px] w-full bg-gradient-to-br from-secondary/10 to-primary/5 backdrop-blur-sm rounded-xl mb-10 border border-primary/10 overflow-hidden"
        >
          {isVisible && containerBounds && filteredSkills.map((skill) => (
            <DraggableSkill 
              key={skill.name}
              skill={skill}
              onDrag={handleSkillDrag}
              position={skillPositions[skill.name] || null}
              containerBounds={containerBounds}
            />
          ))}
          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
            Drag skills anywhere in this area
          </div>
        </div>
        
        {/* Skill cards grid for reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0, 
                y: isVisible ? 0 : 20 
              }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                  <img src={skill.icon} alt={skill.name} className="w-8 h-8" />
                  <span className="text-sm font-medium">{skill.name}</span>
                  <div className="w-full h-1 bg-secondary/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
