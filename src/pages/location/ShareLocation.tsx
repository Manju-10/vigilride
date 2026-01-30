import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Share2, Copy, Mail, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ShareLocation = () => {
  const [shareLink] = useState("https://vigilride.app/track/abc123xyz");
  const [duration, setDuration] = useState("1");

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied to clipboard!");
  };

  const handleShareEmail = () => {
    window.location.href = `mailto:?subject=VigilRide Live Location&body=Track my vehicle in real-time: ${shareLink}`;
  };

  const handleShareSMS = () => {
    window.location.href = `sms:?body=Track my vehicle in real-time: ${shareLink}`;
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Share2 className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-display font-bold">Share Live Location</h1>
        </div>

        {/* Share Options */}
        <Card className="shadow-elevated">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Share with Police</h3>
              <p className="text-muted-foreground mb-4">
                Generate a secure link to share your vehicle's real-time location with authorities
              </p>
              
              <div className="space-y-4">
                <div>
                  <Label>Share Duration</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="flex-1 h-10 rounded-lg border border-input bg-background px-3 text-sm"
                    >
                      <option value="1">1 hour</option>
                      <option value="3">3 hours</option>
                      <option value="6">6 hours</option>
                      <option value="12">12 hours</option>
                      <option value="24">24 hours</option>
                      <option value="unlimited">Until manually stopped</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Tracking Link</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={shareLink}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button onClick={handleCopyLink}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">Quick Share Options</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Button
                  onClick={handleShareEmail}
                  variant="outline"
                  className="h-12"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Share via Email
                </Button>
                <Button
                  onClick={handleShareSMS}
                  variant="outline"
                  className="h-12"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Share via SMS
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Shares */}
        <Card className="shadow-elevated">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-4">Active Location Shares</h3>
            <div className="space-y-3">
              <div className="p-4 rounded-lg border flex items-center justify-between">
                <div>
                  <p className="font-medium">Emergency Services</p>
                  <p className="text-sm text-muted-foreground">Expires in 5 hours 23 minutes</p>
                </div>
                <Button variant="destructive" size="sm">
                  Stop Sharing
                </Button>
              </div>
              <div className="p-4 rounded-lg border flex items-center justify-between">
                <div>
                  <p className="font-medium">John Doe (Trusted Contact)</p>
                  <p className="text-sm text-muted-foreground">Expires in 11 hours 45 minutes</p>
                </div>
                <Button variant="destructive" size="sm">
                  Stop Sharing
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-accent" />
              Privacy & Security
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>All location shares are encrypted and secure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Links expire automatically after selected duration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>You can stop sharing at any time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                <span>Only authorized recipients can access the tracking data</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ShareLocation;
