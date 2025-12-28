import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  className?: string;
}

export function StoryCard({
  id,
  title,
  excerpt,
  image,
  category,
  readTime,
  date,
  className,
}: StoryCardProps) {
  return (
    <Link
      to={`/stories/${id}`}
      className={cn(
        "group block bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        className
      )}
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="px-2 py-1 bg-muted rounded-full">{category}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime}
          </span>
          <span>{date}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {excerpt}
        </p>
        <span className="inline-flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all">
          Read More
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
