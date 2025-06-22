
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, CheckCircle, AlertCircle } from "lucide-react";

const AvailabilityStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    // Check availability based on time (9 AM - 6 PM IST, Mon-Fri)
    const checkAvailability = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      
      // Monday = 1, Friday = 5
      const isWeekday = day >= 1 && day <= 5;
      const isWorkingHours = hour >= 9 && hour <= 18;
      
      setIsAvailable(isWeekday && isWorkingHours);
    };

    checkAvailability();
    return () => clearInterval(timer);
  }, []);

  const getResponseTime = () => {
    if (isAvailable) {
      return "Usually responds within 2-4 hours";
    }
    return "Usually responds within 24 hours";
  };

  const getStatusText = () => {
    if (isAvailable) {
      return "Available for new projects";
    }
    return "Currently offline";
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 border border-white/10">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-400 animate-pulse' : 'bg-orange-400'}`}></div>
          <span className={`font-medium ${isAvailable ? 'text-green-400' : 'text-orange-400'}`}>
            {getStatusText()}
          </span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{getResponseTime()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>Mon-Fri, 9 AM - 6 PM IST</span>
          </div>
          <div className="flex items-center gap-2">
            {isAvailable ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
            <span>
              {isAvailable ? "Ready to discuss your project" : "Will get back to you soon"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityStatus;
