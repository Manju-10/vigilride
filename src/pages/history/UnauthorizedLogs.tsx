import DashboardLayout from "@/components/DashboardLayout";
import { Shield, Fingerprint, Lock, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const UnauthorizedLogs = () => {
  const logs = [
    {
      type: "fingerprint",
      attemptType: "Fingerprint Authentication",
      status: "Failed",
      timestamp: "Today at 2:45 PM",
      location: "123 Main St, San Francisco",
      details: "Unrecognized fingerprint template detected",
    },
    {
      type: "pin",
      attemptType: "PIN Entry",
      status: "Failed",
      timestamp: "Today at 11:20 AM",
      location: "123 Main St, San Francisco",
      details: "Incorrect PIN entered 3 times",
    },
    {
      type: "movement",
      attemptType: "Unauthorized Movement",
      status: "Blocked",
      timestamp: "Yesterday at 9:15 PM",
      location: "456 Oak Ave, San Francisco",
      details: "Vehicle movement detected without authentication",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "fingerprint":
        return <Fingerprint className="w-5 h-5 text-danger" />;
      case "pin":
        return <Lock className="w-5 h-5 text-danger" />;
      default:
        return <Shield className="w-5 h-5 text-danger" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-danger" />
          <h1 className="text-3xl font-display font-bold">Unauthorized Logs</h1>
        </div>

        {/* Alert Banner */}
        <Card className="shadow-elevated border-danger/30 bg-danger/5">
          <CardContent className="p-4">
            <p className="text-sm text-center">
              <strong>Security Alert:</strong> Review unauthorized access attempts and take action if needed
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {logs.map((log, idx) => (
            <Card key={idx} className="shadow-elevated border-danger/20 hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center flex-shrink-0">
                    {getIcon(log.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{log.attemptType}</h3>
                      <Badge variant="destructive">{log.status}</Badge>
                    </div>

                    <p className="text-muted-foreground mb-3">{log.details}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Shield className="w-4 h-4" />
                        <span>{log.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Security Recommendations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Review all unauthorized attempts regularly</li>
              <li>• Contact authorities if suspicious activity persists</li>
              <li>• Update authentication methods if compromised</li>
              <li>• Share alerts with trusted contacts</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UnauthorizedLogs;
