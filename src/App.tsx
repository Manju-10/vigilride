import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages
import Splash from "./pages/Splash";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import CompleteProfile from "./pages/auth/CompleteProfile";
import OTPVerification from "./pages/auth/OTPVerification";
import OTPSignIn from "./pages/auth/OTPSignIn";
import Dashboard from "./pages/Dashboard";
import CurrentLocation from "./pages/location/CurrentLocation";
import TrackVehicle from "./pages/location/TrackVehicle";
import ContactPolice from "./pages/location/ContactPolice";
import ShareLocation from "./pages/location/ShareLocation";
import AuthorizedOwners from "./pages/authentication/AuthorizedOwners";
import BiometricManagement from "./pages/authentication/BiometricManagement";
import AddFingerprint from "./pages/authentication/AddFingerprint";
import AddPattern from "./pages/authentication/AddPattern";
import AddPIN from "./pages/authentication/AddPIN";
import TrackingHistory from "./pages/history/TrackingHistory";
import AlertHistory from "./pages/history/AlertHistory";
import UnauthorizedLogs from "./pages/history/UnauthorizedLogs";
import Settings from "./pages/settings/Settings";
import About from "./pages/about/About";
import HowItWorks from "./pages/about/HowItWorks";
import ContactUs from "./pages/contact/ContactUs";
import TrustedContacts from "./pages/contacts/TrustedContacts";
import Profile from "./pages/profile/Profile";
import Subscription from "./pages/subscription/Subscription";
import AlarmScreen from "./pages/AlarmScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/otp" element={<OTPVerification />} />
            <Route path="/otp-signin" element={<OTPSignIn />} />
            
            <Route path="/" element={<Dashboard />} />
            
            {/* Location Routes */}
            <Route path="/location" element={<CurrentLocation />} />
            <Route path="/track" element={<TrackVehicle />} />
            <Route path="/contact-police" element={<ContactPolice />} />
            <Route path="/share-location" element={<ShareLocation />} />
            
            {/* Authentication Routes */}
            <Route path="/authorized-owners" element={<AuthorizedOwners />} />
            <Route path="/biometric-management" element={<BiometricManagement />} />
            <Route path="/add-fingerprint" element={<AddFingerprint />} />
            <Route path="/add-pattern" element={<AddPattern />} />
            <Route path="/add-pin" element={<AddPIN />} />
            
            {/* History Routes */}
            <Route path="/tracking-history" element={<TrackingHistory />} />
            <Route path="/alert-history" element={<AlertHistory />} />
            <Route path="/unauthorized-logs" element={<UnauthorizedLogs />} />
            
            {/* Settings & Info */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/trusted-contacts" element={<TrustedContacts />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/alarm" element={<AlarmScreen />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
