import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  type: "upcoming" | "past";
  className?: string;
  layout?: "vertical" | "horizontal";
}

export function EventCard({
  id,
  title,
  date,
  location,
  image,
  type,
  className,
  layout = "vertical",
}: EventCardProps) {
  const isHorizontal = layout === "horizontal";

  return (
    <Link
      to={`/events/${id}`}
      className={cn(
        "group block bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        type === "past" && "opacity-75 hover:opacity-100",
        isHorizontal && "md:flex md:items-stretch",
        className
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "overflow-hidden relative",
          isHorizontal
            ? "md:w-56 md:flex-shrink-0 aspect-[4/3] md:aspect-[3/4]"
            : "aspect-[3/2]"
        )}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-full",
              type === "upcoming"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {type === "upcoming" ? "Upcoming" : "Past Event"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-5", isHorizontal && "md:flex-1 md:py-6 md:px-6")}>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {date}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {location}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <span className="inline-flex items-center text-sm text-primary font-medium mt-3 group-hover:gap-2 transition-all">
          View Details
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
