
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Linkedin, Github, Twitter, ExternalLink } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
  linkedinUrl?: string;
  verified: boolean;
}

const SocialProofIntegration = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      rating: 5,
      text: "Umang delivered an exceptional React dashboard that exceeded our expectations. His attention to detail and technical expertise made the project a huge success.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1e2?w=64&h=64&fit=crop&crop=face",
      linkedinUrl: "#",
      verified: true
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      role: "CTO",
      company: "StartupXYZ",
      rating: 5,
      text: "Working with Umang was a game-changer for our frontend. He transformed our complex requirements into a beautiful, user-friendly interface.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      linkedinUrl: "#",
      verified: true
    },
    {
      id: "3",
      name: "Emily Watson",
      role: "Design Lead",
      company: "CreativeAgency",
      rating: 5,
      text: "Rare to find a developer who understands both technical implementation and design principles. Umang bridges that gap perfectly.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      linkedinUrl: "#",
      verified: true
    }
  ];

  const socialLinks = [
    {
      platform: "LinkedIn",
      icon: <Linkedin size={16} />,
      url: "https://linkedin.com/in/umang-dev",
      followers: "2.1K",
      color: "text-blue-400 hover:text-blue-300"
    },
    {
      platform: "GitHub",
      icon: <Github size={16} />,
      url: "https://github.com/umang-dev",
      followers: "850",
      color: "text-gray-400 hover:text-gray-300"
    },
    {
      platform: "Twitter",
      icon: <Twitter size={16} />,
      url: "https://twitter.com/umang_dev",
      followers: "1.2K",
      color: "text-blue-400 hover:text-blue-300"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Client Testimonials */}
      <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-white/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 font-display">
            What Clients Say
          </h3>
          
          <div className="grid gap-4">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="group bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-white/10 hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedTestimonial(testimonial.id === selectedTestimonial ? null : testimonial.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium text-sm">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs mb-2">
                        {testimonial.role} at {testimonial.company}
                      </p>
                      <div className="flex items-center gap-1 mb-2">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      {testimonial.linkedinUrl && (
                        <div className="mt-2 flex items-center gap-1 text-blue-400 hover:text-blue-300 cursor-pointer text-xs">
                          <Linkedin size={12} />
                          <span>View on LinkedIn</span>
                          <ExternalLink size={10} />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Presence */}
      <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-white/10">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold text-white mb-4 font-display">
            Connect & Follow
          </h3>
          
          <div className="grid grid-cols-3 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <div className={`mb-2 ${social.color} transition-colors`}>
                      {social.icon}
                    </div>
                    <h4 className="text-white font-medium text-sm mb-1">{social.platform}</h4>
                    <p className="text-gray-400 text-xs">{social.followers} followers</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Follow for web development tips, project updates, and industry insights
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialProofIntegration;
