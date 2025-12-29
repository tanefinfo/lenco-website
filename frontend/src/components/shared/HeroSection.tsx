import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showOverlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  showOverlay = true,
  className,
  children,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative min-h-[32vh] flex items-center justify-center",
        className
      )}
    >
      {/* Background */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      )}

      {/* Crimson Glow Effect */}
      <div className="absolute inset-0 bg-crimson-glow opacity-30" />

      {/* Content */}
      <div className="relative z-10 container-custom text-center py-12 md:py-14">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground tracking-tight animate-fade-in-up">
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div
            className="mt-8 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
