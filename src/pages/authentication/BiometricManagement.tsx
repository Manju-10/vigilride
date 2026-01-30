import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Fingerprint, Lock, Grid3x3, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const BiometricManagement = () => {
  const navigate = useNavigate();
  const [fingerprints] = useState([
    { id: 1, name: "Right Thumb", addedOn: "2024-01-15" },
    { id: 2, name: "Right Index", addedOn: "2024-01-15" },
  ]);
  const [patterns] = useState([
    { id: 1, name: "Pattern 1", addedOn: "2024-01-16" },
  ]);
  const [pins] = useState([
    { id: 1, name: "6-digit PIN", addedOn: "2024-01-16" },
  ]);

  const maxFingerprints = 3;
  const canAddMoreFingerprints = fingerprints.length < maxFingerprints;

  const handleAddFingerprint = () => {
    if (canAddMoreFingerprints) {
      navigate("/add-fingerprint");
    } else {
      navigate("/subscription");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Fingerprint className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-display font-bold">Biometric Management</h1>
          </div>
          <Button
            onClick={() => navigate("/authorized-owners")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Authorized Owners
          </Button>
        </div>

        {/* Fingerprints Section */}
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">Fingerprints</h3>
                <Badge variant="secondary">{fingerprints.length}/{maxFingerprints}</Badge>
              </div>
              <Button
                onClick={handleAddFingerprint}
                className={canAddMoreFingerprints ? "bg-primary hover:bg-primary/90" : "bg-warning hover:bg-warning/90 text-foreground"}
              >
                <Plus className="w-4 h-4 mr-2" />
                {canAddMoreFingerprints ? "Add Fingerprint" : "Upgrade to Add More"}
              </Button>
            </div>

            {!canAddMoreFingerprints && (
              <div className="mb-4 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <p className="text-sm text-warning-foreground">
                  You've reached the maximum of 3 fingerprints. Upgrade your subscription to add more.
                </p>
              </div>
            )}

            <div className="space-y-3">
              {fingerprints.map((fp) => (
                <div key={fp.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-smooth">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Fingerprint className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{fp.name}</p>
                      <p className="text-sm text-muted-foreground">Added on {fp.addedOn}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-danger hover:text-danger/80 hover:bg-danger/10"
                    onClick={() => toast.success("Fingerprint removed")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patterns Section */}
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Grid3x3 className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-lg">Patterns</h3>
                <Badge variant="secondary">{patterns.length}</Badge>
              </div>
              <Button
                onClick={() => navigate("/add-pattern")}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Pattern
              </Button>
            </div>

            <div className="space-y-3">
              {patterns.map((pattern) => (
                <div key={pattern.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-smooth">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Grid3x3 className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{pattern.name}</p>
                      <p className="text-sm text-muted-foreground">Added on {pattern.addedOn}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-danger hover:text-danger/80 hover:bg-danger/10"
                    onClick={() => toast.success("Pattern removed")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* PINs Section */}
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-success" />
                <h3 className="font-semibold text-lg">PINs</h3>
                <Badge variant="secondary">{pins.length}</Badge>
              </div>
              <Button
                onClick={() => navigate("/add-pin")}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add PIN
              </Button>
            </div>

            <div className="space-y-3">
              {pins.map((pin) => (
                <div key={pin.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-smooth">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">{pin.name}</p>
                      <p className="text-sm text-muted-foreground">Added on {pin.addedOn}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-danger hover:text-danger/80 hover:bg-danger/10"
                    onClick={() => toast.success("PIN removed")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Security Recommendations</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Keep your authentication methods private and secure</li>
              <li>• Register multiple authentication methods as backup</li>
              <li>• Update your PIN regularly for enhanced security</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BiometricManagement;
