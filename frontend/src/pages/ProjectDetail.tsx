import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clapperboard, Play } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProject } from "@/hooks/useContent";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, error } = useProject(id);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <Link
              to="/works"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Works
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-foreground">Project Details</span>
          </div>

          {isLoading && (
            <p className="text-muted-foreground">Loading project...</p>
          )}
          {error && <p className="text-destructive">Unable to load project.</p>}
          {!isLoading && !project && !error && (
            <p className="text-muted-foreground">Project not found.</p>
          )}

          {project && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[420px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
                    <Badge className="w-fit">{project.category}</Badge>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      {project.title}
                    </h1>
                    <p className="text-muted-foreground max-w-3xl">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {project.year}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Clapperboard className="h-4 w-4" />
                        {project.credits.length} key credits
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {project.gallery.map((src) => (
                    <div
                      key={src}
                      className="overflow-hidden rounded-xl border border-border"
                    >
                      <img
                        src={src}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none">
                  <h2>Synopsis</h2>
                  <p>{project.fullDescription}</p>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="p-6 rounded-2xl border border-border bg-card/60">
                  <h3 className="text-xl font-semibold mb-3">Credits</h3>
                  <ul className="space-y-3">
                    {project.credits.map((credit) => (
                      <li
                        key={`${credit.role}-${credit.name}`}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {credit.role}
                        </span>
                        <span className="font-medium text-foreground">
                          {credit.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <h3 className="text-xl font-semibold">Watch Trailer</h3>
                  <p className="text-sm text-muted-foreground">
                    Placeholder for embedded video or trailer link. This will
                    integrate with the backend later.
                  </p>
                  <Button className="w-full gap-2" variant="outline">
                    <Play className="h-4 w-4" />
                    Play Preview
                  </Button>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
