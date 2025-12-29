import { useState } from "react";
import { Layout } from "@/components/layout";
import { HeroSection } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  "General Inquiry",
  "Business Collaboration",
  "Academy Application",
];

export default function Contact() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Layout>
      <HeroSection
        title="Contact Lencho Fikiru"
        subtitle="Have a project, collaboration idea, or academy question? Reach out directly to Lencho."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Get in Touch
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>contact@lenchofikiru.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+251 900 000 000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Addis Ababa, Ethiopia</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-card rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  Office Hours
                </h4>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-sm text-muted-foreground">
                  Saturday: 10:00 AM - 2:00 PM
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {tabs.map((tab, i) => (
                  <Button
                    key={tab}
                    variant={activeTab === i ? "default" : "outline"}
                    onClick={() => setActiveTab(i)}
                    className={cn(activeTab === i && "glow-primary")}
                  >
                    {tab}
                  </Button>
                ))}
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="mt-1"
                    />
                  </div>
                </div>
                {activeTab === 1 && (
                  <div>
                    <Label htmlFor="company">Company / Organization</Label>
                    <Input
                      id="company"
                      placeholder="Your company"
                      className="mt-1"
                    />
                  </div>
                )}
                {activeTab === 2 && (
                  <div>
                    <Label htmlFor="program">Program of Interest</Label>
                    <Input
                      id="program"
                      placeholder="e.g., Filmmaking Masterclass"
                      className="mt-1"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your inquiry..."
                    rows={5}
                    className="mt-1"
                  />
                </div>
                <Button type="submit" size="lg">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
