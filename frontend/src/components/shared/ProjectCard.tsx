import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  className?: string;
}

export function ProjectCard({
  id,
  title,
  category,
  image,
  description,
  className,
}: ProjectCardProps) {
  return (
    <Link
      to={`/works/${id}`}
      className={cn(
        "group block relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        className
      )}
    >
      {/* Image */}
      <div className="aspect-video md:aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full mb-2">
          {category}
        </span>
        <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}
