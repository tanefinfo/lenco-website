import { Link } from "react-router-dom";
import { Layout } from "@/components/layout";
import {
  SectionHeader,
  ProjectCard,
  ProgramCard,
  ProductCard,
} from "@/components/shared";
import { Testimonials } from "@/components/shared/Testimonials";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Play,
  Film,
  GraduationCap,
  ShoppingBag,
  Music,
  Headphones,
  Disc3,
  Clapperboard,
  Camera,
} from "lucide-react";
import { useProducts, usePrograms, useProjects } from "@/hooks/useContent";

export default function Home() {
  const {
    data: projectData,
    isLoading: loadingProjects,
    error: projectsError,
  } = useProjects();
  const {
    data: programData,
    isLoading: loadingPrograms,
    error: programsError,
  } = usePrograms();
  const {
    data: productData,
    isLoading: loadingProducts,
    error: productsError,
  } = useProducts();

  const floatingIcons = [
    { Icon: Film, style: { top: "16%", left: "10%" }, delay: "0s", size: 38 },
    {
      Icon: Clapperboard,
      style: { top: "12%", right: "16%" },
      delay: "0.6s",
      size: 36,
    },
    { Icon: Camera, style: { top: "32%", left: "6%" }, delay: "1s", size: 34 },
    {
      Icon: Music,
      style: { top: "24%", right: "10%" },
      delay: "0.2s",
      size: 36,
    },
    {
      Icon: Headphones,
      style: { bottom: "28%", left: "12%" },
      delay: "1.2s",
      size: 34,
    },
    {
      Icon: Disc3,
      style: { bottom: "24%", right: "10%" },
      delay: "0.8s",
      size: 36,
    },
    {
      Icon: GraduationCap,
      style: { bottom: "32%", left: "22%" },
      delay: "1.4s",
      size: 32,
    },
    {
      Icon: ShoppingBag,
      style: { bottom: "20%", right: "22%" },
      delay: "1.8s",
      size: 32,
    },
    {
      Icon: Music,
      style: { top: "42%", left: "26%" },
      delay: "0.9s",
      size: 32,
    },
    {
      Icon: Headphones,
      style: { bottom: "14%", left: "30%" },
      delay: "1.6s",
      size: 30,
    },
    {
      Icon: Clapperboard,
      style: { top: "46%", right: "30%" },
      delay: "1.1s",
      size: 32,
    },
    {
      Icon: Disc3,
      style: { bottom: "12%", right: "28%" },
      delay: "2s",
      size: 30,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-crimson-glow opacity-40" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="hero-grid" />
          <div
            className="hero-orb"
            style={{
              width: "26rem",
              height: "26rem",
              top: "5%",
              right: "-8%",
              background:
                "radial-gradient(circle at 30% 30%, hsla(0,72%,60%,0.4), transparent 60%)",
            }}
          />
          <div
            className="hero-orb"
            style={{
              width: "22rem",
              height: "22rem",
              bottom: "-4%",
              left: "-6%",
              background:
                "radial-gradient(circle at 70% 40%, hsla(0,72%,45%,0.35), transparent 55%)",
              animationDelay: "0.6s",
            }}
          />
          <div
            className="hero-orb"
            style={{
              width: "18rem",
              height: "18rem",
              top: "30%",
              left: "45%",
              background:
                "radial-gradient(circle at 50% 50%, hsla(0,0%,100%,0.12), transparent 65%)",
              animationDelay: "1s",
            }}
          />
          <div className="block">
            {floatingIcons.map(({ Icon, style, delay, size }, idx) => (
              <Icon
                key={`${Icon.displayName ?? Icon.name}-${idx}`}
                className="hero-float-icon text-primary/40 sm:text-primary/55"
                style={{
                  ...style,
                  animationDelay: delay,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary">Lencho Fikiru</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground tracking-tight animate-fade-in-up">
            Director · Filmmaker · Creative Leader
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Lencho Fikiru crafts cinematic stories rooted in Ethiopia—across
            Oromo music videos and films—leading crews with precision, cultural
            respect, and an international aesthetic.
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button asChild size="lg" className="gap-2 min-w-[200px]">
              <Link to="/works">
                <Play className="h-5 w-5" />
                Explore His Work
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 min-w-[180px]"
            >
              <Link to="/about">
                <GraduationCap className="h-5 w-5" />
                Learn More About Lencho
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2 min-w-[180px]"
            >
              <Link to="/products">
                <ShoppingBag className="h-5 w-5" />
                Products
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center p-2">
            <div className="w-1 h-2 rounded-full bg-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Major Works & Achievements */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Major Works & Achievements"
            subtitle="Selected projects and milestones from Lencho Fikiru"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadingProjects && (
              <p className="text-muted-foreground">Loading projects...</p>
            )}
            {projectsError && (
              <p className="text-destructive">Unable to load projects.</p>
            )}
            {projectData?.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/works">
                View All Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Academy section removed */}

      {/* Products Preview */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Products"
            subtitle="Creative services, media products, and tools for makers"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loadingProducts && (
              <p className="text-muted-foreground">Loading products...</p>
            )}
            {productsError && (
              <p className="text-destructive">Unable to load products.</p>
            )}
            {productData?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/products">
                Shop All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-crimson-glow opacity-30" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Ready to Collaborate?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Whether you want to collaborate, learn, or explore products—Lencho
            works hands-on with artists and crews to bring your vision to life.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/studio">Hire Our Studio</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
