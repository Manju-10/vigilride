import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OTPSignIn = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    // UI only - navigate to OTP verification
    navigate("/otp");
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-success/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 mb-4 glow-accent">
            <Shield className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Sign In with OTP</h1>
          <p className="text-white/70">We'll send a verification code to your phone</p>
        </div>

        {/* OTP Sign In Form */}
        <div className="glass rounded-3xl p-8 shadow-elevated">
          <form onSubmit={handleSendOTP} className="space-y-5">
            <div>
              <Label htmlFor="mobile" className="text-white/90 mb-2 block">Mobile Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="pl-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-semibold rounded-xl shadow-lg glow-accent transition-smooth"
            >
              Send OTP
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/signin" className="text-accent hover:text-accent/80 text-sm transition-smooth">
              Sign in with Password instead
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/70 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent hover:text-accent/80 font-semibold transition-smooth">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPSignIn;
