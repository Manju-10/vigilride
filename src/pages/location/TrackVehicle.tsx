import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Navigation, Play, Pause, Clock, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TrackVehicle = () => {
  const navigate = useNavigate();
  const [isTracking, setIsTracking] = useState(false);

  const trackingData = {
    currentSpeed: "45 km/h",
    distance: "12.5 km",
    duration: "18 minutes",
    status: "Moving",
  };

  const timeline = [
    { time: "3:45 PM", location: "Main St & Oak Ave", speed: "40 km/h" },
    { time: "3:30 PM", location: "Park Street", speed: "35 km/h" },
    { time: "3:15 PM", location: "Downtown Plaza", speed: "20 km/h" },
    { time: "3:00 PM", location: "Home - 123 Elm St", speed: "0 km/h" },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Navigation className="w-8 h-8 text-success" />
            <h1 className="text-3xl font-display font-bold">Track Vehicle</h1>
          </div>
          <Badge variant={isTracking ? "default" : "secondary"} className="text-sm px-4 py-2">
            {isTracking ? "Tracking Active" : "Tracking Paused"}
          </Badge>
        </div>

        {/* Tracking Map */}
        <Card className="shadow-elevated">
          <CardContent className="p-0">
            <div className="relative h-[350px] rounded-t-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977776214!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vehicle Tracking Map"
                className="w-full h-full"
              />
            </div>

            {/* Tracking Stats */}
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{trackingData.currentSpeed}</div>
                <div className="text-sm text-muted-foreground mt-1">Current Speed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{trackingData.distance}</div>
                <div className="text-sm text-muted-foreground mt-1">Distance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{trackingData.duration}</div>
                <div className="text-sm text-muted-foreground mt-1">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{trackingData.status}</div>
                <div className="text-sm text-muted-foreground mt-1">Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Control Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => setIsTracking(!isTracking)}
            className={`w-full h-16 text-lg font-semibold shadow-lg ${
              isTracking 
                ? "bg-danger hover:bg-danger/90 glow-danger" 
                : "bg-success hover:bg-success/90 glow-success text-foreground"
            }`}
          >
            {isTracking ? (
              <>
                <Pause className="w-6 h-6 mr-2" />
                Stop Tracking
              </>
            ) : (
              <>
                <Play className="w-6 h-6 mr-2" />
                Start Tracking
              </>
            )}
          </Button>
          
          <Button
            onClick={() => navigate("/contact-police")}
            variant="outline"
            className="w-full h-14 text-lg font-semibold border-danger text-danger hover:bg-danger hover:text-white"
          >
            <Shield className="w-5 h-5 mr-2" />
            Contact Police
          </Button>
        </div>

        {/* Location Timeline */}
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-lg">Location Timeline</h3>
            </div>
            <div className="space-y-4">
              {timeline.map((entry, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${idx === 0 ? 'bg-success animate-pulse' : 'bg-muted'}`}></div>
                    {idx < timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-muted my-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{entry.time}</span>
                      <Badge variant="outline" className="text-xs">{entry.speed}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{entry.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TrackVehicle;
