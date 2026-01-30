import DashboardLayout from "@/components/DashboardLayout";
import { Shield, Phone, MapPin, Navigation, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const ContactPolice = () => {
  const { toast } = useToast();
  
  const nearbyStations = [
    {
      name: "Central Police Station",
      distance: "0.8 km",
      phone: "+1 234 567 8900",
      address: "456 Central Ave, San Francisco, CA",
      responseTime: "~5 mins",
    },
    {
      name: "West District Station",
      distance: "2.3 km",
      phone: "+1 234 567 8901",
      address: "789 West St, San Francisco, CA",
      responseTime: "~8 mins",
    },
    {
      name: "North Police Headquarters",
      distance: "3.7 km",
      phone: "+1 234 567 8902",
      address: "321 North Blvd, San Francisco, CA",
      responseTime: "~12 mins",
    },
  ];

  const handleEmergencyCall = (phone: string) => {
    // UI only
    window.location.href = `tel:${phone}`;
  };

  const handleShareTrackingLink = (stationName: string) => {
    // UI only - simulates sharing tracking link
    toast({
      title: "Tracking Link Shared",
      description: `Live tracking link shared with ${stationName}`,
    });
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-danger" />
          <h1 className="text-3xl font-display font-bold">Contact Nearby Police</h1>
        </div>

        {/* Emergency Alert */}
        <Card className="shadow-elevated border-danger/30 bg-danger/5">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-danger/20">
                <Shield className="w-8 h-8 text-danger animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Emergency Assistance</h3>
                <p className="text-muted-foreground">
                  In case of theft or emergency, contact the nearest police station immediately
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-danger hover:bg-danger/90 glow-danger"
                onClick={() => handleEmergencyCall("911")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency (911)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Nearby Police Stations */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Nearby Police Stations
          </h2>
          <div className="space-y-4">
            {nearbyStations.map((station, idx) => (
              <Card key={idx} className="shadow-elevated hover:shadow-lg transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{station.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        <span>{station.address}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-accent font-medium">{station.distance} away</span>
                        <span className="text-muted-foreground">Est. {station.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button
                      onClick={() => handleEmergencyCall(station.phone)}
                      className="bg-danger hover:bg-danger/90"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={() => handleShareTrackingLink(station.name)}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Tracking Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              Safety Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Stay calm and provide your exact location</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Share live tracking data with authorities</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Do not attempt to confront suspects yourself</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Keep your trusted contacts informed</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ContactPolice;
