
import { Card, CardContent } from "@/components/ui/card";
import useScrollReveal from "@/hooks/useScrollReveal";
import TiltProfileImage from "@/components/TiltProfileImage";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center" ref={ref}>
          <div 
            className="md:w-1/2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)'
            }}
          >
            <div className="relative">
              <div className="bg-gradient-to-tr from-primary to-primary/50 absolute -inset-4 rounded-xl blur-xl"></div>
              <TiltProfileImage imageUrl="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-lg rotate-12 animate-float"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/10 rounded-full animate-float" style={{animationDelay: "1.5s"}}></div>
            </div>
          </div>
          
          <div 
            className="md:w-1/2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)'
            }}
          >
            <div className="relative">
              <span className="inline-block px-3 py-1 text-sm bg-primary/10 text-primary rounded-full mb-4">About Me</span>
              <h2 className="text-3xl font-bold mb-6 relative">
                Transforming Ideas Into 
                <span className="text-gradient block">Digital Reality</span>
              </h2>
              
              <div className="space-y-6 text-lg">
                <p className="relative">
                  <span className="absolute -left-4 top-0 text-3xl text-primary/20">"</span>
                  Hello! I'm Umang Mandnaka, a passionate Frontend Developer based in India. I enjoy turning complex problems into simple, beautiful and intuitive designs.
                </p>
                
                <p>
                  My journey in web development started back in 2018 when I decided to try creating a custom website — turns out hacking together a custom site taught me a lot about HTML & CSS!
                </p>
                
                <p>
                  Fast-forward to today, and I've had the privilege of working at a startup, an engineering company, and a design studio. My main focus these days is building accessible, inclusive products and digital experiences for various clients.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Card className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-gradient">3+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border border-primary/20 hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-gradient">20+</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
