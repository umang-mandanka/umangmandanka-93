
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card"; 
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScrollReveal from "@/hooks/useScrollReveal";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Product Manager",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    text: "Working with Umang was a game-changer for our project. His attention to detail and technical expertise transformed our vision into reality."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "StartupX",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    text: "Umang delivered beyond our expectations. His frontend skills brought our application to life with intuitive navigation and beautiful animations."
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "Marketing Director",
    company: "CreativeSolutions",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 4,
    text: "Umang has an exceptional eye for design and user experience. He translated our brand guidelines into a cohesive web presence."
  },
  {
    id: 4,
    name: "Daniel Martinez",
    role: "Tech Lead",
    company: "InnovateTech",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    text: "His code is as clean as his designs. Working with Umang made our development process smooth and enjoyable."
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    company: "DesignHub",
    rating: 5,
    text: "As a designer, I appreciate developers who can bring my designs to life exactly as envisioned. Umang is one of those rare developers."
  }
];

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/10%),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2 text-white">What Clients Say</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            I value all feedback from clients and collaborators as it helps me grow professionally.
          </p>
        </div>

        <div 
          ref={ref} 
          className="max-w-full mx-auto relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.7s ease-out'
          }}
        >
          <Quote className="absolute text-purple-500/10 w-20 h-20 -top-10 -left-10 z-0" />
          
          {/* Using Carousel component for better slider with 3 cards visible */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className="p-8">
                      {/* Floating quote marks */}
                      <div className="absolute -top-3 -right-3 transform rotate-180">
                        <Quote className="text-purple-500/20 w-8 h-8" />
                      </div>
                      
                      <div className="flex items-center mb-6">
                        <div className="mr-4 relative group">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/50 to-blue-500/50 blur-sm group-hover:blur-md transition-all"></div>
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-14 h-14 object-cover rounded-full relative z-10 border-2 border-gray-700 group-hover:border-blue-500/50 transition-all duration-300" 
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-white">{testimonial.name}</h3>
                          <p className="text-xs text-gray-400">
                            {testimonial.role} at {testimonial.company}
                          </p>
                          <div className="flex mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 italic text-sm">{testimonial.text}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static bg-gray-800/70 hover:bg-gray-700/90 border-gray-700 text-white" />
              <CarouselNext className="static bg-gray-800/70 hover:bg-gray-700/90 border-gray-700 text-white" />
            </div>
          </Carousel>
          
          {/* Instruction text */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Slide to explore more testimonials</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
