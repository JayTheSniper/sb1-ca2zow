"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, DollarSign, Clock, BookOpen } from "lucide-react";

export function CourseFilters() {
  return (
    <Card className="p-4">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Input
            placeholder="Search courses..."
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
              <SelectItem value="price-low">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Price: Low to High
                </div>
              </SelectItem>
              <SelectItem value="duration">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Duration
                </div>
              </SelectItem>
              <SelectItem value="popularity">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Most Popular
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="data">Data Science</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Duration</SelectItem>
              <SelectItem value="short">0-4 weeks</SelectItem>
              <SelectItem value="medium">4-12 weeks</SelectItem>
              <SelectItem value="long">12+ weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}