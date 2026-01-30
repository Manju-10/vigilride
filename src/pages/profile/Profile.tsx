import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { User, Mail, Phone, LogOut, Car, Key, FileText, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface VehicleProfile {
  countryName: string;
  district: string;
  licenseNumber: string;
  authenticationKey: string;
  vehicleName: string;
  vehicleNumber: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [vehicleData, setVehicleData] = useState<VehicleProfile | null>(null);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Load user profile from localStorage
    const savedUserProfile = localStorage.getItem("userProfile");
    if (savedUserProfile) {
      const parsed = JSON.parse(savedUserProfile);
      setProfileData({
        name: parsed.name || "",
        email: parsed.email || "",
        mobile: parsed.mobile || "",
      });
    }

    // Load vehicle profile from localStorage
    const savedVehicleProfile = localStorage.getItem("vehicleProfile");
    if (savedVehicleProfile) {
      setVehicleData(JSON.parse(savedVehicleProfile));
    }
  }, []);

  const handleSave = () => {
    // Persist updated profile data to localStorage
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/signin");
  };

  const validatePasswordForm = () => {
    const errors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!passwordData.oldPassword) {
      errors.oldPassword = "Old password is required";
      isValid = false;
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setPasswordErrors(errors);
    return isValid;
  };

  const handlePasswordChange = () => {
    if (validatePasswordForm()) {
      toast.success("Password changed successfully");
      setIsPasswordModalOpen(false);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordErrors({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  const handleClosePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordErrors({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setShowOldPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-display font-bold">My Profile</h1>
        </div>

        {/* Profile Header */}
        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <ProfileAvatar name={profileData.name} />
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground">Primary Owner</p>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form */}
        <Card className="shadow-elevated">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                >
                  Edit Profile
                </Button>
              )}
            </div>

            <div className="space-y-5">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <Label htmlFor="mobile" className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={profileData.mobile}
                  onChange={(e) => setProfileData({ ...profileData, mobile: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vehicle Information */}
        <Card className="shadow-elevated">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">Vehicle Information</h3>
            </div>

            {vehicleData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <Label className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <Car className="w-4 h-4" />
                    Vehicle Name / Model
                  </Label>
                  <Input value={vehicleData.vehicleName} disabled />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    Vehicle Number
                  </Label>
                  <Input value={vehicleData.vehicleNumber} disabled />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    License Number
                  </Label>
                  <Input value={vehicleData.licenseNumber} disabled />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2 text-muted-foreground">
                    <Key className="w-4 h-4" />
                    Authentication Key
                  </Label>
                  <Input value="••••••••" disabled />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2 text-muted-foreground">
                    Country
                  </Label>
                  <Input value={vehicleData.countryName} disabled />
                </div>

                <div>
                  <Label className="flex items-center gap-2 mb-2 text-muted-foreground">
                    District
                  </Label>
                  <Input value={vehicleData.district} disabled />
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Car className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No vehicle information registered yet.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => navigate("/complete-profile")}
                >
                  Complete Profile
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Account Actions</h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start h-12"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-12 text-danger hover:text-danger hover:bg-danger/10"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={handleClosePasswordModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent" />
              Change Password
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="oldPassword" className="mb-2 block">Old Password</Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter old password"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                  className={passwordErrors.oldPassword ? "border-danger" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showOldPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.oldPassword && (
                <p className="text-danger text-sm mt-1">{passwordErrors.oldPassword}</p>
              )}
            </div>

            <div>
              <Label htmlFor="newPassword" className="mb-2 block">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className={passwordErrors.newPassword ? "border-danger" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-danger text-sm mt-1">{passwordErrors.newPassword}</p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="mb-2 block">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className={passwordErrors.confirmPassword ? "border-danger" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-danger text-sm mt-1">{passwordErrors.confirmPassword}</p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleClosePasswordModal}>
              Cancel
            </Button>
            <Button onClick={handlePasswordChange} className="bg-accent hover:bg-accent/90">
              Save Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Profile;
