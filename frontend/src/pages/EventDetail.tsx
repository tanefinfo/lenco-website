import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEvent } from "@/hooks/useContent";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useEvent(id);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Events
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-foreground">Event Details</span>
          </div>

          {isLoading && (
            <p className="text-muted-foreground">Loading event...</p>
          )}
          {error && <p className="text-destructive">Unable to load event.</p>}
          {!isLoading && !event && !error && (
            <p className="text-muted-foreground">Event not found.</p>
          )}

          {event && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-[360px] object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant={
                        event.type === "upcoming" ? "default" : "secondary"
                      }
                      className="uppercase"
                    >
                      {event.type === "upcoming" ? "Upcoming" : "Past Event"}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {event.title}
                  </h1>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {event.gallery && event.gallery.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Event Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {event.gallery.map((src) => (
                        <div
                          key={src}
                          className="overflow-hidden rounded-xl border border-border"
                        >
                          <img
                            src={src}
                            alt={event.title}
                            className="w-full h-32 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <aside className="space-y-6">
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                  </div>
                  <Button
                    className="w-full gap-2"
                    disabled={event.type === "past"}
                  >
                    <Ticket className="h-4 w-4" />
                    {event.type === "upcoming" ? "RSVP / Book" : "Event Ended"}
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/contact">Partner or Sponsor</Link>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Booking flows will connect to backend scheduling in a future
                    phase.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
