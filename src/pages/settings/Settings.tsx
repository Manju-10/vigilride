import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Settings as SettingsIcon, Bell, Moon, Type, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [fontSize, setFontSize] = useState([16]);
  const [alarmTone, setAlarmTone] = useState("default");

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-display font-bold">Settings</h1>
        </div>

        {/* Appearance */}
        <Card className="shadow-elevated">
          <CardContent className="p-6 space-y-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Moon className="w-5 h-5" />
              Appearance
            </h3>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark theme
                </p>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-muted-foreground" />
                <Label>Font Size</Label>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground w-12">Small</span>
                <Slider
                  value={fontSize}
                  onValueChange={setFontSize}
                  min={12}
                  max={24}
                  step={2}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground w-12 text-right">Large</span>
              </div>
              <p className="text-sm text-muted-foreground">Current size: {fontSize}px</p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-elevated">
          <CardContent className="p-6 space-y-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts about your vehicle
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="security-alerts">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Critical security notifications
                  </p>
                </div>
                <Switch id="security-alerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="location-updates">Location Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Real-time location tracking alerts
                  </p>
                </div>
                <Switch id="location-updates" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alarm Settings */}
        <Card className="shadow-elevated">
          <CardContent className="p-6 space-y-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Alarm Settings
            </h3>

            <div className="space-y-3">
              <Label htmlFor="alarm-tone">Alarm Tone</Label>
              <Select value={alarmTone} onValueChange={setAlarmTone}>
                <SelectTrigger id="alarm-tone">
                  <SelectValue placeholder="Select alarm tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Siren</SelectItem>
                  <SelectItem value="loud">Loud Alert</SelectItem>
                  <SelectItem value="beep">Beeping Sound</SelectItem>
                  <SelectItem value="horn">Car Horn</SelectItem>
                  <SelectItem value="custom">Custom Tone</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="vibrate">Vibration</Label>
                <p className="text-sm text-muted-foreground">
                  Vibrate on alarm trigger
                </p>
              </div>
              <Switch id="vibrate" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card className="shadow-elevated bg-muted/50">
          <CardContent className="p-6">
            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">VigilRide Version 1.0.0</p>
              <p className="text-xs text-muted-foreground">© 2024 VigilRide. All rights reserved.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
