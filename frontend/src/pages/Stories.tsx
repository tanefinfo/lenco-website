import { Layout } from "@/components/layout";
import { HeroSection, StoryCard } from "@/components/shared";
import { useStories } from "@/hooks/useContent";

export default function Stories() {
  const { data: storyData, isLoading, error } = useStories();

  return (
    <Layout>
      <HeroSection
        title="Stories"
        subtitle="Behind-the-scenes insights, success stories, and lessons from Lencho Fikiru’s sets and collaborations."
      />

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <p className="text-muted-foreground">Loading stories...</p>
            )}
            {error && (
              <p className="text-destructive">Unable to load stories.</p>
            )}
            {storyData?.map((story) => (
              <StoryCard key={story.id} {...story} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
