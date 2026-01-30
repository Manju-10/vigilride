import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Subscription = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "Forever",
      description: "Essential security features",
      features: [
        "Up to 3 fingerprints",
        "Basic GPS tracking",
        "Emergency alerts",
        "2 trusted contacts",
        "Standard support",
      ],
      current: true,
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      description: "Advanced protection",
      features: [
        "Unlimited fingerprints",
        "Real-time GPS tracking",
        "Instant theft alerts",
        "Unlimited trusted contacts",
        "24/7 priority support",
        "Movement history (90 days)",
        "Pattern & PIN authentication",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "per month",
      description: "Complete fleet management",
      features: [
        "Everything in Premium",
        "Multi-vehicle management",
        "Advanced analytics",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "1-year movement history",
      ],
    },
  ];

  const handleUpgrade = (planName: string) => {
    toast.success(`Upgrade to ${planName} initiated!`);
    navigate("/");
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 animate-slide-up">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-warning/10 mb-4">
            <Crown className="w-8 h-8 text-warning" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-3">Upgrade Your Security</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose a plan that fits your needs and unlock advanced security features
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`shadow-elevated hover:shadow-lg transition-smooth relative ${
                plan.popular ? "border-accent border-2" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-accent text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period !== "Forever" && (
                      <span className="text-muted-foreground ml-2">{plan.period}</span>
                    )}
                  </div>
                  {plan.period === "Forever" && (
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {plan.current ? (
                  <Badge variant="outline" className="w-full h-12 flex items-center justify-center">
                    Current Plan
                  </Badge>
                ) : (
                  <Button
                    onClick={() => handleUpgrade(plan.name)}
                    className={`w-full h-12 ${
                      plan.popular
                        ? "bg-accent hover:bg-accent/90"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    Upgrade to {plan.name}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <Card className="shadow-elevated bg-accent/5 border-accent/20 mt-12">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Can I cancel anytime?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">What payment methods do you accept?</h4>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and direct bank transfers.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">Is there a free trial?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! All premium plans come with a 14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
