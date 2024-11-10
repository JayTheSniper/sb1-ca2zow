"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft,
  Star,
  ShoppingBag,
  Truck,
  Package,
  Shield,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

export default function ProductPage({ params }: { params: { productId: string } }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  // In a real app, fetch product details from API
  const product = {
    id: parseInt(params.productId),
    name: "Premium Study Kit",
    category: "Study Materials",
    rating: 4.7,
    reviews: 128,
    price: 149.99,
    delivery: "2-3 days",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60",
    features: ["Textbooks", "Digital Resources", "Study Guides"],
    description: "Complete study materials for advanced learning",
    specifications: {
      "Package Contents": "3 Textbooks, 1 Study Guide, Digital Access Code",
      "Material": "High-quality paper, Hardcover binding",
      "Digital Access": "12 months",
      "Language": "English",
      "Grade Level": "High School / College"
    },
    reviews: [
      {
        id: 1,
        user: "John D.",
        rating: 5,
        comment: "Excellent study materials, very comprehensive!",
        date: "2 weeks ago"
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 4,
        comment: "Great quality, but a bit pricey.",
        date: "1 month ago"
      }
    ]
  };

  const addToCart = () => {
    // In a real app, implement cart functionality
    toast.success("Added to cart!");
    router.push("/shop/cart");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push("/shop")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Card className="overflow-hidden">
              <div
                className="aspect-square bg-cover bg-center"
                style={{ backgroundImage: `url(${product.image})` }}
              />
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-muted-foreground ml-1">
                    ({product.reviews} reviews)
                  </span>
                </div>
                <span className="text-muted-foreground">
                  Category: {product.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-2xl font-bold">
              <DollarSign className="h-6 w-6" />
              {product.price}
            </div>

            <div className="flex flex-wrap gap-2">
              {product.features.map((feature) => (
                <span
                  key={feature}
                  className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>

            <div className="space-y-4 border-t pt-4">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span>Delivery in {product.delivery}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <span>In Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span>Secure Payment</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={addToCart}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1"
                onClick={() => router.push("/shop/cart")}
              >
                Buy Now
              </Button>
            </div>

            <Tabs defaultValue="description" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <Card className="p-6">
                  <p className="text-muted-foreground">
                    {product.description}
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="specifications" className="mt-4">
                <Card className="p-6">
                  <dl className="space-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key}>
                        <dt className="font-medium">{key}</dt>
                        <dd className="text-muted-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <Card className="p-6">
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium">{review.user}</span>
                            <div className="flex items-center">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-4 w-4 fill-primary text-primary"
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}