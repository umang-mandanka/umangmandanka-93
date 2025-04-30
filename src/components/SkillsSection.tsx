
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
    name: "REST API",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    level: 85,
    category: "Backend & Tools",
    description: "Consuming RESTful services, API integration, and asynchronous data handling."
  },
  {
    name: "UI/UX",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    level: 80,
    category: "Backend & Tools",
    description: "Creating intuitive user interfaces and thoughtful user experiences."
  },
];

const categories = ["All", "Frontend", "Frameworks", "CSS Frameworks", "Backend & Tools"];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I've worked with a variety of technologies in the web development world.
            Here's my tech stack and areas of expertise.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/70"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredSkills.map((skill, index) => (
            <HoverCard key={skill.name}>
              <HoverCardTrigger asChild>
                <Card className={`hover:-translate-y-1 transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`} style={{ transitionDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6 flex flex-col items-center">
                    <img src={skill.icon} alt={skill.name} className="w-16 h-16 mb-4" />
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    
                    <div className="w-full mt-4 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ 
                          width: isVisible ? `${skill.level}%` : "0%", 
                          transition: "width 1s ease-in-out" 
                        }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">{skill.name}</h4>
                  <span className="text-xs text-muted-foreground">{skill.level}% Proficiency</span>
                </div>
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
