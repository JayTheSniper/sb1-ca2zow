"use client";

import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, TrendingUp, DollarSign, MapPin, Clock } from "lucide-react";

export function UnifiedFilters() {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-4">
        <Select defaultValue="rating">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Top Rated
              </div>
            </SelectItem>
            <SelectItem value="trending">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Most Popular
              </div>
            </SelectItem>
            <SelectItem value="price-low">
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Price: Low to High
              </div>
            </SelectItem>
            <SelectItem value="price-high">
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Price: High to Low
              </div>
            </SelectItem>
            <SelectItem value="nearest">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Nearest First
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

        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="under-100">Under $100</SelectItem>
            <SelectItem value="100-500">$100 - $500</SelectItem>
            <SelectItem value="500-1000">$500 - $1,000</SelectItem>
            <SelectItem value="1000-plus">$1,000+</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Duration</SelectItem>
            <SelectItem value="short">Short (0-4 weeks)</SelectItem>
            <SelectItem value="medium">Medium (1-3 months)</SelectItem>
            <SelectItem value="long">Long (3+ months)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}