import DashboardLayout from "@/components/DashboardLayout";
import { History, MapPin, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TrackingHistory = () => {
  const trackingRecords = [
    {
      date: "2024-11-30",
      time: "2:45 PM - 3:15 PM",
      duration: "30 minutes",
      distance: "15.2 km",
      route: "Home → Downtown → Office",
      avgSpeed: "45 km/h",
    },
    {
      date: "2024-11-30",
      time: "8:00 AM - 8:25 AM",
      duration: "25 minutes",
      distance: "12.8 km",
      route: "Home → Gym → Coffee Shop",
      avgSpeed: "38 km/h",
    },
    {
      date: "2024-11-29",
      time: "5:30 PM - 6:00 PM",
      duration: "30 minutes",
      distance: "18.5 km",
      route: "Office → Mall → Home",
      avgSpeed: "42 km/h",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-display font-bold">Tracking History</h1>
        </div>

        <div className="space-y-4">
          {trackingRecords.map((record, idx) => (
            <Card key={idx} className="shadow-elevated hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">{record.date}</span>
                      <Badge variant="outline">{record.time}</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{record.route}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold">{record.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Distance</p>
                    <p className="font-semibold text-accent">{record.distance}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Avg Speed</p>
                    <p className="font-semibold">{record.avgSpeed}</p>
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

export default TrackingHistory;
