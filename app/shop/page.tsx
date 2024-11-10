"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ShopFilters } from "@/components/shop-filters";
import { useRouter } from "next/navigation";
import { 
  Search, 
  ShoppingBag, 
  Star, 
  DollarSign, 
  Package,
  Plus,
  Truck
} from "lucide-react";

export default function ShopPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      name: "Premium Study Kit",
      category: "Study Materials",
      rating: 4.7,
      sold: 1250,
      price: 149.99,
      delivery: "2-3 days",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60",
      features: ["Textbooks", "Digital Resources", "Study Guides"],
      description: "Complete study materials for advanced learning",
      inStock: true
    },
    {
      id: 2,
      name: "Science Lab Equipment",
      category: "Laboratory",
      rating: 4.8,
      sold: 850,
      price: 299.99,
      delivery: "3-5 days",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60",
      features: ["Lab Tools", "Safety Equipment", "Experiment Kits"],
      description: "Professional lab equipment for science experiments",
      inStock: true
    },
    {
      id: 3,
      name: "Digital Learning Bundle",
      category: "Technology",
      rating: 4.9,
      sold: 2100,
      price: 199.99,
      delivery: "Instant Access",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60",
      features: ["Online Courses", "Learning Apps", "Study Tools"],
      description: "Comprehensive digital learning resources",
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Schoolsat Shop</h1>
              <p className="text-muted-foreground">
                Find the best educational materials and resources
              </p>
            </div>
            <Button onClick={() => router.push("/shop/create")}>
              <Plus className="h-4 w-4 mr-2" />
              List Product
            </Button>
          </div>

          <div className="relative">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <ShopFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div
                  className="h-48 bg-cover bg-center relative group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: `url(${product.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg">{product.name}</h3>
                    <p className="text-white/80 text-sm">{product.category}</p>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="ml-2">{product.sold} sold</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      {product.delivery}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold text-lg">{product.price}</span>
                    </div>
                    <Button onClick={() => router.push(`/shop/products/${product.id}`)}>
                      View Details
                    </Button>
                  </div>

                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => router.push(`/shop/cart`)}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}