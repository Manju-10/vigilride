import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { MapPin, Navigation, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CurrentLocation = () => {
  const navigate = useNavigate();
  
  const locationData = {
    address: "123 Main St, San Francisco, CA 94102",
    latitude: "37.7749° N",
    longitude: "122.4194° W",
    lastUpdated: "2 minutes ago",
    accuracy: "High (±5m)",
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-display font-bold">Current Location</h1>
          </div>
          <Button 
            onClick={() => navigate("/track")}
            className="bg-accent hover:bg-accent/90"
          >
            <Navigation className="w-4 h-4 mr-2" />
            Track Location
          </Button>
        </div>

        {/* Map Container */}
        <Card className="shadow-elevated">
          <CardContent className="p-0">
            {/* Mock Map */}
            <div className="relative h-[400px] md:h-[500px] rounded-t-xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977776214!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Current Vehicle Location"
                className="w-full h-full"
              />
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button size="icon" className="bg-white/90 hover:bg-white shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button size="icon" className="bg-white/90 hover:bg-white shadow-lg">
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Location Details */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">ADDRESS</h3>
                <p className="text-lg">{locationData.address}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">LATITUDE</h3>
                  <p>{locationData.latitude}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">LONGITUDE</h3>
                  <p>{locationData.longitude}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">LAST UPDATED</h3>
                  <p className="text-success">{locationData.lastUpdated}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">ACCURACY</h3>
                  <p>{locationData.accuracy}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button className="h-14 bg-accent hover:bg-accent/90">
            <Navigation className="w-5 h-5 mr-2" />
            Get Directions
          </Button>
          <Button variant="outline" className="h-14">
            <MapPin className="w-5 h-5 mr-2" />
            Share Location
          </Button>
          <Button variant="outline" className="h-14">
            Refresh Location
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CurrentLocation;
