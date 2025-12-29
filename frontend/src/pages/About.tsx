import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader } from "@/components/shared";
import { Award, Film, Music, Users } from "lucide-react";
import { useProfile } from "@/hooks/useContent";

const achievementStats = [
  { icon: Film, label: "Films Produced", value: "25+" },
  { icon: Music, label: "Music Videos", value: "100+" },
  { icon: Award, label: "Awards Won", value: "15" },
  { icon: Users, label: "Students Trained", value: "500+" },
];

const achievementHighlights = [
  {
    year: "2025",
    title: "Directed festival-bound short 'Echoes of Tomorrow'",
    detail:
      "Premiered across three international festivals, showcasing Oromo narratives with a modern visual language.",
  },
  {
    year: "2024",
    title: "Mentored Abba Lata Acting Academy cohorts",
    detail:
      "Guided actors through performance discipline, camera blocking, and on-set safety in collaboration with the academy.",
  },
  {
    year: "2023",
    title: "Led Oromo music video slate for emerging artists",
    detail:
      "Delivered high-clarity visuals and performance coaching that lifted songs to cinematic storytelling.",
  },
  {
    year: "2022",
    title: "Produced branded content with all-local crews",
    detail:
      "Balanced brand objectives with cultural authenticity, building repeat collaborations with regional partners.",
  },
];

export default function About() {
  const { data: profile } = useProfile();
  // Prefer local asset to avoid hotlink blocking; fall back to remote URL.
  const portrait =
    profile?.portraitLocal ?? profile?.portraitUrl ?? "/img/lencho_fikru.jpg";

  return (
    <Layout>
      <HeroSection
        title="About Lencho Fikiru"
        subtitle="A visionary creative force shaping the future of Oromo storytelling through film and music."
      />

      {/* Portrait */}
      <section className="section-padding pt-10 pb-6">
        <div className="container-custom grid gap-8 md:grid-cols-[1.1fr_1fr] items-center">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <img
              src={portrait}
              alt="Lencho Fikiru portrait"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Lencho Fikiru
            </h2>
            <p className="text-muted-foreground">
              Director, filmmaker, and creative leader focused on Oromo music
              videos and films. Lencho blends performance coaching with
              disciplined production to honor culture while meeting
              international standards.
            </p>
            <p className="text-muted-foreground">
              He collaborates closely with artists, crews, and brands to deliver
              precise visuals, safe sets, and stories that travel globally.
            </p>
          </div>
        </div>
      </section>
      {/* Background & Journey */}
      <section className="section-padding">
        <div className="container-custom space-y-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Lencho Fikiru
            </h1>
            <p className="mt-2 text-muted-foreground">
              Director · Filmmaker · Creative Leader
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground">
                Background & Journey
              </h2>
              <p className="mt-3 text-muted-foreground">
                Lencho Fikiru’s journey blends music and cinema—leading
                productions with respect for culture and craft. His work spans
                Oromo music videos and film projects, where he balances
                narrative clarity, strong performance direction, and a refined
                visual language.
              </p>
              <p className="mt-3 text-muted-foreground">
                He collaborates with artists and crews to build disciplined sets
                and precise editorial pipelines. The approach is both human and
                structured—aiming for emotionally honest results that travel
                well across audiences.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground">
                Oromo Music Videos & Movies
              </h2>
              <p className="mt-3 text-muted-foreground">
                In Oromo music videos, Lencho elevates songs into visual
                stories—using camera movement, blocking, and performance
                coaching to extend the emotional arc. In longer-form projects,
                he leans on disciplined pre-production and on-set communication
                to protect actors and the story’s integrity.
              </p>
              <p className="mt-3 text-muted-foreground">
                The goal is always clarity and respect: honoring language and
                culture while presenting visuals with international standards of
                craft.
              </p>
            </div>
          </div>

          {/* Vision & Impact */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground">
              Vision & Impact
            </h2>
            <p className="mt-3 text-muted-foreground">
              Lencho’s vision centers on creative leadership—clear briefs,
              steady sets, and editorial choices that serve performance. Impact
              is measured by how stories move people and how crews grow;
              training, mentorship, and repeatable workflows are part of every
              collaboration.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Achievements
                </h3>
                <ul className="mt-2 space-y-2">
                  {[
                    "Directed award-winning Oromo music videos",
                    "Mentored aspiring actors and filmmakers",
                    "Collaborated on culturally significant films",
                  ].map((item) => (
                    <li key={item} className="text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Links</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="text-muted-foreground">
                    Instagram: instagram.com/lenchofikru (content to be refined)
                  </li>
                  <li className="text-muted-foreground">
                    Facebook: facebook.com/lencho.fikru.3 (content to be
                    refined)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Lencho’s Philosophy"
            subtitle="Principles that shape how he directs, collaborates, and delivers"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticity",
                desc: "Lencho tells stories rooted in real African experiences, cultures, and perspectives—never watered down for external approval.",
              },
              {
                title: "Excellence",
                desc: "He holds himself to international production standards while maintaining a distinct creative voice and cultural identity.",
              },
              {
                title: "Legacy",
                desc: "Every project is a chance to inspire the next generation and contribute to the growing canon of African creative excellence.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-background rounded-lg border border-border"
              >
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader title="By The Numbers" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievementStats.map((item) => (
              <div key={item.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <item.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold text-foreground">
                  {item.value}
                </div>
                <div className="text-muted-foreground mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Highlights */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Milestones"
            subtitle="Key wins shaping Lencho Fikiru’s journey"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievementHighlights.map((item) => (
              <div
                key={`${item.year}-${item.title}`}
                className="p-6 rounded-lg border border-border bg-background/60"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-xs font-semibold uppercase rounded-full bg-primary/10 text-primary">
                    {item.year}
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
