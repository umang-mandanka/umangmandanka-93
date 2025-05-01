
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Mail, Phone, MessageSquare, Send } from "lucide-react";
import useScrollReveal from "@/hooks/useScrollReveal";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I will get back to you soon.",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleFocus = (field: string) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/10%),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-2 text-white">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a project in mind or want to work together? Feel free to reach out!
          </p>
        </div>
        
        <div 
          ref={ref} 
          className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.7s ease-out'
          }}
        >
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-white">Contact Information</h3>
            <p className="text-gray-400 mb-8">
              Feel free to contact me via email or phone, or send a message using the form.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center group hover:bg-gray-800/50 p-4 rounded-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 rounded-full mr-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
                  <Mail className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a 
                    href="mailto:hello@example.com" 
                    className="font-medium text-white hover:text-blue-400 transition-colors transform hover:scale-105 inline-block"
                  >
                    umang.mandnaka@example.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center group hover:bg-gray-800/50 p-4 rounded-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 rounded-full mr-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
                  <Phone className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a 
                    href="tel:+1234567890" 
                    className="font-medium text-white hover:text-blue-400 transition-colors transform hover:scale-105 inline-block"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              
              <div className="flex items-center group hover:bg-gray-800/50 p-4 rounded-lg transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3 rounded-full mr-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
                  <MessageSquare className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Social Media</p>
                  <div className="flex gap-4 mt-2">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                       className="text-white hover:text-blue-400 transition-all hover:scale-125 transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                       className="text-white hover:text-blue-400 transition-all hover:scale-125 transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                       className="text-white hover:text-blue-400 transition-all hover:scale-125 transform">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Image with interactive hover effect */}
            <div className="mt-8 relative overflow-hidden rounded-lg border border-gray-700 group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Location Map" 
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/40 backdrop-blur-sm p-6 rounded-lg border border-gray-700 shadow-xl">
              <div className="relative">
                <Label htmlFor="name" className="text-gray-300">Your Name</Label>
                <div className={`relative overflow-hidden rounded-md transition-all duration-300 ${focusedField === 'name' ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-700'}`}>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    required
                    className="bg-gray-900/70 border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ${focusedField === 'name' ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
              
              <div className="relative">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <div className={`relative overflow-hidden rounded-md transition-all duration-300 ${focusedField === 'email' ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-700'}`}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="johndoe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    required
                    className="bg-gray-900/70 border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
              
              <div className="relative">
                <Label htmlFor="subject" className="text-gray-300">Subject</Label>
                <div className={`relative overflow-hidden rounded-md transition-all duration-300 ${focusedField === 'subject' ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-700'}`}>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    required
                    className="bg-gray-900/70 border-0 text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ${focusedField === 'subject' ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
              
              <div className="relative">
                <Label htmlFor="message" className="text-gray-300">Message</Label>
                <div className={`relative overflow-hidden rounded-md transition-all duration-300 ${focusedField === 'message' ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-700'}`}>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full rounded-md bg-gray-900/70 border-0 text-white px-3 py-2 text-sm focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="I'd like to discuss a project with you..."
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    required
                  />
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ${focusedField === 'message' ? 'w-full' : 'w-0'}`}></div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 relative overflow-hidden group" 
                disabled={isSubmitting}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-blue-600 group-hover:from-purple-700 group-hover:to-blue-700"></span>
                <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className={`h-4 w-4 ${isSubmitting ? 'animate-ping' : 'group-hover:translate-x-1 transition-transform'}`} />
                </span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
