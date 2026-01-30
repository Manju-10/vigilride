import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Lock, Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const AddPIN = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState<"enter" | "confirm">("enter");

  const maxLength = 6;

  const handleNumberClick = (num: string) => {
    if (step === "enter" && pin.length < maxLength) {
      setPin(pin + num);
    } else if (step === "confirm" && confirmPin.length < maxLength) {
      setConfirmPin(confirmPin + num);
    }
  };

  const handleDelete = () => {
    if (step === "enter") {
      setPin(pin.slice(0, -1));
    } else {
      setConfirmPin(confirmPin.slice(0, -1));
    }
  };

  const handleContinue = () => {
    if (step === "enter" && pin.length === maxLength) {
      setStep("confirm");
    } else if (step === "confirm" && confirmPin.length === maxLength) {
      if (pin === confirmPin) {
        toast.success("PIN saved successfully!");
        navigate("/biometric-management");
      } else {
        toast.error("PINs do not match. Please try again.");
        setConfirmPin("");
        setStep("enter");
        setPin("");
      }
    }
  };

  const currentPin = step === "enter" ? pin : confirmPin;

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-md mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-8 h-8 text-success" />
          <h1 className="text-3xl font-display font-bold">Add PIN</h1>
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">
                {step === "enter" ? "Enter Your PIN" : "Confirm Your PIN"}
              </h3>
              <p className="text-muted-foreground">Create a {maxLength}-digit PIN</p>
            </div>

            {/* PIN Display */}
            <div className="flex justify-center gap-3 mb-8">
              {Array.from({ length: maxLength }).map((_, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${
                    index < currentPin.length
                      ? 'border-success bg-success/10'
                      : 'border-muted'
                  }`}
                >
                  {index < currentPin.length && (
                    <div className="w-3 h-3 rounded-full bg-success"></div>
                  )}
                </div>
              ))}
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                <Button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  variant="outline"
                  className="h-16 text-2xl font-semibold hover:bg-success/10 hover:border-success"
                >
                  {num}
                </Button>
              ))}
              <div></div>
              <Button
                onClick={() => handleNumberClick("0")}
                variant="outline"
                className="h-16 text-2xl font-semibold hover:bg-success/10 hover:border-success"
              >
                0
              </Button>
              <Button
                onClick={handleDelete}
                variant="outline"
                className="h-16 hover:bg-danger/10 hover:border-danger"
              >
                <Delete className="w-6 h-6" />
              </Button>
            </div>

            <Button
              onClick={handleContinue}
              className="w-full h-14 text-lg bg-success hover:bg-success/90 text-foreground"
              disabled={currentPin.length !== maxLength}
            >
              {step === "enter" ? "Continue" : "Confirm PIN"}
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">PIN Security Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use a PIN that's easy for you to remember</li>
              <li>• Avoid obvious combinations like 123456 or birthdays</li>
              <li>• Don't share your PIN with anyone</li>
              <li>• Change your PIN regularly for better security</li>
            </ul>
          </CardContent>
        </Card>

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

export default AddPIN;
