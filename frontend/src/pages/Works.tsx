import { useState } from "react";
import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader, ProjectCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useProjects, useVideos } from "@/hooks/useContent";

const categories = ["All", "Films", "Music Videos", "Commercials"];

export default function Works() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: projectData, isLoading, error } = useProjects();
  const { data: videoData } = useVideos();

  const filteredProjects = (projectData ?? []).filter((p) =>
    activeCategory === "All" ? true : p.category === activeCategory
  );
  const musicVideos = videoData?.musicVideos ?? [];
  const movieTrailers = videoData?.movieTrailers ?? [];

  return (
    <Layout>
      <HeroSection
        title="Lencho Fikiru’s Work"
        subtitle="Films, Oromo music videos, and trailers—crafted with cultural respect and international standards."
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading && (
              <p className="text-muted-foreground">Loading projects...</p>
            )}
            {error && (
              <p className="text-destructive">Unable to load projects.</p>
            )}
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Music Videos */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Music Videos"
            subtitle="Selected videos directed by Lencho (embeds as placeholders)"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {musicVideos.map((v) => (
              <div
                key={v.id}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={v.embedUrl}
                    title={v.title}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Movie Trailers */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Movie Trailers"
            subtitle="Feature and short-form trailers (embeds as placeholders)"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {movieTrailers.map((v) => (
              <div
                key={v.id}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={v.embedUrl}
                    title={v.title}
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-foreground">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
