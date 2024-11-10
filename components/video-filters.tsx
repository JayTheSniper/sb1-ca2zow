"use client";

import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Clock, ThumbsUp, Eye } from "lucide-react";

interface VideoFiltersProps {
  categories: string[];
  durations: { value: string; label: string; }[];
  levels: { value: string; label: string; }[];
  selectedCategory: string;
  selectedDuration: string;
  selectedLevel: string;
  sortBy: string;
  onCategoryChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onLevelChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export function VideoFilters({
  categories,
  durations,
  levels,
  selectedCategory,
  selectedDuration,
  selectedLevel,
  sortBy,
  onCategoryChange,
  onDurationChange,
  onLevelChange,
  onSortChange
}: VideoFiltersProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap gap-4">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </div>
            </SelectItem>
            <SelectItem value="newest">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Newest
              </div>
            </SelectItem>
            <SelectItem value="popular">
              <div className="flex items-center">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Most Liked
              </div>
            </SelectItem>
            <SelectItem value="views">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Most Viewed
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDuration} onValueChange={onDurationChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Duration" />
          </SelectTrigger>
          <SelectContent>
            {durations.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLevel} onValueChange={onLevelChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}