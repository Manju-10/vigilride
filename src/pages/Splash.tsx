import { Radio } from "lucide-react";
import logo from "@/assets/logo.svg";

const Splash = () => {
  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center px-8 animate-slide-up">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img src={logo} alt="VigilRide" className="w-32 h-32 rounded-3xl shadow-elevated glow-accent" />
            <Radio className="absolute -top-2 -right-2 w-8 h-8 text-success animate-pulse" />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-5xl font-display font-bold text-white mb-3 tracking-tight">
          VigilRide
        </h1>
        <p className="text-accent text-lg font-medium mb-8">
          Smart Vehicle Security System
        </p>
        
        {/* Tagline */}
        <p className="text-white/80 max-w-md mx-auto text-sm leading-relaxed mb-12">
          Powered by Biometrics & Instant Theft Alerts
        </p>

        {/* Loading indicator */}
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-success rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
