"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, TrendingUp, DollarSign, MapPin, Activity } from "lucide-react";

const categories = [
  "All Sports",
  "Tennis",
  "Swimming",
  "Basketball",
  "Football",
  "Volleyball",
  "Martial Arts",
  "Yoga",
  "Athletics",
];

export function SportsFilters() {
  return (
    <Card className="p-4">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Input
            placeholder="Search sports clubs..."
            className="pl-10"
          />
          <Activity className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex flex-wrap gap-4">
          <Select defaultValue="best">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Best Rated
                </div>
              </SelectItem>
              <SelectItem value="trending">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Most Popular
                </div>
              </SelectItem>
              <SelectItem value="cheapest">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Lowest Price
                </div>
              </SelectItem>
              <SelectItem value="nearest">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Nearest
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="5km">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1km">Within 1 km</SelectItem>
              <SelectItem value="5km">Within 5 km</SelectItem>
              <SelectItem value="10km">Within 10 km</SelectItem>
              <SelectItem value="25km">Within 25 km</SelectItem>
              <SelectItem value="any">Any Distance</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="100">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50">Under $50/mo</SelectItem>
              <SelectItem value="100">Under $100/mo</SelectItem>
              <SelectItem value="200">Under $200/mo</SelectItem>
              <SelectItem value="any">Any Price</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All Sports" ? "default" : "secondary"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}