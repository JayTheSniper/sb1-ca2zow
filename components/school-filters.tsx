"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, DollarSign, MapPin, GraduationCap } from "lucide-react";

export function SchoolFilters() {
  return (
    <Card className="p-4">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Input
            placeholder="Search schools..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

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
              <SelectItem value="tuition-low">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Lowest Tuition
                </div>
              </SelectItem>
              <SelectItem value="nearest">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Nearest
                </div>
              </SelectItem>
              <SelectItem value="students">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Most Students
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
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="arts">Arts & Design</SelectItem>
              <SelectItem value="science">Science</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Tuition Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ranges</SelectItem>
              <SelectItem value="under-5k">Under $5,000/year</SelectItem>
              <SelectItem value="5k-10k">$5,000 - $10,000/year</SelectItem>
              <SelectItem value="10k-20k">$10,000 - $20,000/year</SelectItem>
              <SelectItem value="over-20k">Over $20,000/year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}