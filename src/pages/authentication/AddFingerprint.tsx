import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Fingerprint, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FlowStep = "naming" | "scanning" | "complete";

const AddFingerprint = () => {
  const navigate = useNavigate();
  const [flowStep, setFlowStep] = useState<FlowStep>("naming");
  const [fingerprintName, setFingerprintName] = useState("");
  const [scanStep, setScanStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const totalScanSteps = 5;

  const handleNameSubmit = () => {
    if (fingerprintName.trim()) {
      setFlowStep("scanning");
      setProgress(0);
    }
  };

  const handleScanNext = () => {
    if (scanStep < totalScanSteps) {
      setScanStep(scanStep + 1);
      setProgress((scanStep / totalScanSteps) * 100);
    } else {
      setFlowStep("complete");
      setProgress(100);
    }
  };

  const handleComplete = () => {
    navigate("/biometric-management");
  };

  const getOverallProgress = () => {
    if (flowStep === "naming") return 0;
    if (flowStep === "scanning") return 10 + (scanStep / totalScanSteps) * 80;
    return 100;
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Fingerprint className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-display font-bold">Add Fingerprint</h1>
        </div>

        {/* Overall Progress */}
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                {flowStep === "naming" && "Step 1: Name Your Fingerprint"}
                {flowStep === "scanning" && `Step 2: Scanning (${scanStep}/${totalScanSteps})`}
                {flowStep === "complete" && "Step 3: Complete"}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(getOverallProgress())}%</span>
            </div>
            <Progress value={getOverallProgress()} className="h-2" />
          </CardContent>
        </Card>

        {/* Step 1: Naming */}
        {flowStep === "naming" && (
          <Card className="shadow-elevated">
            <CardContent className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Fingerprint className="w-12 h-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Name Your Fingerprint</h3>
                  <p className="text-muted-foreground">
                    Give this fingerprint a recognizable name for easy identification
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="fingerprint-name">Fingerprint Name</Label>
                <Input
                  id="fingerprint-name"
                  placeholder="e.g., Owner Thumb, Rider Index Finger"
                  value={fingerprintName}
                  onChange={(e) => setFingerprintName(e.target.value)}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  Examples: "Owner Thumb", "Rider Index Finger", "Backup Left Thumb"
                </p>
              </div>

              <Button
                onClick={handleNameSubmit}
                disabled={!fingerprintName.trim()}
                className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Scanning */}
        {flowStep === "scanning" && (
          <>
            <Card className="shadow-elevated">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <Fingerprint className="w-5 h-5 text-primary" />
                  <span className="font-medium">Registering: {fingerprintName}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elevated">
              <CardContent className="p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center animate-fingerprint">
                      <Fingerprint className="w-20 h-20 text-primary" />
                    </div>
                    {/* Scanning effect */}
                    <div className="absolute inset-0 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Place Your Finger</h3>
                    <p className="text-muted-foreground">
                      Place and lift your finger on the sensor {totalScanSteps - scanStep + 1} more times
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: totalScanSteps }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          idx < scanStep ? 'bg-success' : 'bg-muted'
                        }`}
                      >
                        {idx < scanStep && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="shadow-elevated bg-accent/5 border-accent/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Instructions</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Place your finger firmly on the sensor</li>
                  <li>• Lift your finger when prompted</li>
                  <li>• Repeat the process multiple times for accuracy</li>
                  <li>• Try to cover different parts of your fingerprint</li>
                </ul>
              </CardContent>
            </Card>

            <Button
              onClick={handleScanNext}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
            >
              {scanStep < totalScanSteps ? "Continue Scanning" : "Finish Scanning"}
            </Button>
          </>
        )}

        {/* Step 3: Complete */}
        {flowStep === "complete" && (
          <Card className="shadow-elevated">
            <CardContent className="p-12">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-32 h-32 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-20 h-20 text-success" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-success">Fingerprint Added!</h3>
                  <p className="text-muted-foreground">
                    "{fingerprintName}" has been successfully registered
                  </p>
                </div>

                <Button
                  onClick={handleComplete}
                  className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
                >
                  Complete Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          onClick={() => navigate("/biometric-management")}
          variant="ghost"
          className="w-full"
        >
          Cancel
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default AddFingerprint;
