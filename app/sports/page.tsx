"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Search, Star, MapPin, DollarSign, Clock, Users, Trophy, Activity } from "lucide-react";
import Link from "next/link";
import { SportsFilters } from "@/components/sports-filters";

export default function SportsPage() {
  const sportsClubs = [
    {
      id: 1,
      name: "Elite Tennis Academy",
      category: "Tennis",
      rating: 4.8,
      members: 120,
      distance: "2.5 km",
      price: "$75/mo",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800&auto=format&fit=crop&q=60",
      description: "Professional tennis training for all levels. Indoor and outdoor courts available.",
      facilities: ["6 Courts", "Pro Shop", "Fitness Center"],
      achievements: "15+ Tournament Winners"
    },
    {
      id: 2,
      name: "Dragon Swimming Club",
      category: "Swimming",
      rating: 4.7,
      members: 200,
      distance: "3.8 km",
      price: "$60/mo",
      image: "https://images.unsplash.com/photo-1600965962361-9035246747c4?w=800&auto=format&fit=crop&q=60",
      description: "Olympic-size pool with professional coaches for all age groups.",
      facilities: ["50m Pool", "Training Pool", "Sauna"],
      achievements: "Regional Champions 2023"
    },
    {
      id: 3,
      name: "Warriors Basketball Academy",
      category: "Basketball",
      rating: 4.9,
      members: 150,
      distance: "1.2 km",
      price: "$85/mo",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=60",
      description: "Comprehensive basketball training program with experienced coaches.",
      facilities: ["2 Courts", "Training Area", "Video Analysis"],
      achievements: "Youth League Winners"
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Sports & Clubs</h1>
            <p className="text-muted-foreground">
              Discover and join the best sports clubs in your area
            </p>
          </div>

          <SportsFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportsClubs.map((club) => (
              <Card key={club.id} className="overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${club.image})` }}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{club.name}</h3>
                      <p className="text-sm text-muted-foreground">{club.category}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                      <span className="font-medium">{club.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm mb-4">{club.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {club.facilities.map((facility) => (
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
                      {club.members} members
                    </div>
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />
                      {club.achievements}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {club.distance}
                    </div>
                    <div className="flex items-center font-medium">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {club.price}
                    </div>
                  </div>

                  <Button className="w-full">Join Club</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}