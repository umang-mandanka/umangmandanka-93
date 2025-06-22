
import { useState, useEffect } from "react";
import TechStackCard from "@/components/TechStackCard";

interface Skill {
  name: string;
  icon: string;
  yearsExperience: number;
  projectCount: number;
  category: string;
  description: string;
  primaryColor: string;
}

const skills: Skill[] = [
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    yearsExperience: 6,
    projectCount: 50,
    category: "Frontend",
    description: "Building semantic, accessible web structures with modern HTML5 features, form validation, and SEO optimization.",
    primaryColor: "#E34F26"
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    yearsExperience: 6,
    projectCount: 45,
    category: "Frontend",
    description: "Creating responsive layouts, animations, and modern designs using CSS Grid, Flexbox, and custom properties.",
    primaryColor: "#1572B6"
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    yearsExperience: 5,
    projectCount: 40,
    category: "Frontend",
    description: "Developing interactive web applications with ES6+, async programming, and modern JavaScript frameworks.",
    primaryColor: "#F7DF1E"
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    yearsExperience: 3,
    projectCount: 25,
    category: "Frontend",
    description: "Building type-safe applications with advanced TypeScript features for better code quality and maintainability.",
    primaryColor: "#3178C6"
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    yearsExperience: 4,
    projectCount: 30,
    category: "Framework",
    description: "Creating dynamic user interfaces with React hooks, context API, and modern state management solutions.",
    primaryColor: "#61DAFB"
  },
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    yearsExperience: 3,
    projectCount: 15,
    category: "Framework",
    description: "Building enterprise-level SPAs with Angular, RxJS, and comprehensive testing strategies.",
    primaryColor: "#DD0031"
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    yearsExperience: 3,
    projectCount: 25,
    category: "CSS Framework",
    description: "Rapid UI development with utility-first approach, custom design systems, and responsive components.",
    primaryColor: "#06B6D4"
  },
  {
    name: "Bootstrap",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    yearsExperience: 4,
    projectCount: 20,
    category: "CSS Framework",
    description: "Fast prototyping and responsive web development using Bootstrap's component library and grid system.",
    primaryColor: "#7952B3"
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    yearsExperience: 2,
    projectCount: 12,
    category: "Backend",
    description: "Full-stack development with Firebase Authentication, Firestore, Cloud Functions, and real-time features.",
    primaryColor: "#FFCA28"
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    yearsExperience: 5,
    projectCount: 35,
    category: "Tools",
    description: "Version control mastery with Git workflows, branching strategies, and collaborative development practices.",
    primaryColor: "#F05032"
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    yearsExperience: 3,
    projectCount: 20,
    category: "Design",
    description: "UI/UX design and prototyping, creating design systems and seamless designer-developer handoffs.",
    primaryColor: "#F24E1E"
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    yearsExperience: 3,
    projectCount: 18,
    category: "Backend",
    description: "Server-side development with Node.js, REST APIs, and integration with various databases and services.",
    primaryColor: "#339933"
  }
];

const categories = ["All", "Frontend", "Framework", "CSS Framework", "Backend", "Tools", "Design"];

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>(skills);
  const [isVisible, setIsVisible] = useState(false);

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

    return () => {
      if (section) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section id="skills" className="block-section relative overflow-hidden">
      {/* Modern Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-section-title font-display mb-6 text-accent-gradient">
            Tech Stack & Expertise
          </h2>
          <div className="w-24 h-1 accent-gradient mx-auto mb-8 rounded-full"></div>
          <p className="text-body-large text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Years of hands-on experience building modern web applications. 
            Each technology represents real projects, solved challenges, and continuous learning.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 relative overflow-hidden group ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "bg-card/60 text-foreground hover:bg-card/80 border border-white/10"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              <span className="relative z-10">{category}</span>
              {activeCategory !== category && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              )}
            </button>
          ))}
        </div>
        
        {/* Tech Stack Grid */}
        <div 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {filteredSkills.map((skill, index) => (
            <TechStackCard
              key={skill.name}
              {...skill}
              index={index}
            />
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center block-card">
            <div className="text-3xl font-display font-bold text-primary mb-2">6+</div>
            <div className="text-muted-foreground font-medium">Years Experience</div>
          </div>
          <div className="text-center block-card">
            <div className="text-3xl font-display font-bold text-accent mb-2">50+</div>
            <div className="text-muted-foreground font-medium">Projects Built</div>
          </div>
          <div className="text-center block-card">
            <div className="text-3xl font-display font-bold text-secondary mb-2">12</div>
            <div className="text-muted-foreground font-medium">Technologies</div>
          </div>
          <div className="text-center block-card">
            <div className="text-3xl font-display font-bold text-primary mb-2">∞</div>
            <div className="text-muted-foreground font-medium">Learning</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
