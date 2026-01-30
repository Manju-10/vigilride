import DashboardLayout from "@/components/DashboardLayout";
import { Shield, Target, Eye, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-display font-bold">About VigilRide</h1>
        </div>

        {/* App Abstract */}
        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <h2 className="text-2xl font-display font-bold mb-4">App Abstract</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              VigilRide is a cutting-edge smart vehicle security system that combines biometric authentication, 
              real-time GPS tracking, and instant theft alerts to provide comprehensive protection for your vehicle.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our innovative platform integrates fingerprint sensors, motion detectors, and GSM technology to create 
              a multi-layered security ecosystem. When unauthorized access is detected, the system immediately alerts 
              you and your trusted contacts, enabling quick response to potential theft situations.
            </p>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To create a world where vehicle theft is a thing of the past. We envision a future where advanced 
              biometric technology and smart alerts work seamlessly together to provide complete peace of mind to 
              vehicle owners worldwide.
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Target className="w-6 h-6 text-success" />
              </div>
              <h2 className="text-2xl font-display font-bold">Our Mission</h2>
            </div>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">•</span>
                <span>Provide affordable, cutting-edge vehicle security technology to everyone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">•</span>
                <span>Continuously innovate to stay ahead of security threats</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">•</span>
                <span>Create an intuitive user experience that makes security effortless</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-bold">•</span>
                <span>Build a community of protected drivers who feel safe and secure</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Core Values */}
        <Card className="shadow-elevated bg-gradient-to-br from-accent/5 to-success/5">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center">
                <Heart className="w-6 h-6 text-danger" />
              </div>
              <h2 className="text-2xl font-display font-bold">Core Values</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Security First</h3>
                <p className="text-sm text-muted-foreground">
                  Your safety is our top priority. Every feature is designed with security in mind.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  We constantly evolve our technology to provide the best protection available.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Reliability</h3>
                <p className="text-sm text-muted-foreground">
                  24/7 monitoring and instant alerts you can count on when it matters most.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">User Privacy</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is encrypted and protected. We never compromise on privacy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default About;
