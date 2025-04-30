
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-gradient-to-tr from-primary to-primary/50 absolute -inset-1 rounded-xl blur-sm"></div>
              <div className="relative bg-card rounded-xl overflow-hidden aspect-square max-w-md mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Umang Mandnaka" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-2">About Me</h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            
            <p className="text-lg mb-6">
              Hello! I'm Umang Mandnaka, a passionate Frontend Developer based in India. I enjoy turning complex problems into simple, beautiful and intuitive designs.
            </p>
            
            <p className="text-lg mb-6">
              My journey in web development started back in 2018 when I decided to try creating a custom website — turns out hacking together a custom site taught me a lot about HTML & CSS!
            </p>
            
            <p className="text-lg mb-8">
              Fast-forward to today, and I've had the privilege of working at a startup, an engineering company, and a design studio. My main focus these days is building accessible, inclusive products and digital experiences for various clients.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
