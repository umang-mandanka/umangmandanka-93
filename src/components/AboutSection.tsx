
import { Card, CardContent } from "@/components/ui/card";
import useScrollReveal from "@/hooks/useScrollReveal";
import TiltProfileImage from "@/components/TiltProfileImage";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-purple-500/20 to-blue-500/10 rounded-full blur-3xl"></div>
      
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
              <div className="bg-gradient-to-tr from-purple-500/30 to-blue-500/30 absolute -inset-4 rounded-xl blur-xl"></div>
              <div className="relative z-10 overflow-hidden rounded-lg border-[3px] border-gray-800">
                <TiltProfileImage imageUrl="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
              </div>
              
              {/* Code elements floating around image */}
              <div className="absolute -top-6 -right-6 text-blue-400 text-xl font-mono p-2 bg-gray-900/80 rounded rotate-12 animate-float">{'<div>'}</div>
              <div className="absolute bottom-20 -left-10 text-purple-400 text-xl font-mono p-2 bg-gray-900/80 rounded rotate-6 animate-float" style={{animationDelay: "1.2s"}}>{'</>'}</div>
              <div className="absolute -bottom-6 -right-6 text-pink-400 text-xl font-mono p-2 bg-gray-900/80 rounded -rotate-12 animate-float" style={{animationDelay: "0.8s"}}>{'{ }'}</div>
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
              <span className="inline-block px-3 py-1 text-sm bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-blue-400 rounded-full mb-4">About Me</span>
              <h2 className="text-3xl font-bold mb-6 text-white">
                Transforming Ideas Into 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400 block">Digital Reality</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-300">
                <p className="relative">
                  <span className="absolute -left-4 top-0 text-3xl text-purple-500/30">"</span>
                  Hello! I'm Umang Mandnaka, a passionate Frontend Developer based in India. I enjoy turning complex problems into simple, beautiful and intuitive designs.
                </p>
                
                <p>
                  My journey in web development started back in 2018 when I decided to try creating a custom website — turns out hacking together a custom site taught me a lot about HTML & CSS!
                </p>
                
                <p>
                  Fast-forward to today, and I've had the privilege of working at a startup, an engineering company, and a design studio. My main focus these days is building accessible, inclusive products and digital experiences for various clients.
                </p>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mt-8">
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">3+</div>
                    <div className="text-xs text-gray-400">Years Experience</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">20+</div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">15+</div>
                    <div className="text-xs text-gray-400">Clients</div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:-translate-y-1 transition-transform duration-300">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-400">5+</div>
                    <div className="text-xs text-gray-400">Tech Stacks</div>
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
