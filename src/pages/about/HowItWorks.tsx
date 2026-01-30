import DashboardLayout from "@/components/DashboardLayout";
import { Shield, Key, Activity, Bell, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Key,
      title: "1. Key Insertion & Authentication",
      description: "When you insert your key, the system prompts for biometric authentication (fingerprint, PIN, or pattern).",
      color: "accent",
    },
    {
      icon: Shield,
      title: "2. Biometric Verification",
      description: "Your fingerprint or PIN is verified against authorized users. Only registered users can start the vehicle.",
      color: "success",
    },
    {
      icon: Activity,
      title: "3. Motion Detection",
      description: "If the vehicle moves without proper authentication, the motion sensor immediately triggers an alert.",
      color: "warning",
    },
    {
      icon: Bell,
      title: "4. Alarm System Activated",
      description: "A loud alarm sounds and notifications are sent to your phone and trusted contacts instantly.",
      color: "danger",
    },
    {
      icon: MapPin,
      title: "5. Real-Time Tracking",
      description: "GPS tracking begins immediately, allowing you to monitor your vehicle's location in real-time.",
      color: "accent",
    },
    {
      icon: Phone,
      title: "6. Contact Police",
      description: "One-tap access to nearby police stations with live location sharing to help recover your vehicle quickly.",
      color: "primary",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      accent: { bg: "bg-accent/10", text: "text-accent" },
      success: { bg: "bg-success/10", text: "text-success" },
      warning: { bg: "bg-warning/10", text: "text-warning" },
      danger: { bg: "bg-danger/10", text: "text-danger" },
      primary: { bg: "bg-primary/10", text: "text-primary" },
    };
    return colorMap[color] || colorMap.accent;
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-display font-bold">How VigilRide Works</h1>
        </div>

        {/* Intro */}
        <Card className="shadow-elevated bg-gradient-primary">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-display font-bold text-white mb-3">
              Smart Protection in 6 Simple Steps
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              VigilRide uses advanced biometric technology and real-time alerts to create a comprehensive 
              security system that protects your vehicle 24/7.
            </p>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, idx) => {
            const colors = getColorClasses(step.color);
            return (
              <Card key={idx} className="shadow-elevated hover:shadow-lg transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Key Features */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20">
          <CardContent className="p-8">
            <h2 className="text-2xl font-display font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  Biometric Security
                </h3>
                <p className="text-sm text-muted-foreground">
                  Multiple authentication methods including fingerprint, PIN, and pattern lock
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-success" />
                  GPS Tracking
                </h3>
                <p className="text-sm text-muted-foreground">
                  Real-time location monitoring with movement history and route tracking
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-warning" />
                  Instant Alerts
                </h3>
                <p className="text-sm text-muted-foreground">
                  Immediate notifications to you and trusted contacts when threats are detected
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-danger" />
                  Emergency Response
                </h3>
                <p className="text-sm text-muted-foreground">
                  Quick access to nearby authorities with live location sharing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HowItWorks;
