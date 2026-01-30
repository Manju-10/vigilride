import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { 
  Bike, MapPin, Fingerprint, Activity, Radio, Navigation, 
  Shield, AlertTriangle, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VehicleProfile {
  countryName: string;
  district: string;
  licenseNumber: string;
  authenticationKey: string;
  vehicleName: string;
  vehicleNumber: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [vehicleProfile, setVehicleProfile] = useState<VehicleProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("vehicleProfile");
    if (storedProfile) {
      setVehicleProfile(JSON.parse(storedProfile));
    }
  }, []);

  const vehicleData = {
    name: vehicleProfile?.vehicleName || "No Vehicle Registered",
    number: vehicleProfile?.vehicleNumber || "N/A",
    license: vehicleProfile?.licenseNumber || "N/A",
    engineStatus: "ON",
    gpsStatus: "active",
    fingerprintStatus: "enabled",
    motionSensorStatus: "active",
    simSignal: "strong",
    currentLocation: vehicleProfile ? `${vehicleProfile.district}, ${vehicleProfile.countryName}` : "Location not set",
  };

  const StatusIndicator = ({ status }: { status: string }) => {
    const isActive = status === "ON" || status === "active" || status === "enabled" || status === "strong";
    return (
      <span className={`status-dot ${isActive ? 'status-online' : 'status-offline'}`}></span>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 animate-slide-up">
        {/* Vehicle Header Card */}
        <Card className="shadow-elevated border-0 overflow-hidden">
          <div className="bg-gradient-primary p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h2 className="text-2xl font-display font-bold text-white mb-1">{vehicleData.name}</h2>
                <p className="text-white/80 text-lg font-mono tracking-wider">{vehicleData.number}</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg flex items-center justify-center border border-white/20">
                <Bike className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Shield className="w-4 h-4" />
              <span>License: {vehicleData.license}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto text-accent hover:text-accent/80 hover:bg-white/10"
                onClick={() => {/* UI only */}}
              >
                View Document
              </Button>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Activity className="w-4 h-4" />
                  <span>Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIndicator status={vehicleData.engineStatus} />
                  <span className="font-semibold">{vehicleData.engineStatus}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Navigation className="w-4 h-4" />
                  <span>GPS</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIndicator status={vehicleData.gpsStatus} />
                  <span className="font-semibold capitalize">{vehicleData.gpsStatus}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Fingerprint className="w-4 h-4" />
                  <span>Fingerprint</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIndicator status={vehicleData.fingerprintStatus} />
                  <span className="font-semibold capitalize">{vehicleData.fingerprintStatus}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Radio className="w-4 h-4" />
                  <span>SIM Signal</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIndicator status={vehicleData.simSignal} />
                  <span className="font-semibold capitalize">{vehicleData.simSignal}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Location Card */}
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1">Current Location</h3>
                <p className="text-muted-foreground text-sm">{vehicleData.currentLocation}</p>
                {/* Embedded Map Preview */}
                <div className="mt-3 h-32 rounded-xl overflow-hidden border border-border">
                  <iframe
                    title="Vehicle Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0977925638!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064e83c0001%3A0xa6887e97de3e3c0a!2s123%20Main%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card 
            className="shadow-elevated cursor-pointer hover:shadow-lg transition-smooth group"
            onClick={() => navigate("/location")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-smooth">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-smooth" />
              </div>
              <h3 className="font-semibold text-lg mb-1">View Full Map</h3>
              <p className="text-muted-foreground text-sm">See detailed location on map</p>
            </CardContent>
          </Card>

          <Card 
            className="shadow-elevated cursor-pointer hover:shadow-lg transition-smooth group"
            onClick={() => navigate("/track")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-smooth">
                  <Navigation className="w-6 h-6 text-success" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-success transition-smooth" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Track Vehicle</h3>
              <p className="text-muted-foreground text-sm">Real-time tracking & movement</p>
            </CardContent>
          </Card>

          <Card 
            className="shadow-elevated cursor-pointer hover:shadow-lg transition-smooth group"
            onClick={() => navigate("/biometric-management")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                  <Fingerprint className="w-6 h-6 text-primary" />
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Manage Authentication</h3>
              <p className="text-muted-foreground text-sm">Fingerprints, PINs & Patterns</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="shadow-elevated border-danger/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-danger" />
              <h3 className="font-semibold text-lg">Recent Alerts</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-danger mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Unauthorized movement detected</p>
                  <p className="text-xs text-muted-foreground mt-1">Today at 2:45 PM</p>
                </div>
                <Badge variant="destructive" className="text-xs">Critical</Badge>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Failed fingerprint authentication attempt</p>
                  <p className="text-xs text-muted-foreground mt-1">Yesterday at 11:30 AM</p>
                </div>
                <Badge variant="outline" className="text-xs border-warning text-warning">Warning</Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate("/alert-history")}
            >
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
