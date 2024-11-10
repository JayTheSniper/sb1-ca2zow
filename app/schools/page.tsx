"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, MapPin, DollarSign, Users, GraduationCap, BookOpen } from "lucide-react";
import { SchoolFilters } from "@/components/school-filters";

export default function SchoolsPage() {
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
      description: "Leading technology institution with state-of-the-art facilities and industry partnerships.",
      facilities: ["Computer Labs", "Innovation Hub", "Research Center"],
      achievements: "Top 10 Tech Schools 2024"
    },
    {
      id: 2,
      name: "Creative Arts Institute",
      type: "Arts & Design",
      rating: 4.8,
      students: 800,
      distance: "3.8 km",
      tuition: "$9,500/year",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60",
      description: "Premier arts institution focusing on digital and traditional mediums.",
      facilities: ["Art Studios", "Digital Lab", "Exhibition Space"],
      achievements: "Best Design School 2023"
    },
    {
      id: 3,
      name: "Business Excellence School",
      type: "Business & Management",
      rating: 4.7,
      students: 1500,
      distance: "1.2 km",
      tuition: "$11,000/year",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60",
      description: "Preparing future business leaders with practical experience and industry connections.",
      facilities: ["Trading Room", "Conference Center", "Startup Incubator"],
      achievements: "Top Business School Award"
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Schools</h1>
            <p className="text-muted-foreground">
              Discover top-rated educational institutions in your area
            </p>
          </div>

          <SchoolFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <Card key={school.id} className="overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${school.image})` }}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{school.name}</h3>
                      <p className="text-sm text-muted-foreground">{school.type}</p>
                    </div>
                    <div className="flex items-center bg-primary/10 text-primary rounded-full px-2 py-1">
                      <Star className="h-4 w-4 mr-1 fill-primary" />
                      <span className="font-medium">{school.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm mb-4">{school.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {school.facilities.map((facility) => (
                      <span
                        key={facility}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {school.students} students
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      {school.achievements}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {school.distance}
                    </div>
                    <div className="flex items-center font-medium">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {school.tuition}
                    </div>
                  </div>

                  <Button className="w-full">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}