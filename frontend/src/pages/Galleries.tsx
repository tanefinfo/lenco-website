import { useState } from "react";
import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useGalleries } from "@/hooks/useContent";
import type { Gallery, GalleryCategory } from "@/types/content";
import { ArrowLeft, ArrowRight } from "lucide-react";

const categories: GalleryCategory[] = [
  "Portraits",
  "Behind the Scenes",
  "On Set",
  "Events",
];

export default function Galleries() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "All">(
    "All"
  );
  const { data: galleries = [], isLoading, error } = useGalleries();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Gallery | null>(null);
  const [idx, setIdx] = useState(0);

  const filtered = galleries.filter((g) =>
    activeCategory === "All" ? true : g.category === activeCategory
  );

  const openGallery = (g: Gallery) => {
    setCurrent(g);
    setIdx(0);
    setOpen(true);
  };
  const next = () => {
    if (!current) return;
    setIdx((prev) => (prev + 1) % current.images.length);
  };
  const prev = () => {
    if (!current) return;
    setIdx(
      (prev) => (prev - 1 + current.images.length) % current.images.length
    );
  };

  return (
    <Layout>
      <HeroSection
        title="Galleries"
        subtitle="Curated stills from Ethiopia-first projects: portraits, BTS, on-set frames."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {(["All", ...categories] as const).map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={cn(activeCategory === cat && "glow-primary")}
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <p className="text-muted-foreground">Loading galleries...</p>
            )}
            {error && (
              <p className="text-destructive">Unable to load galleries.</p>
            )}
            {!isLoading &&
              !error &&
              filtered.map((g) => (
                <button
                  key={g.id}
                  onClick={() => openGallery(g)}
                  className="group text-left bg-card border border-border rounded-xl overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={g.cover}
                      alt={g.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {g.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {g.category}
                    </p>
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
          if (!isOpen) {
            setCurrent(null);
            setIdx(0);
          }
        }}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader className="mb-1">
            <DialogTitle>{current?.title}</DialogTitle>
            {current?.description && (
              <p className="text-sm text-muted-foreground">
                {current.description}
              </p>
            )}
          </DialogHeader>

          {current && (
            <div className="space-y-4">
              <div className="relative aspect-video bg-black/5 rounded-lg overflow-hidden">
                <img
                  src={current.images[idx] || current.cover}
                  alt={current.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    onClick={prev}
                    className="m-2 p-2 rounded-md bg-background/70 border border-border hover:bg-muted"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={next}
                    className="m-2 p-2 rounded-md bg-background/70 border border-border hover:bg-muted"
                    aria-label="Next image"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto py-1">
                {current.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIdx(i)}
                    className={cn(
                      "h-16 w-24 rounded-md overflow-hidden border",
                      i === idx ? "border-primary" : "border-border"
                    )}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${current.title} ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
