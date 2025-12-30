import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader } from "@/components/shared";
import { Award, Film, Music, Users } from "lucide-react";
import axios from "axios";
import api from "@/api";

export default function About() {
  const [about, setAbout] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get("/about?lang=en"); // Fetch English content
        setAbout(res.data);
      } catch (err) {
        console.error("Error fetching about content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!about) return <div className="text-center py-20">No content found.</div>;

  // Map icons dynamically if achievementStats exist
  const iconMap: any = { Film, Music, Award, Users };

  return (
    <Layout>
      <HeroSection title={`About ${about.full_name}`} subtitle={about.bio_short} />

      {/* Portrait */}
      <section className="section-padding pt-10 pb-6">
        <div className="container-custom grid gap-8 md:grid-cols-[1.1fr_1fr] items-center">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <img
              src={about.portrait_local ?? about.portrait_url ?? "/img/lencho_fikru.jpg"}
              alt={about.full_name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{about.full_name}</h2>
            <p className="text-muted-foreground">{about.role}</p>
            <p className="text-muted-foreground">{about.bio_long_1}</p>
            <p className="text-muted-foreground">{about.bio_long_2}</p>
          </div>
        </div>
      </section>

      {/* Background & Journey */}
      <section className="section-padding">
        <div className="container-custom space-y-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">{about.full_name}</h1>
            <p className="mt-2 text-muted-foreground">{about.role}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground">{about.background_title}</h2>
              <p className="mt-3 text-muted-foreground">{about.background_p1}</p>
              <p className="mt-3 text-muted-foreground">{about.background_p2}</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground">{about.oromo_work_title}</h2>
              <p className="mt-3 text-muted-foreground">{about.oromo_work_p1}</p>
              <p className="mt-3 text-muted-foreground">{about.oromo_work_p2}</p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground">{about.vision_title}</h2>
            <p className="mt-3 text-muted-foreground">{about.vision_description}</p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      {about.philosophies && about.philosophies.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container-custom">
            <SectionHeader
              title="Philosophy"
              subtitle="Principles that shape direction, collaboration, and delivery"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {about.philosophies.map((item: any) => (
                <div
                  key={item.title}
                  className="p-6 bg-background rounded-lg border border-border"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Achievements */}
      {about.achievement_stats && about.achievement_stats.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <SectionHeader title="By The Numbers" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {about.achievement_stats.map((item: any) => {
                const Icon = iconMap[item.icon] ?? Users;
                return (
                  <div key={item.label} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="text-4xl font-bold text-foreground">{item.value}</div>
                    <div className="text-muted-foreground mt-1">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Milestones */}
      {about.milestones && about.milestones.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container-custom">
            <SectionHeader
              title="Milestones"
              subtitle="Key wins shaping the journey"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {about.milestones.map((item: any) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className="p-6 rounded-lg border border-border bg-background/60"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 text-xs font-semibold uppercase rounded-full bg-primary/10 text-primary">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
