import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu, Bell, User, Shield, MapPin, History, Settings, 
  Info, Mail, Users, X, ChevronRight, Fingerprint, AlertTriangle, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: "success" | "warning" | "danger";
  icon: typeof Shield;
  title: string;
  time: string;
  isUnauthorized?: boolean;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      icon: Shield,
      title: "Authorized person added successfully",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "warning",
      icon: Fingerprint,
      title: "Fingerprint authentication failed",
      time: "5 hours ago",
    },
    {
      id: "3",
      type: "danger",
      icon: AlertTriangle,
      title: "Unauthorized Movement Detected",
      time: "2 minutes ago",
      isUnauthorized: true,
    },
  ]);

  const menuSections = [
    {
      title: "Authentication",
      icon: Shield,
      items: [
        { label: "Authorized Owner List", path: "/authorized-owners" },
        { label: "Fingerprint / PIN Management", path: "/biometric-management" },
      ],
    },
    {
      title: "Location",
      icon: MapPin,
      items: [
        { label: "Current Location Map", path: "/location" },
        { label: "Track Vehicle", path: "/track" },
        { label: "Contact Nearby Police", path: "/contact-police" },
        { label: "Share Live Location", path: "/share-location" },
      ],
    },
    {
      title: "History",
      icon: History,
      items: [
        { label: "Tracking History", path: "/tracking-history" },
        { label: "Alert History", path: "/alert-history" },
        { label: "Unauthorized Logs", path: "/unauthorized-logs" },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [{ label: "App Settings", path: "/settings" }],
    },
    {
      title: "About",
      icon: Info,
      items: [
        { label: "About VigilRide", path: "/about" },
        { label: "How It Works", path: "/how-it-works" },
      ],
    },
    {
      title: "Contact Us",
      icon: Mail,
      items: [{ label: "Get Support", path: "/contact" }],
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src="/favicon.svg" alt="VigilRide" className="w-10 h-10 rounded-xl" />
          <div>
            <h2 className="text-lg font-display font-bold text-sidebar-foreground">VigilRide</h2>
            <p className="text-xs text-sidebar-foreground/60">Smart Security</p>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto py-4">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <div className="px-6 mb-2 flex items-center gap-2">
              <section.icon className="w-4 h-4 text-sidebar-foreground/60" />
              <h3 className="text-sm font-semibold text-sidebar-foreground/80 uppercase tracking-wide">
                {section.title}
              </h3>
            </div>
            <div className="space-y-1 px-3">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-smooth text-left"
                >
                  <span className="text-sm">{item.label}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Trusted Contacts Quick Access */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          onClick={() => {
            navigate("/trusted-contacts");
            setIsSidebarOpen(false);
          }}
          className="w-full bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-accent/80 border border-sidebar-border shadow-sm"
        >
          <Users className="w-4 h-4 mr-2" />
          Trusted Contacts
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 h-16 bg-primary border-b border-border shadow-elevated">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left: Menu Button */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80 bg-sidebar border-sidebar-border">
              <SidebarContent />
            </SheetContent>
          </Sheet>

          {/* Center: Logo/Title */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-smooth"
          >
            <img src="/favicon.svg" alt="VigilRide" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-display font-bold text-primary-foreground">
              VigilRide
            </span>
          </button>

          {/* Right: Notifications & Profile */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Sheet open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/10">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-danger text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      {notifications.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
                <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
                  <SheetTitle className="text-lg font-semibold">Notifications</SheetTitle>
                  {notifications.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-danger hover:text-danger/80 hover:bg-danger/10"
                      onClick={() => setNotifications([])}
                    >
                      Clear All
                    </Button>
                  )}
                </SheetHeader>
                <div className="overflow-y-auto max-h-[calc(100vh-80px)]">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p>No notifications</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {notifications.map((notification) => {
                        const IconComponent = notification.icon;
                        const bgColor = notification.type === "success" ? "bg-success/20" :
                                        notification.type === "warning" ? "bg-warning/20" : "bg-danger/10";
                        const iconColor = notification.type === "success" ? "text-success" :
                                          notification.type === "warning" ? "text-warning" : "text-danger";
                        
                        return (
                          <div key={notification.id} className="p-4">
                            <div className="flex items-start gap-3 w-full">
                              <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0`}>
                                <IconComponent className={`w-5 h-5 ${iconColor}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{notification.title}</p>
                                {notification.isUnauthorized && (
                                  <p className="text-sm text-muted-foreground mt-1">Is this you?</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                
                                {notification.isUnauthorized && (
                                  <div className="flex gap-2 mt-3">
                                    <Button
                                      size="sm"
                                      className="bg-accent hover:bg-accent/90 text-white"
                                      onClick={() => {
                                        setNotifications(prev => prev.filter(n => n.id !== notification.id));
                                      }}
                                    >
                                      <Check className="w-4 h-4 mr-1" />
                                      YES
                                    </Button>
                                    <Button
                                      size="sm"
                                      className="bg-danger hover:bg-danger/90 text-white"
                                      onClick={() => {
                                        setIsNotificationOpen(false);
                                        navigate("/track");
                                      }}
                                    >
                                      <X className="w-4 h-4 mr-1" />
                                      NO
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-primary-foreground hover:bg-primary-foreground/10">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/signin")} className="text-danger">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
