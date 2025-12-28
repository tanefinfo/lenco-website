import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useContent";
import { Film, Music, Video, Users, ArrowRight } from "lucide-react";

const iconMap: Record<string, any> = { Film, Music, Video, Users };

export default function Studio() {
  const { data, isLoading, error } = useServices();
  const services = data?.services ?? [];
  const workflow = data?.workflow ?? [];

  return (
    <Layout>
      <HeroSection
        title="Lencho Fikiru Studio"
        subtitle="Lencho’s production practice for film, music, and commercial projects."
      />

      {/* Services */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Services"
            subtitle="End-to-end creative production led by Lencho"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading && (
              <p className="text-muted-foreground">Loading services...</p>
            )}
            {error && (
              <p className="text-destructive">Unable to load services.</p>
            )}
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Film;
              return (
                <div
                  key={service.id}
                  className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {service.description}
                      </p>
                      <ul className="space-y-1">
                        {service.features.map((f) => (
                          <li
                            key={f}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <span className="h-1 w-1 rounded-full bg-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            title="How Lencho Works"
            subtitle="A process built on clarity, rehearsal, and precise delivery"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {isLoading && (
              <p className="text-muted-foreground">Loading workflow...</p>
            )}
            {error && (
              <p className="text-destructive">Unable to load workflow.</p>
            )}
            {workflow.map((step) => (
              <div key={step.step} className="text-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  {step.step}
                </div>
                <h4 className="font-semibold text-foreground mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let's Bring Your Vision to Life
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Ready to start your project? Contact Lencho to discuss your creative
            needs.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/contact">
              Contact Lencho
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
