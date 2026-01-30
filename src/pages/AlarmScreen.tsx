import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const AlarmScreen = () => {
  const navigate = useNavigate();
  const [flash, setFlash] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlash((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleStopAlarm = () => {
    navigate("/track");
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500 ${
        flash ? "bg-danger" : "bg-white"
      }`}
    >
      <div className="text-center space-y-8 animate-slide-up">
        {/* Alarm Icon */}
        <div className="relative">
          <div
            className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto animate-shake ${
              flash ? "bg-white/20" : "bg-danger/20"
            }`}
          >
            <AlertTriangle
              className={`w-20 h-20 ${flash ? "text-white" : "text-danger"}`}
            />
          </div>
          {/* Pulsing circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-40 h-40 rounded-full border-4 animate-ping ${
                flash ? "border-white/50" : "border-danger/50"
              }`}
            ></div>
          </div>
        </div>

        {/* Alert Message */}
        <div className={`space-y-4 ${flash ? "text-white" : "text-danger"}`}>
          <h1 className="text-5xl font-display font-bold animate-pulse">
            SECURITY ALERT!
          </h1>
          <p className="text-2xl font-semibold">Unauthorized Movement Detected</p>
          <p className="text-lg opacity-90">
            Your vehicle is being accessed without authorization
          </p>
        </div>

        {/* Status Messages */}
        <div
          className={`space-y-2 text-sm ${
            flash ? "text-white/90" : "text-danger/90"
          }`}
        >
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            Authorities have been notified
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            Trusted contacts alerted
          </p>
          <p className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
            GPS tracking active
          </p>
        </div>

        {/* Stop Alarm Button */}
        <div className="pt-8">
          <Button
            onClick={handleStopAlarm}
            size="lg"
            className={`h-16 px-12 text-xl font-bold shadow-2xl hover:scale-105 transition-all ${
              flash
                ? "bg-white text-danger hover:bg-white/90"
                : "bg-danger text-white hover:bg-danger/90"
            }`}
          >
            <VolumeX className="w-6 h-6 mr-3" />
            STOP ALARM
          </Button>
        </div>

        {/* Emergency Info */}
        <div
          className={`text-xs ${flash ? "text-white/70" : "text-danger/70"}`}
        >
          <p>If this was not you, press "Stop Alarm" to view live tracking</p>
        </div>
      </div>
    </div>
  );
};

export default AlarmScreen;
