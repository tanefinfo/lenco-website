import { useMemo, useState } from "react";
import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader } from "@/components/shared";
import { useAwards } from "@/hooks/useContent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";
import type { Award } from "@/types/content";

export default function AwardsFrontend() {
  const { data = [], isLoading, error } = useAwards();
  const [selected, setSelected] = useState<Award | null>(null);
  const [open, setOpen] = useState(false);

  const sorted = useMemo(
    () => [...data].sort((a, b) => Number(b.year) - Number(a.year)),
    [data]
  );

  const openAward = (award: Award) => {
    setSelected(award);
    setOpen(true);
  };

  return (
    <Layout>
      <HeroSection
        title="Awards"
        subtitle="Recognitions and honors celebrating craft and leadership."
      />
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader title="Highlights" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <p className="text-muted-foreground">Loading awards...</p>
            )}
            {error && (
              <p className="text-destructive">Unable to load awards.</p>
            )}
            {!isLoading &&
              !error &&
              sorted.map((a) => (
                <button
                  key={a.id}
                  onClick={() => openAward(a)}
                  className="group text-left bg-card border border-border rounded-2xl overflow-hidden shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-white/80">
                          {a.year} · {a.category}
                        </p>
                        <h3 className="text-lg font-semibold">{a.title}</h3>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold bg-white/15 px-2 py-1 rounded-full backdrop-blur">
                        View <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    {a.issuer && (
                      <p className="text-sm font-semibold text-foreground">
                        {a.issuer}
                      </p>
                    )}
                    {a.project && (
                      <p className="text-sm text-muted-foreground">
                        Project: {a.project}
                      </p>
                    )}
                    {a.placement && (
                      <p className="text-xs text-primary font-semibold">
                        {a.placement}
                      </p>
                    )}
                    {a.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {a.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
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
                  {selected.year} · {selected.category}
                  {selected.placement ? ` · ${selected.placement}` : ""}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:grid-cols-2 items-start">
                <div className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3 text-sm">
                  {selected.issuer && (
                    <p className="font-semibold text-foreground">
                      Issuer: {selected.issuer}
                    </p>
                  )}
                  {selected.project && (
                    <p className="text-foreground/90">
                      Project: {selected.project}
                    </p>
                  )}
                  {selected.description && (
                    <p className="text-muted-foreground">
                      {selected.description}
                    </p>
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
