"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EducationCard } from "@/components/education/education-card";
import { Search, MapPin, DollarSign, Star } from "lucide-react";

export default function EducationPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const educationItems = [
    {
      id: 1,
      type: "university",
      name: "Stanford University",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=60",
      rating: 4.9,
      location: "Stanford, CA",
      price: "$52,000/year",
      description: "Leading research university offering a wide range of programs"
    },
    {
      id: 2,
      type: "course",
      name: "Advanced Machine Learning",
      image: "https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?w=800&auto=format&fit=crop&q=60",
      rating: 4.7,
      location: "Online",
      price: "$999",
      description: "Comprehensive course covering ML fundamentals to advanced topics"
    },
    // Add more education items as needed
  ];

  const filteredItems = educationItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search universities, courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <Button variant="outline">
            <MapPin className="h-4 w-4 mr-2" />
            Location
          </Button>
          <Button variant="outline">
            <DollarSign className="h-4 w-4 mr-2" />
            Price
          </Button>
          <Button variant="outline">
            <Star className="h-4 w-4 mr-2" />
            Rating
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="universities">Universities</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <EducationCard key={item.id} {...item} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="universities" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems
                .filter(item => item.type === "university")
                .map(item => (
                  <EducationCard key={item.id} {...item} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="courses" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems
                .filter(item => item.type === "course")
                .map(item => (
                  <EducationCard key={item.id} {...item} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}