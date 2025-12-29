import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader, EventCard } from "@/components/shared";
import { useEvents } from "@/hooks/useContent";

export default function Events() {
  const { data: eventData, isLoading, error } = useEvents();
  const upcomingEvents = (eventData ?? []).filter((e) => e.type === "upcoming");
  const pastEvents = (eventData ?? []).filter((e) => e.type === "past");

  return (
    <Layout>
      <HeroSection
        title="Events"
        subtitle="Premieres, workshops, showcases, and networking opportunities for creatives."
      />

      <section className="section-padding">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <SectionHeader title="Upcoming Events" align="left" />
            <div className="space-y-4">
              {isLoading && (
                <p className="text-muted-foreground">Loading events...</p>
              )}
              {error && (
                <p className="text-destructive">Unable to load events.</p>
              )}
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} {...event} layout="horizontal" />
              ))}
              {!isLoading && upcomingEvents.length === 0 && (
                <p className="text-muted-foreground">
                  No upcoming events right now.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4 bg-card rounded-2xl border border-border p-4 md:p-6">
            <SectionHeader title="Past Events" align="left" />
            <div className="space-y-4">
              {isLoading && (
                <p className="text-muted-foreground">Loading events...</p>
              )}
              {error && (
                <p className="text-destructive">Unable to load events.</p>
              )}
              {pastEvents.map((event) => (
                <EventCard key={event.id} {...event} layout="horizontal" />
              ))}
              {!isLoading && pastEvents.length === 0 && (
                <p className="text-muted-foreground">No past events yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
