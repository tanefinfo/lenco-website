import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/shared";
import { cn } from "@/lib/utils";
import { useTestimonials } from "@/hooks/useContent";

const CARD_WIDTH = 340;
const GAP = 24;
const STEP = CARD_WIDTH + GAP;

export function Testimonials() {
  const { data: baseItems = [], isLoading, error } = useTestimonials();

  const items =
    baseItems.length > 0
      ? [...baseItems, ...baseItems, ...baseItems]
      : [];

  const baseLength = baseItems.length;
  const startIndex = baseLength;
  const [active, setActive] = useState(startIndex);
  const [dragging, setDragging] = useState(false);

  const startX = useRef(0);
  const deltaX = useRef(0);
  const viewportRef = useRef(null);

  /* ---------- autoplay ---------- */
  useEffect(() => {
    if (!baseLength || dragging) return;

    const id = setInterval(() => {
      setActive((i) => i + 1);
    }, 5000);

    return () => clearInterval(id);
  }, [baseLength, dragging]);

  /* ---------- infinite correction ---------- */
  useEffect(() => {
    if (!baseLength) return;

    if (active <= baseLength - 1) {
      setTimeout(() => {
        setActive(active + baseLength);
      }, 300);
    }

    if (active >= baseLength * 2) {
      setTimeout(() => {
        setActive(active - baseLength);
      }, 300);
    }
  }, [active, baseLength]);

  /* ---------- drag ---------- */
  const onStart = (x) => {
    setDragging(true);
    startX.current = x;
  };

  const onMove = (x) => {
    if (!dragging) return;
    deltaX.current = x - startX.current;
  };

  const onEnd = () => {
    if (!dragging) return;
    setDragging(false);

    if (deltaX.current > 80) setActive((i) => i - 1);
    if (deltaX.current < -80) setActive((i) => i + 1);

    deltaX.current = 0;
  };

  return (
    <section className="section-padding overflow-hidden">
      <div className="container-custom">
        <SectionHeader
          title="What Collaborators Say"
          subtitle="Words from artists, producers, and audiences"
        />

        <div className="relative mt-12">
          {isLoading && (
            <p className="text-muted-foreground">Loading testimonials...</p>
          )}
          {error && (
            <p className="text-destructive">Unable to load testimonials.</p>
          )}

          {!isLoading && !error && items.length > 0 && (
            <div
              ref={viewportRef}
              className="relative mx-auto overflow-hidden select-none"
              style={{ maxWidth: STEP * 3 }}
              onMouseDown={(e) => onStart(e.clientX)}
              onMouseMove={(e) => onMove(e.clientX)}
              onMouseUp={onEnd}
              onMouseLeave={onEnd}
              onTouchStart={(e) => onStart(e.touches[0].clientX)}
              onTouchMove={(e) => onMove(e.touches[0].clientX)}
              onTouchEnd={onEnd}
            >
              <div
                className={cn(
                  "flex transition-transform duration-500 ease-out",
                  dragging && "transition-none"
                )}
                style={{
                  transform: `translateX(${
                    -(active * STEP) + STEP
                  }px)`,
                }}
              >
                {items.map((t, i) => {
                  const distance = Math.abs(i - active);

                  const scale =
                    distance === 0 ? 1.1 : distance === 1 ? 0.95 : 0.85;

                  const opacity =
                    distance === 0 ? 1 : distance === 1 ? 0.65 : 0.3;

                  return (
                    <div
                      key={i}
                      className="flex-shrink-0"
                      style={{
                        width: CARD_WIDTH,
                        marginRight: GAP,transform: `scale(${scale})`,
                        opacity,
                      }}
                    >
                      <div className="h-full rounded-2xl border border-border bg-card px-6 py-7 shadow-sm">
                        <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
                          “{t.quote}”
                        </p>

                        <p className="mt-5 text-sm font-medium text-muted-foreground">
                          — {t.author}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}