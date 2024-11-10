"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, TrendingUp, DollarSign, MapPin, Clock } from "lucide-react";

export function Filters() {
  return (
    <Card className="p-4">
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
                Trending
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
            <SelectItem value="recent">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Most Recent
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

        <Select defaultValue="500">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">Under $100/mo</SelectItem>
            <SelectItem value="500">Under $500/mo</SelectItem>
            <SelectItem value="1000">Under $1000/mo</SelectItem>
            <SelectItem value="any">Any Price</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}