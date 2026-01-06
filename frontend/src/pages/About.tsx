import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { HeroSection, SectionHeader } from "@/components/shared";
import api from "@/api";

export default function About() {
    const [about, setAbout] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await api.get("/about");
                setAbout(res.data);
                console.log(about);
            } catch (error) {
                console.error("Failed to fetch about content:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAbout();
    }, []);

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!about) {
        return <div className="text-center py-20">No content found.</div>;
    }

    return (
        <Layout>
            {/* Hero */}
            <HeroSection
                title={about.hero_title}
                subtitle={about.hero_subtitle}
            />

            {/* Portrait + Bio */}
            <section className="section-padding pt-10">
                <div className="container-custom grid gap-8 md:grid-cols-2 items-center">
                    <div className="rounded-2xl overflow-hidden border">
                        <img
                            src={about.portrait_url}
                            alt={about.full_name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">
                            {about.full_name}
                        </h2>
                        <p className="text-muted-foreground">
                            {about.role}
                        </p>
                        <p className="text-muted-foreground">
                            {about.bio_long_1}
                        </p>
                        <p className="text-muted-foreground">
                            {about.bio_long_2}
                        </p>
                    </div>
                </div>
            </section>

            {/* Background & Work */}
            <section className="section-padding">
                <div className="container-custom grid md:grid-cols-2 gap-8">
                    <div className="bg-card p-6 rounded-lg border">
                        <h3 className="text-xl font-semibold">
                            {about.background_title}
                        </h3>
                        <p className="mt-3 text-muted-foreground">
                            {about.background_p1}
                        </p>
                        <p className="mt-3 text-muted-foreground">
                            {about.background_p2}
                        </p>
                    </div>

                    <div className="bg-card p-6 rounded-lg border">
                        <h3 className="text-xl font-semibold">
                            {about.oromo_work_title}
                        </h3>
                        <p className="mt-3 text-muted-foreground">
                            {about.oromo_work_p1}
                        </p>
                        <p className="mt-3 text-muted-foreground">
                            {about.oromo_work_p2}
                        </p>
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="section-padding">
                <div className="container-custom bg-card p-6 rounded-lg border">
                    <h3 className="text-xl font-semibold">
                        {about.vision_title}
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                        {about.vision_description}
                    </p>
                </div>
            </section>

            {/* Philosophy */}
            {about.philosophies?.length > 0 && (
                <section className="section-padding bg-card">
                    <div className="container-custom">
                        <SectionHeader title="Philosophy" />
                        <div className="grid md:grid-cols-3 gap-6">
                            {about.philosophies.map(
                                (item: any, index: number) => (
                                    <div
                                        key={index}
                                        className="p-6 border rounded-lg bg-background"
                                    >
                                        <p className="text-muted-foreground">
                                            {item.text}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </section>
            )}
        </Layout>
    );
}
