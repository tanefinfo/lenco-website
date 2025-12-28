import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, GraduationCap, Users } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProgram } from "@/hooks/useContent";

export default function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: program, isLoading, error } = useProgram(id);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <Link
              to="/academy"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Academy
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-foreground">Program Details</span>
          </div>

          {isLoading && (
            <p className="text-muted-foreground">Loading program...</p>
          )}
          {error && <p className="text-destructive">Unable to load program.</p>}
          {!isLoading && !program && !error && (
            <p className="text-muted-foreground">Program not found.</p>
          )}

          {program && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-[360px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>{program.level}</Badge>
                      <Badge variant="secondary" className="gap-2">
                        <Clock className="h-4 w-4" />
                        {program.duration}
                      </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      {program.title}
                    </h1>
                    <p className="text-muted-foreground max-w-3xl">
                      {program.description}
                    </p>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none space-y-4">
                  <h2>About this program</h2>
                  <p>{program.fullDescription}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl border border-border bg-card/60">
                    <h3 className="text-xl font-semibold mb-4">Curriculum</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {program.curriculum.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl border border-border bg-card/60">
                    <h3 className="text-xl font-semibold mb-4">Outcomes</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {program.outcomes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="p-6 rounded-2xl border border-border bg-card/60 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Tuition</p>
                      <p className="text-2xl font-bold text-primary">
                        {program.price}
                      </p>
                    </div>
                    <Badge variant="secondary" className="gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Academy
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enrollment is currently open. This CTA will connect to
                    backend application flow in a future phase.
                  </p>
                  <Button className="w-full">Apply / Enroll</Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Talk to admissions
                    </Link>
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
