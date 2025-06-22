
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, MessageCircle, Calendar, Zap, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AvailabilityStatus from "@/components/AvailabilityStatus";
import CalendarScheduling from "@/components/CalendarScheduling";
import SocialProofIntegration from "@/components/SocialProofIntegration";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "",
    budget: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypes = [
    "Website Development",
    "Web Application",
    "E-commerce Store",
    "Landing Page",
    "Dashboard/Admin Panel",
    "API Integration",
    "Other"
  ];

  const budgetRanges = [
    "$1K - $5K",
    "$5K - $10K",
    "$10K - $25K",
    "$25K+",
    "Let's discuss"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully! 🚀",
        description: "I'll get back to you within 24 hours. Thank you for reaching out!",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        projectType: "",
        budget: "",
        timeline: ""
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-section-title font-display mb-6 text-accent-gradient">
            Let's Build Something Amazing Together
          </h2>
          <div className="w-24 h-1 accent-gradient mx-auto mb-8 rounded-full"></div>
          <p className="text-body-large text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to turn your ideas into reality? Let's discuss your project and create something extraordinary.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <MessageCircle className="text-blue-400" size={20} />
                  Start Your Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800/60 border-gray-700 text-white focus:border-blue-500"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800/60 border-gray-700 text-white focus:border-blue-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Project Type</label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                        className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select project type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Budget Range</label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full p-3 bg-gray-800/60 border border-gray-700 rounded-md text-white focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Subject</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="bg-gray-800/60 border-gray-700 text-white focus:border-blue-500"
                      placeholder="Brief project description"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Project Details *</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-gray-800/60 border-gray-700 text-white focus:border-blue-500 resize-none"
                      placeholder="Tell me about your project goals, requirements, and any specific features you need..."
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Timeline</label>
                    <Input
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="bg-gray-800/60 border-gray-700 text-white focus:border-blue-500"
                      placeholder="When do you need this completed?"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 transition-all duration-300 hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={18} />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>

                {/* Quick Contact Options */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-3">Prefer a quicker chat?</p>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-colors">
                      <Mail size={12} className="mr-1" />
                      umang@example.com
                    </Badge>
                    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 cursor-pointer hover:bg-green-500/30 transition-colors">
                      <MessageCircle size={12} className="mr-1" />
                      WhatsApp Chat
                    </Badge>
                    <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/30 cursor-pointer hover:bg-purple-500/30 transition-colors">
                      <Calendar size={12} className="mr-1" />
                      Schedule Call
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability Status */}
            <AvailabilityStatus />

            {/* Calendar Scheduling */}
            <CalendarScheduling />

            {/* Response Promise */}
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="text-yellow-400" size={16} />
                  <span className="text-yellow-400 font-medium text-sm">My Promise</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <Clock size={12} className="text-green-400" />
                    Quick response within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <MessageCircle size={12} className="text-blue-400" />
                    Free project consultation
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar size={12} className="text-purple-400" />
                    Flexible meeting scheduling
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="mt-16">
          <SocialProofIntegration />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
