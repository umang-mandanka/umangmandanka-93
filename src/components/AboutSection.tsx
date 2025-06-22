
import { Card, CardContent } from "@/components/ui/card";
import useScrollReveal from "@/hooks/useScrollReveal";
import TiltProfileImage from "@/components/TiltProfileImage";
import PersonalityCard from "@/components/PersonalityCard";
import { Code, Server, Layout, FileCode, Coffee, Music, Camera, Gamepad2 } from "lucide-react";

const AboutSection = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  // Enhanced stats with more specific achievements
  const achievementCards = [
    { value: "3+", label: "Years Experience", icon: <Code size={16} className="text-blue-400" />, detail: "Full-stack development" },
    { value: "25+", label: "Projects Delivered", icon: <FileCode size={16} className="text-purple-400" />, detail: "From concept to production" },
    { value: "98%", label: "Client Satisfaction", icon: <Layout size={16} className="text-cyan-400" />, detail: "Based on feedback" },
    { value: "12+", label: "Tech Stacks", icon: <Server size={16} className="text-indigo-400" />, detail: "Modern frameworks" },
  ];

  // Personal interests and values
  const personalityTraits = [
    {
      icon: <Coffee size={20} className="text-amber-500" />,
      title: "Coffee Enthusiast",
      description: "Best code is written with good coffee. I'm always exploring new brewing methods.",
      color: "from-amber-500/20 to-orange-500/10"
    },
    {
      icon: <Music size={20} className="text-purple-500" />,
      title: "Music Producer",
      description: "Creating beats and melodies in my spare time. Music inspires my creative coding approach.",
      color: "from-purple-500/20 to-pink-500/10"
    },
    {
      icon: <Camera size={20} className="text-green-500" />,
      title: "Photography",
      description: "Capturing moments and perspectives. It helps me see design from different angles.",
      color: "from-green-500/20 to-teal-500/10"
    },
    {
      icon: <Gamepad2 size={20} className="text-blue-500" />,
      title: "Gaming",
      description: "From indie games to AAA titles. Gaming UX heavily influences my interface design.",
      color: "from-blue-500/20 to-cyan-500/10"
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden section-bg-gradient">
      {/* Background code symbols - reduced and subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-10 left-[10%] font-code text-4xl opacity-20">&lt;about&gt;</div>
        <div className="absolute bottom-10 left-[10%] font-code text-4xl opacity-20">&lt;/about&gt;</div>
        <div className="absolute top-1/3 right-[5%] font-code text-lg opacity-20">const developer = {`{`}</div>
        <div className="absolute top-1/3 right-[5%] translate-y-6 font-code text-lg opacity-20">&nbsp;&nbsp;passion: true,</div>
        <div className="absolute top-1/3 right-[5%] translate-y-12 font-code text-lg opacity-20">&nbsp;&nbsp;creativity: 'unlimited'</div>
        <div className="absolute top-1/3 right-[5%] translate-y-18 font-code text-lg opacity-20">{`}`}</div>
      </div>
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-start" ref={ref}>
          <div 
            className="md:w-1/2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-100px)',
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1)'
            }}
          >
            <div className="relative mb-8">
              <div className="bg-gradient-to-tr from-blue-500/20 to-purple-500/20 absolute -inset-4 rounded-xl blur-xl"></div>
              <div className="relative z-10 overflow-hidden rounded-lg border-[3px] border-gray-800">
                <TiltProfileImage imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" />
              </div>
              
              {/* Code elements floating around image */}
              <div className="absolute -top-6 -right-6 text-blue-400 text-lg font-mono p-2 bg-gray-900/80 rounded rotate-12 animate-floating">{'<Creative />'}</div>
              <div className="absolute -bottom-6 -right-6 text-purple-400 text-lg font-mono p-2 bg-gray-900/80 rounded -rotate-6 animate-floating" style={{animationDelay: "0.8s"}}>{'{ passion }'}</div>
            </div>

            {/* Working Philosophy Card */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-blue-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-blue-400 mb-3 font-display">My Philosophy</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Great interfaces aren't just functional—they're delightful. I believe in creating digital experiences that users don't just use, but genuinely enjoy interacting with."
                </p>
              </CardContent>
            </Card>
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
              <span className="inline-block px-3 py-1 text-sm bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-full mb-4 font-code"># the_real_me</span>
              <h2 className="text-section-title font-display mb-6 text-white">
                More Than Just Code - 
                <span className="text-accent-gradient block">I'm a Digital Storyteller</span>
              </h2>
              
              <div className="space-y-6 text-body text-gray-300 font-body">
                <p className="relative">
                  <span className="absolute -left-4 top-0 text-3xl text-blue-500/30">{`{`}</span>
                  Hey there! I'm Umang, a frontend developer who believes that every pixel has a purpose and every interaction tells a story. Based in the vibrant tech scene of India, I transform complex ideas into intuitive digital experiences.
                </p>
                
                <p>
                  My journey started with a simple curiosity: "How do websites actually work?" That question led me down a rabbit hole of HTML, CSS, and JavaScript that I'm still happily exploring today. What started as weekend tinkering has evolved into a passion for crafting interfaces that don't just work—they delight.
                </p>
                
                <p>
                  When I'm not pushing pixels or debugging code, you'll find me producing music beats, capturing street photography, or diving into the latest indie game. These creative outlets aren't just hobbies—they're my secret weapons for bringing fresh perspectives to every project I touch.
                </p>
              </div>
              
              {/* Enhanced achievement cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                {achievementCards.map((card, index) => (
                  <Card key={index} className="group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-white/10 hover:border-blue-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {card.icon}
                        <div className="text-xl font-bold text-accent-gradient">{card.value}</div>
                      </div>
                      <div className="text-xs text-gray-400 font-code mb-1">{card.label}</div>
                      <div className="text-xs text-gray-500">{card.detail}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Personal interests grid */}
              <div className="mt-8">
                <h3 className="text-card-title font-display text-white mb-4">Beyond the Screen</h3>
                <div className="grid grid-cols-2 gap-4">
                  {personalityTraits.map((trait, index) => (
                    <PersonalityCard 
                      key={index}
                      icon={trait.icon}
                      title={trait.title}
                      description={trait.description}
                      color={trait.color}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Notable achievement highlight */}
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-green-400 font-code text-sm">Currently Available</span>
                </div>
                <h4 className="text-white font-display text-lg mb-2">Let's Build Something Amazing</h4>
                <p className="text-gray-400 text-sm">
                  I'm currently taking on new projects and would love to hear about your next big idea. 
                  Let's create something that users will remember.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
