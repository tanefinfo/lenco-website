import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProduct } from "@/hooks/useContent";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id);

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
            <span className="text-muted-foreground/60">/</span>
            <span className="text-foreground">Product Details</span>
          </div>

          {isLoading && (
            <p className="text-muted-foreground">Loading product...</p>
          )}
          {error && <p className="text-destructive">Unable to load product.</p>}
          {!isLoading && !product && !error && (
            <p className="text-muted-foreground">Product not found.</p>
          )}

          {product && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-border">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[420px] object-cover"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {product.gallery.map((src) => (
                    <div
                      key={src}
                      className="overflow-hidden rounded-xl border border-border"
                    >
                      <img
                        src={src}
                        alt={product.name}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Badge className="w-fit">{product.category}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {product.name}
                  </h1>
                  <p className="text-lg text-primary font-semibold">
                    {product.price}
                  </p>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">Product Story</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.fullDescription}
                  </p>
                  <p className="text-sm text-muted-foreground/80">
                    {product.story}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="w-full sm:w-auto gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full sm:w-auto gap-2"
                  >
                    <Link to="/contact">
                      <Sparkles className="h-4 w-4" />
                      Custom Order
                    </Link>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Checkout and inventory will connect to the backend in a later
                  phase.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
