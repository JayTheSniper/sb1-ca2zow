"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { UnifiedFilters } from "@/components/unified-filters";
import { motion } from "framer-motion";
import { 
  School,
  BookOpen,
  Trophy,
  Star,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Search,
  GraduationCap,
  Activity,
  ShoppingBag,
  Truck
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const schools = [
    {
      id: 1,
      name: "International Tech Academy",
      type: "Technology & Engineering",
      rating: 4.9,
      students: 1200,
      distance: "2.5 km",
      tuition: "$12,000/year",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60",
      features: ["Computer Labs", "Innovation Hub", "Research Center"]
    }
  ];

  const courses = [
    {
      id: 1,
      name: "Advanced Web Development",
      provider: "Tech Academy",
      duration: "16 weeks",
      price: "$1,999",
      rating: 4.9,
      students: 3240,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
      features: ["Live Projects", "Career Support", "Certification"]
    }
  ];

  const sports = [
    {
      id: 1,
      name: "Elite Tennis Academy",
      category: "Tennis",
      rating: 4.8,
      members: 120,
      distance: "2.5 km",
      price: "$75/mo",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=60",
      features: ["6 Courts", "Pro Shop", "Fitness Center"]
    }
  ];

  const suppliers = [
    {
      id: 1,
      name: "Premium Study Kit",
      category: "Study Materials",
      rating: 4.7,
      sold: 1250,
      price: "$149.99",
      delivery: "2-3 days",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60",
      features: ["Textbooks", "Digital Resources", "Study Guides"]
    },
    {
      id: 2,
      name: "Science Lab Equipment",
      category: "Laboratory",
      rating: 4.8,
      sold: 850,
      price: "$299.99",
      delivery: "3-5 days",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60",
      features: ["Lab Tools", "Safety Equipment", "Experiment Kits"]
    },
    {
      id: 3,
      name: "Digital Learning Bundle",
      category: "Technology",
      rating: 4.9,
      sold: 2100,
      price: "$199.99",
      delivery: "Instant Access",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop&q=60",
      features: ["Online Courses", "Learning Apps", "Study Tools"]
    }
  ];

  const renderCard = (item: any, type: string) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
        <div
          className="h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-lg">{item.name}</h3>
            <p className="text-white/80 text-sm">
              {type === 'suppliers' ? item.category : type === 'schools' ? item.type : type === 'courses' ? item.provider : item.category}
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-primary text-primary mr-1" />
              <span className="font-medium">{item.rating}</span>
            </div>
            {type === 'suppliers' ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <ShoppingBag className="h-4 w-4 mr-1" />
                {item.sold} sold
              </div>
            ) : (
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="h-4 w-4 mr-1" />
                {type === 'sports' ? `${item.members} members` : `${item.students} students`}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {item.features.map((feature: string) => (
              <span
                key={feature}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm mb-4">
            {type === 'suppliers' ? (
              <div className="flex items-center text-muted-foreground">
                <Truck className="h-4 w-4 mr-1" />
                {item.delivery}
              </div>
            ) : (
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {item.distance}
              </div>
            )}
            <div className="flex items-center font-medium">
              <DollarSign className="h-4 w-4 mr-1" />
              {type === 'schools' ? item.tuition : item.price}
            </div>
          </div>

          <Button 
            className="w-full"
            onClick={() => router.push(`/checkout/${type}/${item.id}`)}
          >
            {type === 'suppliers' ? 'Add to Cart' : type === 'schools' ? 'Apply Now' : type === 'courses' ? 'Enroll Now' : 'Join Club'}
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Explore Education</h1>
            <p className="text-muted-foreground">
              Discover schools, courses, activities, and educational supplies
            </p>
          </div>

          <div className="relative">
            <Input
              placeholder="Search everything..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                All
              </TabsTrigger>
              <TabsTrigger value="schools" className="flex items-center gap-2">
                <School className="h-4 w-4" />
                Schools
              </TabsTrigger>
              <TabsTrigger value="courses" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Courses
              </TabsTrigger>
              <TabsTrigger value="sports" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Sports
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Supplies
              </TabsTrigger>
            </TabsList>

            <UnifiedFilters />

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...schools, ...courses, ...sports, ...suppliers].map((item, index) => {
                  const type = index < schools.length ? 'schools' :
                             index < schools.length + courses.length ? 'courses' :
                             index < schools.length + courses.length + sports.length ? 'sports' : 'suppliers';
                  return renderCard(item, type);
                })}
              </div>
            </TabsContent>

            <TabsContent value="schools">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schools.map((school) => renderCard(school, 'schools'))}
              </div>
            </TabsContent>

            <TabsContent value="courses">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => renderCard(course, 'courses'))}
              </div>
            </TabsContent>

            <TabsContent value="sports">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sports.map((sport) => renderCard(sport, 'sports'))}
              </div>
            </TabsContent>

            <TabsContent value="suppliers">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suppliers.map((supplier) => renderCard(supplier, 'suppliers'))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}