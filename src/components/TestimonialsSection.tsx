
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card"; 
import { Star, Quote } from "lucide-react";
import useScrollReveal from "@/hooks/useScrollReveal";

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
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Intersection observer to detect which testimonial is in view
  useEffect(() => {
    if (!testimonialsRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setActiveIndex(index);
        }
      });
    }, { threshold: 0.6, root: testimonialsRef.current });
    
    const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
      observer.observe(card);
    });
    
    return () => {
      testimonialCards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, [isVisible]);
  
  // Drag to scroll functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!testimonialsRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - testimonialsRef.current.offsetLeft);
    setScrollLeft(testimonialsRef.current.scrollLeft);
    testimonialsRef.current.style.cursor = 'grabbing';
  };
  
  const handleMouseUp = () => {
    if (!testimonialsRef.current) return;
    setIsDragging(false);
    testimonialsRef.current.style.cursor = 'grab';
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !testimonialsRef.current) return;
    e.preventDefault();
    const x = e.pageX - testimonialsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    testimonialsRef.current.scrollLeft = scrollLeft - walk;
  };
  
  // Scroll to testimonial
  const scrollToTestimonial = (index: number) => {
    if (!testimonialsRef.current) return;
    const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card');
    if (testimonialCards[index]) {
      testimonialsRef.current.scrollLeft = testimonialCards[index].getBoundingClientRect().left + 
        testimonialsRef.current.scrollLeft - testimonialsRef.current.getBoundingClientRect().left;
    }
  };

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
          
          {/* Horizontal scrolling testimonials */}
          <div 
            ref={testimonialsRef}
            className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory cursor-grab scrollbar-none"
            style={{
              scrollBehavior: 'smooth',
              WebkitOverflowScrolling: 'touch',
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                data-index={index}
                className="testimonial-card min-w-[280px] md:min-w-[350px] flex-shrink-0 snap-center bg-gray-800/70 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2"
              >
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
            ))}
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-10 gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === activeIndex 
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 w-8" 
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          
          {/* Instruction text */}
          <div className="text-center mt-8 text-gray-500 text-sm">
            <p>Drag to explore more testimonials</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
