import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  className?: string;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        className
      )}
    >
      {/* Image */}
      <Link to={`/products/${id}`} className="block aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {category}
        </span>
        <Link to={`/products/${id}`}>
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mt-1">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-primary">{price}</span>
          <Button size="sm" variant="outline" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
