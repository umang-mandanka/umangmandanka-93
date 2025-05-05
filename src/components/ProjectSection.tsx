
import { useState, useEffect, useRef } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, ArrowRight, ExternalLink, Github } from "lucide-react";
import useScrollReveal from "@/hooks/useScrollReveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  longDescription: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform built with Angular and Firebase",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    tags: ["Angular", "Firebase", "Tailwind CSS", "REST API"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com",
    longDescription: "An end-to-end e-commerce solution with user authentication, product catalog, shopping cart functionality, payment processing integration, and order management. The platform is built with Angular for the frontend, Firebase for backend services, and implements responsive design using Tailwind CSS."
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["JavaScript", "Bootstrap", "Firebase", "REST API"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com",
    longDescription: "A comprehensive task management application that enables teams to collaborate efficiently. Features include task creation and assignment, due dates, priority levels, status tracking, comment threads, file attachments, and real-time notifications. The application uses a Bootstrap frontend with JavaScript and connects to Firebase for real-time updates."
  },
  {
    id: 3,
    title: "Personal Finance Dashboard",
    description: "A data visualization dashboard for personal finance tracking",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Angular", "Tailwind CSS", "Chart.js", "REST API"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com",
    longDescription: "A comprehensive personal finance dashboard that helps users track expenses, income, investments, and financial goals. The dashboard includes interactive charts and graphs for visual representation of financial data, budget planning tools, expense categorization, and financial goal tracking features. Built with Angular and Tailwind CSS, with Chart.js for data visualization."
  },
  {
    id: 4,
    title: "Weather Forecast App",
    description: "A responsive weather forecast application with location services",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["HTML", "CSS", "JavaScript", "API Integration"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com",
    longDescription: "A user-friendly weather forecast application that provides current weather conditions, hourly forecasts, and 7-day predictions. The app features geolocation services to automatically detect user location, customizable units (Celsius/Fahrenheit), weather alerts, and animated weather icons. Built with vanilla JavaScript and modern CSS techniques, consuming data from a weather API."
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "A creative portfolio website for showcasing web development projects",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Responsive Design"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com",
    longDescription: "A modern and interactive portfolio website designed to showcase web development projects with style. Featuring smooth animations, responsive layouts, and interactive elements that engage visitors. Built with React and styled with Tailwind CSS, with Framer Motion for advanced animations."
  },
  {
    id: 6,
    title: "Recipe Sharing Platform",
    description: "A community-driven recipe sharing platform with social features",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
    tags: ["Vue.js", "Firebase", "CSS Grid", "Progressive Web App"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com",
    longDescription: "A vibrant community platform where food enthusiasts can share recipes, discover new dishes, and connect with other foodies. Features include recipe uploads with image galleries, step-by-step instructions, ingredient lists, user ratings and reviews, and personalized recipe collections. Built as a Progressive Web App using Vue.js and Firebase."
  }
];

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <section id="projects" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-full h-full top-0 left-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/5%),transparent_70%)]"></div>
      <div className="absolute w-full h-full top-0 left-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--primary)/5%),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent works. Each project was carefully crafted with attention to detail and performance.
          </p>
        </div>
        
        {/* Modern Horizontal Project Carousel */}
        <div ref={ref} className="w-full max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onSelect={(api) => {
              if (api) setActiveIndex(api.selectedScrollSnap());
            }}
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: isVisible ? 1 : 0, 
                      y: isVisible ? 0 : 20,
                      transition: { duration: 0.5, delay: index * 0.1 }
                    }}
                    whileHover={{ y: -10 }}
                    className="h-full p-1"
                  >
                    <Card className="overflow-hidden h-full border-primary/10 bg-card/80 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/10 transition-all duration-500">
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="bg-black/40 border-white/20 text-white hover:bg-black/60"
                              onClick={() => handleOpenProject(project)}
                            >
                              Details
                            </Button>
                            <div className="flex gap-2">
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-black/40 border-white/20 text-white hover:bg-black/60">
                                  <Github className="h-4 w-4" />
                                </Button>
                              </a>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-black/40 border-white/20 text-white hover:bg-black/60">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription className="text-xs line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-primary/5 text-xs py-0">{tag}</Badge>
                          ))}
                          {project.tags.length > 3 && (
                            <Badge variant="outline" className="bg-primary/5 text-xs py-0">+{project.tags.length - 3}</Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-8 gap-2">
              <CarouselPrevious className="static transform-none mx-2 bg-primary/10 hover:bg-primary/20 border-primary/20" />
              <div className="flex gap-2">
                {projects.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === index ? "w-6 bg-primary" : "bg-primary/30"
                    }`}
                  />
                ))}
              </div>
              <CarouselNext className="static transform-none mx-2 bg-primary/10 hover:bg-primary/20 border-primary/20" />
            </div>
          </Carousel>
        </div>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="max-w-3xl backdrop-blur-md bg-card/70 border border-primary/20">
            {selectedProject && (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-bold">{selectedProject.title}</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="my-4">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full h-64 object-cover rounded-md" 
                      />
                    </div>
                    <p className="text-foreground my-4 text-lg">{selectedProject.longDescription}</p>
                    <div className="flex flex-wrap gap-2 my-4">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-primary/10">{tag}</Badge>
                      ))}
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <div className="flex gap-4 w-full">
                    <AlertDialogAction asChild>
                      <Button className="w-full relative overflow-hidden group">
                        <span className="relative z-10">Live Demo</span>
                        <span className="absolute inset-0 bg-primary/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0"></a>
                      </Button>
                    </AlertDialogAction>
                    <AlertDialogAction asChild>
                      <Button variant="outline" className="w-full relative overflow-hidden group">
                        <span className="relative z-10">View Code</span>
                        <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0"></a>
                      </Button>
                    </AlertDialogAction>
                  </div>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default ProjectSection;
