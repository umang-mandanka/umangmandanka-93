
import { useState } from "react";
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
import { Code, ArrowRight } from "lucide-react";

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
  }
];

const ProjectSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setIsDialogOpen(true);
  };

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are some of my recent works. Each project was carefully crafted with attention to detail and performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleOpenProject(project)}>
                  View Details
                </Button>
                <div className="flex gap-2">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm">
                      <Code className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className="max-w-3xl">
            {selectedProject && (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle>{selectedProject.title}</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="my-4">
                      <img 
                        src={selectedProject.image} 
                        alt={selectedProject.title} 
                        className="w-full h-56 object-cover rounded-md" 
                      />
                    </div>
                    <p className="text-foreground my-4">{selectedProject.longDescription}</p>
                    <div className="flex flex-wrap gap-2 my-4">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <div className="flex gap-4 w-full">
                    <AlertDialogAction asChild>
                      <Button className="w-full">
                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                          Live Demo
                        </a>
                      </Button>
                    </AlertDialogAction>
                    <AlertDialogAction asChild>
                      <Button variant="outline" className="w-full">
                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                          View Code
                        </a>
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
