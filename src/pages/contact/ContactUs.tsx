import DashboardLayout from "@/components/DashboardLayout";
import { Mail, Phone, Clock, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactUs = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-display font-bold">Contact Us</h1>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="shadow-elevated">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">support@vigilride.com</p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-1">Support Hours</h3>
              <p className="text-sm text-muted-foreground">24/7 Available</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="shadow-elevated">
          <CardContent className="p-8">
            <h2 className="text-2xl font-display font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="mt-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What's this about?"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help..."
                  className="mt-2 min-h-[150px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-accent hover:bg-accent/90 text-lg font-semibold"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* FAQ or Help Info */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">Need Immediate Help?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              For urgent security matters or theft alerts, please use the in-app emergency features 
              or contact local authorities directly.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Emergency Support: Available 24/7</li>
              <li>• Average Response Time: Within 2 hours</li>
              <li>• Technical Issues: Usually resolved within 24 hours</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ContactUs;
