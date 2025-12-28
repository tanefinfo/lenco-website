import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Feather } from "lucide-react";
import { Layout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { useStory } from "@/hooks/useContent";

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: story, isLoading, error } = useStory(id);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Stories
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-foreground">Story</span>
          </div>

          {isLoading && (
            <p className="text-muted-foreground">Loading story...</p>
          )}
          {error && <p className="text-destructive">Unable to load story.</p>}
          {!isLoading && !story && !error && (
            <p className="text-muted-foreground">Story not found.</p>
          )}

          {story && (
            <article className="space-y-8">
              <header className="space-y-4">
                <Badge>{story.category}</Badge>
                <h1 className="text-4xl font-bold leading-tight text-foreground">
                  {story.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {story.date}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {story.readTime}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Feather className="h-4 w-4" />
                    {story.author}
                  </span>
                </div>
              </header>

              <div className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-[360px] object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none space-y-4 leading-relaxed">
                {story.content
                  .split("\n\n")
                  .filter(Boolean)
                  .map((paragraph) => (
                    <p key={paragraph.slice(0, 20)}>{paragraph.trim()}</p>
                  ))}
              </div>
            </article>
          )}
        </div>
      </section>
    </Layout>
  );
}
