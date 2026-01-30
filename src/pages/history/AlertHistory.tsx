import DashboardLayout from "@/components/DashboardLayout";
import { Bell, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AlertHistory = () => {
  const alerts = [
    {
      type: "critical",
      title: "Unauthorized Movement Detected",
      description: "Vehicle moved without authentication",
      timestamp: "Today at 2:45 PM",
      resolved: false,
    },
    {
      type: "warning",
      title: "Failed Fingerprint Authentication",
      description: "3 unsuccessful authentication attempts",
      timestamp: "Today at 11:30 AM",
      resolved: true,
    },
    {
      type: "info",
      title: "Authorized Person Added",
      description: "New user 'Jane Smith' added successfully",
      timestamp: "Yesterday at 3:15 PM",
      resolved: true,
    },
    {
      type: "critical",
      title: "Engine Started Without Key",
      description: "Unauthorized engine start detected",
      timestamp: "2 days ago at 9:20 AM",
      resolved: true,
    },
  ];

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "critical":
        return "destructive";
      case "warning":
        return "outline";
      default:
        return "secondary";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-danger" />;
      case "warning":
        return <Bell className="w-5 h-5 text-warning" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-success" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-8 h-8 text-warning" />
          <h1 className="text-3xl font-display font-bold">Alert History</h1>
        </div>

        <div className="space-y-4">
          {alerts.map((alert, idx) => (
            <Card
              key={idx}
              className={`shadow-elevated hover:shadow-lg transition-smooth ${
                alert.type === "critical" && !alert.resolved ? "border-danger/50" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alert.type === "critical" ? "bg-danger/10" :
                    alert.type === "warning" ? "bg-warning/10" : "bg-success/10"
                  }`}>
                    {getIcon(alert.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">{alert.title}</h3>
                      <Badge variant={getBadgeVariant(alert.type)} className="ml-2">
                        {alert.type.toUpperCase()}
                      </Badge>
                    </div>

                    <p className="text-muted-foreground mb-3">{alert.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{alert.timestamp}</span>
                      </div>

                      {alert.resolved && (
                        <div className="flex items-center gap-1 text-success text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Resolved</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AlertHistory;
