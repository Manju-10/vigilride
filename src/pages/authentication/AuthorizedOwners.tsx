import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Plus, Trash2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AuthorizedOwners = () => {
  const [owners, setOwners] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: "+1 234 567 8900",
      role: "Primary Owner",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      mobile: "+1 234 567 8901",
      role: "Authorized User",
    },
  ]);

  const handleRemoveOwner = (id: number) => {
    setOwners(owners.filter(owner => owner.id !== id));
    toast.success("Owner removed successfully");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-accent" />
            <h1 className="text-3xl font-display font-bold">Authorized Owners</h1>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-success hover:bg-success/90 text-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Owner
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Authorized Owner</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Owner added successfully"); }}>
                <div>
                  <Label htmlFor="ownerName">Full Name</Label>
                  <Input id="ownerName" placeholder="Enter full name" className="mt-2" required />
                </div>
                <div>
                  <Label htmlFor="ownerEmail">Email Address</Label>
                  <Input id="ownerEmail" type="email" placeholder="email@example.com" className="mt-2" required />
                </div>
                <div>
                  <Label htmlFor="ownerMobile">Mobile Number</Label>
                  <Input id="ownerMobile" type="tel" placeholder="+1 234 567 8900" className="mt-2" required />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                  Add Owner
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Owners List */}
        <div className="space-y-4">
          {owners.map((owner) => (
            <Card key={owner.id} className="shadow-elevated">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-accent text-white font-semibold text-lg">
                      {owner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{owner.name}</h3>
                        <p className="text-sm text-muted-foreground">{owner.role}</p>
                      </div>
                      {owner.role !== "Primary Owner" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-danger hover:text-danger/80 hover:bg-danger/10"
                          onClick={() => handleRemoveOwner(owner.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{owner.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{owner.mobile}</span>
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
            <h3 className="font-semibold mb-3">About Authorized Owners</h3>
            <p className="text-sm text-muted-foreground">
              Authorized owners can access the vehicle using their registered fingerprints, PINs, or patterns. 
              Only add trusted individuals to this list. Primary owners cannot be removed.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AuthorizedOwners;
