import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    countryName: "",
    district: "",
    licenseNumber: "",
    authenticationKey: "",
    vehicleName: "",
    vehicleNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.countryName.trim()) {
      newErrors.countryName = "Country name is required";
    }
    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    }
    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = "License number is required";
    }
    if (!formData.authenticationKey.trim()) {
      newErrors.authenticationKey = "Authentication key is required";
    }
    if (!formData.vehicleName.trim()) {
      newErrors.vehicleName = "Vehicle name/model is required";
    }
    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAndContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Mark profile as completed
      localStorage.setItem("profileCompleted", "true");
      localStorage.setItem("vehicleProfile", JSON.stringify(formData));
      
      toast({
        title: "Profile Completed",
        description: "Your vehicle profile has been saved successfully.",
      });
      
      navigate("/");
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-success/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 mb-4 glow-success">
            <Shield className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Complete Your Profile</h1>
          <p className="text-white/70">We need some information about your vehicle to get started</p>
        </div>

        {/* Profile Form */}
        <div className="glass rounded-3xl p-8 shadow-elevated">
          <form onSubmit={handleSaveAndContinue} className="space-y-6">
            {/* Two-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country Name */}
              <div>
                <Label htmlFor="countryName" className="text-white/90 mb-2 block">
                  Country Name<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="countryName"
                  type="text"
                  placeholder="Enter your country name"
                  value={formData.countryName}
                  onChange={(e) => handleInputChange("countryName", e.target.value)}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 ${
                    errors.countryName ? "border-destructive" : ""
                  }`}
                />
                {errors.countryName && (
                  <p className="text-destructive text-sm mt-1">{errors.countryName}</p>
                )}
              </div>

              {/* District */}
              <div>
                <Label htmlFor="district" className="text-white/90 mb-2 block">
                  District<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="district"
                  type="text"
                  placeholder="Enter your district name"
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 ${
                    errors.district ? "border-destructive" : ""
                  }`}
                />
                {errors.district && (
                  <p className="text-destructive text-sm mt-1">{errors.district}</p>
                )}
              </div>

              {/* License Number */}
              <div>
                <Label htmlFor="licenseNumber" className="text-white/90 mb-2 block">
                  License Number<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="licenseNumber"
                  type="text"
                  placeholder="Enter license number"
                  value={formData.licenseNumber}
                  onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 ${
                    errors.licenseNumber ? "border-destructive" : ""
                  }`}
                />
                {errors.licenseNumber && (
                  <p className="text-destructive text-sm mt-1">{errors.licenseNumber}</p>
                )}
              </div>

              {/* Authentication Key */}
              <div>
                <Label htmlFor="authenticationKey" className="text-white/90 mb-2 block">
                  Enter Authentication Key<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="authenticationKey"
                  type="text"
                  placeholder="Enter Authentication Key"
                  value={formData.authenticationKey}
                  onChange={(e) => handleInputChange("authenticationKey", e.target.value)}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 ${
                    errors.authenticationKey ? "border-destructive" : ""
                  }`}
                />
                {errors.authenticationKey && (
                  <p className="text-destructive text-sm mt-1">{errors.authenticationKey}</p>
                )}
              </div>

              {/* Vehicle Name / Model */}
              <div>
                <Label htmlFor="vehicleName" className="text-white/90 mb-2 block">
                  Vehicle Name / Model<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="vehicleName"
                  type="text"
                  placeholder="e.g., Royal Enfield Classic 350"
                  value={formData.vehicleName}
                  onChange={(e) => handleInputChange("vehicleName", e.target.value)}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 ${
                    errors.vehicleName ? "border-destructive" : ""
                  }`}
                />
                {errors.vehicleName && (
                  <p className="text-destructive text-sm mt-1">{errors.vehicleName}</p>
                )}
              </div>

              {/* Vehicle Number */}
              <div>
                <Label htmlFor="vehicleNumber" className="text-white/90 mb-2 block">
                  Vehicle Number<span className="text-destructive">*</span>
                </Label>
                <Input
                  id="vehicleNumber"
                  type="text"
                  placeholder="e.g., TN 03BL 1234"
                  value={formData.vehicleNumber}
                  onChange={(e) => handleInputChange("vehicleNumber", e.target.value)}
                  className={`bg-white/5 border-white/20 text-white placeholder:text-white/40 h-12 ${
                    errors.vehicleNumber ? "border-destructive" : ""
                  }`}
                />
                {errors.vehicleNumber && (
                  <p className="text-destructive text-sm mt-1">{errors.vehicleNumber}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-success hover:bg-success/90 text-foreground font-semibold rounded-xl shadow-lg glow-success transition-smooth mt-8"
            >
              Save & Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
