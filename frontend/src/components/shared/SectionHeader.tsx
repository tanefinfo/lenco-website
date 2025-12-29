import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-1 w-16 bg-primary rounded-full",
          align === "center" ? "mx-auto" : ""
        )}
      />
    </div>
  );
}
