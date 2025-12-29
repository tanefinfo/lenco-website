import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader, ProgramCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { usePrograms, useMentors, useVideos } from "@/hooks/useContent";

export default function Academy() {
  const {
    data: programData,
    isLoading: loadingPrograms,
    error: programsError,
  } = usePrograms();
  const {
    data: mentorData,
    isLoading: loadingMentors,
    error: mentorsError,
  } = useMentors();
  const { data: videoData } = useVideos();
  const academyVideos = videoData?.academyVideos ?? [];

  return (
    <Layout>
      <HeroSection
        title="Abba Lata Acting Academy"
        subtitle="Mission-driven training for actors and creators. Practical mentorship and production-ready skills."
      />

      {/* About */}
      <section className="section-padding pt-10 pb-6">
        <div className="container-custom">
          <SectionHeader
            title="About the Academy"
            subtitle="Built to train actors and creators with discipline, cultural respect, and on-set readiness."
          />
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground">
                The Abba Lata Acting Academy focuses on performance
                fundamentals, blocking for camera, and professional set
                etiquette. Students gain practical feedback from working mentors
                and learn to collaborate across film and music video
                productions.
              </p>
              <p className="text-muted-foreground mt-4">
                Cohorts rehearse regularly, work on recorded scenes, and review
                footage to improve presence, movement, and timing. Safety,
                respect, and cultural authenticity remain at the center of every
                module.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-base font-semibold text-foreground">
                Highlights
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Camera-ready performance drills</li>
                <li>Scene study with mentor feedback</li>
                <li>On-set communication & safety</li>
                <li>Music video and film blocking labs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Programs"
            subtitle="Join a cohort designed to level up your craft"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingPrograms && (
              <p className="text-muted-foreground">Loading programs...</p>
            )}
            {programsError && (
              <p className="text-destructive">Unable to load programs.</p>
            )}
            {programData?.map((program) => (
              <ProgramCard key={program.id} {...program} />
            ))}
          </div>
        </div>
      </section>

      {/* Academy Introduction & Gallery */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Mission & Purpose"
            subtitle="Training grounded in respect for culture, performance discipline, and on-set safety"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="text-base font-semibold text-foreground">
                  Student Project #{i}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Gallery placeholder—swap with student stills or
                  behind-the-scenes images.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Videos */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title="Academy Videos"
            subtitle="Sessions and showcases from the academy (embeds as placeholders)"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academyVideos.map((v) => (
              <div
                key={v.id}
                className="bg-card border border-border rounded-lg overflow-hidden"
              >
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={v.embedUrl ?? `https://www.youtube.com/embed/${v.id}`}
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
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://www.youtube.com/@AbbaaLataaActingAcademy"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              Visit the academy’s YouTube channel for more
            </a>
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Mentors"
            subtitle="Guides who help you grow with practical feedback"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loadingMentors && (
              <p className="text-muted-foreground">Loading mentors...</p>
            )}
            {mentorsError && (
              <p className="text-destructive">Unable to load mentors.</p>
            )}
            {mentorData?.map((mentor) => (
              <div key={mentor.id} className="text-center">
                <div className="aspect-square rounded-full overflow-hidden mx-auto w-40 mb-4 border-2 border-primary/20">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {mentor.name}
                </h3>
                <p className="text-sm text-primary">{mentor.role}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {mentor.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Applications are now open for all programs. Take the first step
            toward your creative career.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Apply Now</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
