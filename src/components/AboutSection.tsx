
import { Card, CardContent } from "@/components/ui/card";
import useScrollReveal from "@/hooks/useScrollReveal";
import TiltProfileImage from "@/components/TiltProfileImage";
import { Code, Server, Layout, FileCode } from "lucide-react";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  // Skill stat cards displayed in a row of 4
  const statCards = [
    { value: "3+", label: "Years Experience", icon: <Code size={16} className="text-blue-400" /> },
    { value: "20+", label: "Projects", icon: <FileCode size={16} className="text-purple-400" /> },
    { value: "15+", label: "Clients", icon: <Layout size={16} className="text-cyan-400" /> },
    { value: "5+", label: "Tech Stacks", icon: <Server size={16} className="text-indigo-400" /> },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden section-bg-gradient">
      {/* Background code symbols - reduced and subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-10 left-[10%] font-code text-4xl opacity-20">&lt;about&gt;</div>
        <div className="absolute bottom-10 left-[10%] font-code text-4xl opacity-20">&lt;/about&gt;</div>
        <div className="absolute top-1/3 right-[5%] font-code text-lg opacity-20">const developer = {`{`}</div>
        <div className="absolute top-1/3 right-[5%] translate-y-6 font-code text-lg opacity-20">&nbsp;&nbsp;skills: [...]</div>
        <div className="absolute top-1/3 right-[5%] translate-y-12 font-code text-lg opacity-20">{`}`}</div>
      </div>
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl"></div>
      
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
              <div className="bg-gradient-to-tr from-blue-500/20 to-purple-500/20 absolute -inset-4 rounded-xl blur-xl"></div>
              <div className="relative z-10 overflow-hidden rounded-lg border-[3px] border-gray-800">
                <TiltProfileImage imageUrl="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
              </div>
              
              {/* Code elements floating around image - reduced and more strategic */}
              <div className="absolute -top-6 -right-6 text-blue-400 text-lg font-mono p-2 bg-gray-900/80 rounded rotate-12 animate-floating">{'<Profile />'}</div>
              <div className="absolute -bottom-6 -right-6 text-purple-400 text-lg font-mono p-2 bg-gray-900/80 rounded -rotate-6 animate-floating" style={{animationDelay: "0.8s"}}>{'{ }'}</div>
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
              <span className="inline-block px-3 py-1 text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-full mb-4 font-code"># about_me</span>
              <h2 className="text-3xl font-bold mb-6 text-white">
                Transforming Ideas Into 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 block">Digital Reality</span>
              </h2>
              
              <div className="space-y-6 text-lg text-gray-300">
                <p className="relative">
                  <span className="absolute -left-4 top-0 text-3xl text-blue-500/30">{`{`}</span>
                  Hello! I'm Umang Mandnaka, a passionate Frontend Developer based in India. I enjoy turning complex problems into simple, beautiful and intuitive designs.
                </p>
                
                <p>
                  My journey in web development started back in 2018 when I decided to try creating a custom website — turns out hacking together a custom site taught me a lot about HTML & CSS!
                </p>
                
                <p>
                  Fast-forward to today, and I've had the privilege of working at a startup, an engineering company, and a design studio. My main focus these days is building accessible, inclusive products and digital experiences for various clients.
                </p>
              </div>
              
              {/* Four cards in a row with improved design */}
              <div className="grid grid-cols-4 gap-3 mt-8">
                {statCards.map((card, index) => (
                  <Card key={index} className="about-card">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        {card.icon}
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-400">{card.value}</div>
                      </div>
                      <div className="text-xs text-gray-400 font-code">{card.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Code snippet for additional effect */}
              <div className="mt-8 code-block text-xs overflow-hidden h-[60px]">
                <div className="flex gap-2">
                  <span className="text-gray-500">01</span>
                  <span><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> <span className="text-white">=</span> <span className="text-blue-400">{`{`}</span></span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500">02</span>
                  <span>&nbsp;&nbsp;<span className="text-green-400">name</span><span className="text-white">:</span> <span className="text-amber-400">'Umang Mandnaka'</span><span className="text-white">,</span></span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500">03</span>
                  <span>&nbsp;&nbsp;<span className="text-green-400">role</span><span className="text-white">:</span> <span className="text-amber-400">'Frontend Developer'</span></span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500">04</span>
                  <span><span className="text-blue-400">{`}`}</span><span className="text-white">;</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
