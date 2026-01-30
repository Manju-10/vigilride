import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, Plus, Trash2, Phone, Mail } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const TrustedContacts = () => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      mobile: "+1 234 567 8900",
      relation: "Family",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      mobile: "+1 234 567 8901",
      relation: "Friend",
    },
  ]);

  const handleRemove = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
    toast.success("Contact removed successfully");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-success" />
            <h1 className="text-3xl font-display font-bold">Trusted Contacts</h1>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-success hover:bg-success/90 text-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Trusted Contact</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success("Contact added successfully"); }}>
                <div>
                  <Label htmlFor="contactName">Full Name</Label>
                  <Input id="contactName" placeholder="Enter full name" className="mt-2" required />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email Address</Label>
                  <Input id="contactEmail" type="email" placeholder="email@example.com" className="mt-2" required />
                </div>
                <div>
                  <Label htmlFor="contactMobile">Mobile Number</Label>
                  <Input id="contactMobile" type="tel" placeholder="+1 234 567 8900" className="mt-2" required />
                </div>
                <div>
                  <Label htmlFor="relation">Relation</Label>
                  <Select>
                    <SelectTrigger id="relation" className="mt-2">
                      <SelectValue placeholder="Select relation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="family">Family</SelectItem>
                      <SelectItem value="friend">Friend</SelectItem>
                      <SelectItem value="colleague">Colleague</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                  Add Contact
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Info Banner */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20">
          <CardContent className="p-4">
            <p className="text-sm text-center">
              Trusted contacts will be notified immediately when security alerts are triggered
            </p>
          </CardContent>
        </Card>

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="shadow-elevated">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-14 h-14">
                    <AvatarFallback className="bg-success text-white font-semibold text-lg">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.relation}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-danger hover:text-danger/80 hover:bg-danger/10"
                        onClick={() => handleRemove(contact.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{contact.mobile}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {contacts.length === 0 && (
          <Card className="shadow-elevated">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Trusted Contacts</h3>
              <p className="text-muted-foreground mb-6">
                Add trusted contacts to receive emergency alerts
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TrustedContacts;
