import { useState } from "react";
import { Layout } from "@/components/layout";
import { HeroSection, ProductCard } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useContent";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Equipment",
  "Lighting",
  "Audio",
  "Apparel",
  "Prints",
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: productData, isLoading, error } = useProducts();

  const filteredProducts = (productData ?? []).filter((p) =>
    activeCategory === "All" ? true : p.category === activeCategory
  );

  return (
    <Layout>
      <HeroSection
        title="Products"
        subtitle="Creative services and media offerings from Lencho Fikiru. E-commerce UI only for now."
      />

      <section className="section-padding">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={cn(activeCategory === cat && "glow-primary")}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading && (
              <p className="text-muted-foreground">Loading products...</p>
            )}
            {error && (
              <p className="text-destructive">Unable to load products.</p>
            )}
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
