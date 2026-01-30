import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [mobile] = useState("+1 234 567 8900"); // Mock mobile number

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      // UI only - navigate to dashboard
      navigate("/");
    }
  };

  const handleResend = () => {
    // UI only - show toast or feedback
    setOtp("");
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 mb-4 glow-accent">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Verify Your Number</h1>
          <p className="text-white/70">Enter the 6-digit code sent to</p>
          <p className="text-accent font-semibold mt-1">{mobile}</p>
        </div>

        {/* OTP Form */}
        <div className="glass rounded-3xl p-8 shadow-elevated">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex flex-col items-center gap-6">
              <Smartphone className="w-16 h-16 text-accent/50" />
              
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-14 text-xl bg-white/5 border-white/20 text-white" />
                  <InputOTPSlot index={1} className="w-12 h-14 text-xl bg-white/5 border-white/20 text-white" />
                  <InputOTPSlot index={2} className="w-12 h-14 text-xl bg-white/5 border-white/20 text-white" />
                  <InputOTPSlot index={3} className="w-12 h-14 text-xl bg-white/5 border-white/20 text-white" />
                  <InputOTPSlot index={4} className="w-12 h-14 text-xl bg-white/5 border-white/20 text-white" />
                  <InputOTPSlot index={5} className="w-12 h-14 text-xl bg-white/5 border-white/20 text-white" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-lg glow-accent transition-smooth"
              disabled={otp.length !== 6}
            >
              Verify & Continue
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-white/70 text-sm">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                className="text-accent hover:text-accent/80 font-semibold transition-smooth"
              >
                Resend OTP
              </button>
            </p>
            <Link to="/signin" className="block text-white/50 hover:text-white/80 text-sm transition-smooth">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
