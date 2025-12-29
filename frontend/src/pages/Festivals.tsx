import { useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader } from "@/components/shared";
import { useFestivals } from "@/hooks/useContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import type { Festival } from "@/types/content";

export default function Festivals() {
  const { data = [], isLoading, error } = useFestivals();
  const [selected, setSelected] = useState<Festival | null>(null);
  const [open, setOpen] = useState(false);

  const { upcoming, past } = useMemo(() => {
    const sorted = [...data].sort((a, b) => Number(b.year) - Number(a.year));
    return {
      upcoming: sorted.filter((f) => f.type === "upcoming"),
      past: sorted.filter((f) => f.type === "past"),
    };
  }, [data]);

  const showFestival = (festival: Festival) => {
    setSelected(festival);
    setOpen(true);
  };

  const FestivalCard = ({ festival }: { festival: Festival }) => (
    <button
      onClick={() => showFestival(festival)}
      className="group text-left w-full bg-card border border-border rounded-2xl overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9]">
        <img
          src={festival.image}
          alt={festival.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/80">
              {festival.year} · {festival.location}
            </p>
            <h3 className="text-lg font-semibold text-white">
              {festival.title}
            </h3>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-white/15 px-2 py-1 rounded-full backdrop-blur">
            View details <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
      <div className="p-4">
        {festival.dates && (
          <p className="text-sm font-medium text-primary">{festival.dates}</p>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {festival.description}
        </p>
        {festival.spotlight && (
          <p className="text-xs text-foreground/80 mt-2 font-semibold">
            Spotlight: {festival.spotlight}
          </p>
        )}
      </div>
    </button>
  );

  return (
    <Layout>
      <HeroSection
        title="Festivals"
        subtitle="Selections and showcases across Ethiopia and beyond."
      />

      <section className="section-padding">
        <div className="container-custom grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <SectionHeader title="Upcoming" align="left" />
            <div className="space-y-4">
              {isLoading && (
                <p className="text-muted-foreground">Loading festivals...</p>
              )}
              {error && (
                <p className="text-destructive">Unable to load festivals.</p>
              )}
              {!isLoading &&
                !error &&
                upcoming.map((f) => <FestivalCard key={f.id} festival={f} />)}
              {!isLoading && upcoming.length === 0 && (
                <p className="text-muted-foreground">
                  No upcoming festivals yet.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4 bg-card rounded-2xl border border-border p-4 md:p-6">
            <SectionHeader title="Past" align="left" />
            <div className="space-y-4">
              {isLoading && (
                <p className="text-muted-foreground">Loading festivals...</p>
              )}
              {error && (
                <p className="text-destructive">Unable to load festivals.</p>
              )}
              {!isLoading &&
                !error &&
                past.map((f) => <FestivalCard key={f.id} festival={f} />)}
              {!isLoading && past.length === 0 && (
                <p className="text-muted-foreground">
                  No past festivals listed.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) setSelected(null);
        }}
      >
        <DialogContent className="max-w-3xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>{selected.title}</DialogTitle>
                <DialogDescription>
                  {selected.location} · {selected.year}
                  {selected.dates ? ` · ${selected.dates}` : ""}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3 text-sm">
                  {selected.description && (
                    <p className="text-foreground/90">{selected.description}</p>
                  )}
                  {selected.spotlight && (
                    <p className="font-semibold text-foreground">
                      Spotlight: {selected.spotlight}
                    </p>
                  )}
                  {selected.link && (
                    <a
                      href={selected.link}
                      className="inline-flex items-center gap-2 text-primary font-semibold"
                    >
                      View program site <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
