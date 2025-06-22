
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Coffee, MessageSquare } from "lucide-react";

interface MeetingType {
  id: string;
  title: string;
  duration: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const CalendarScheduling = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);

  const meetingTypes: MeetingType[] = [
    {
      id: "discovery",
      title: "Project Discovery Call",
      duration: "30 minutes",
      description: "Let's discuss your project requirements and see how I can help",
      icon: <MessageSquare size={20} />,
      color: "from-blue-500/20 to-cyan-500/10"
    },
    {
      id: "consultation",
      title: "Technical Consultation",
      duration: "45 minutes",
      description: "Deep dive into technical challenges and solutions",
      icon: <Video size={20} />,
      color: "from-purple-500/20 to-pink-500/10"
    },
    {
      id: "coffee",
      title: "Virtual Coffee Chat",
      duration: "15 minutes",
      description: "Casual conversation about your ideas and goals",
      icon: <Coffee size={20} />,
      color: "from-amber-500/20 to-orange-500/10"
    }
  ];

  const handleScheduleClick = (meetingId: string) => {
    setSelectedMeeting(meetingId);
    // In a real implementation, this would open a calendar booking widget
    // For now, we'll simulate it with a placeholder
    alert("Calendar booking would open here. You can integrate with services like Calendly, Cal.com, or Google Calendar.");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="text-blue-400" size={20} />
            Schedule a Meeting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-sm mb-4">
            Choose the type of meeting that best fits your needs. All meetings are free and no-obligation.
          </p>
          
          <div className="grid gap-3">
            {meetingTypes.map((meeting) => (
              <Card
                key={meeting.id}
                className={`group relative overflow-hidden transition-all duration-300 cursor-pointer
                           bg-gradient-to-br from-gray-900/60 to-gray-800/40 border border-white/10 
                           hover:scale-102 hover:border-white/20`}
                onClick={() => handleScheduleClick(meeting.id)}
              >
                <CardContent className="p-4">
                  {/* Background gradient that appears on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${meeting.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-blue-400 group-hover:text-white transition-colors">
                        {meeting.icon}
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{meeting.title}</h4>
                        <p className="text-gray-400 text-xs group-hover:text-gray-300">
                          {meeting.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-blue-400 text-xs mb-1">
                        <Clock size={12} />
                        {meeting.duration}
                      </div>
                      <Button
                        size="sm"
                        className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 text-xs"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-blue-400 text-xs">
              💡 <strong>Pro tip:</strong> Have your project brief ready? It helps make our conversation more productive!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarScheduling;
