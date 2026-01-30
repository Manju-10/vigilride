import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Grid3x3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const AddPattern = () => {
  const navigate = useNavigate();
  const [pattern, setPattern] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDotClick = (index: number) => {
    if (!pattern.includes(index)) {
      setPattern([...pattern, index]);
    }
  };

  const handleReset = () => {
    setPattern([]);
    setIsDrawing(false);
  };

  const handleSave = () => {
    if (pattern.length >= 4) {
      toast.success("Pattern saved successfully!");
      navigate("/biometric-management");
    } else {
      toast.error("Pattern must connect at least 4 dots");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Grid3x3 className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-display font-bold">Add Pattern Lock</h1>
        </div>

        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Draw Your Pattern</h3>
              <p className="text-muted-foreground">Connect at least 4 dots</p>
            </div>

            {/* Pattern Grid */}
            <div className="max-w-xs mx-auto">
              <div className="grid grid-cols-3 gap-8 p-8">
                {Array.from({ length: 9 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    onMouseEnter={() => isDrawing && handleDotClick(index)}
                    onMouseDown={() => setIsDrawing(true)}
                    onMouseUp={() => setIsDrawing(false)}
                    className={`w-16 h-16 rounded-full transition-all ${
                      pattern.includes(index)
                        ? 'bg-accent scale-110 shadow-lg glow-accent'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {pattern.includes(index) && (
                      <span className="text-white font-bold">
                        {pattern.indexOf(index) + 1}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Pattern Info */}
            <div className="text-center mt-6">
              <p className="text-sm text-muted-foreground">
                {pattern.length === 0 && "Touch and drag to draw your pattern"}
                {pattern.length > 0 && pattern.length < 4 && `${pattern.length} dots connected (minimum 4 required)`}
                {pattern.length >= 4 && `${pattern.length} dots connected ✓`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Pattern Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Use at least 4 dots for better security</li>
              <li>• Create a pattern you can remember easily</li>
              <li>• Avoid simple patterns like straight lines</li>
              <li>• You can draw across dots without selecting them</li>
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleReset}
            variant="outline"
            className="h-14 text-lg"
            disabled={pattern.length === 0}
          >
            Reset
          </Button>
          <Button
            onClick={handleSave}
            className="h-14 text-lg bg-accent hover:bg-accent/90"
            disabled={pattern.length < 4}
          >
            Save Pattern
          </Button>
        </div>

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

export default AddPattern;
