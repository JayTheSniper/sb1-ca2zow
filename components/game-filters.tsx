"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Brain, Clock, Trophy, Users } from "lucide-react";

export function GameFilters() {
  return (
    <Card className="p-4">
      <div className="flex flex-col space-y-4">
        <div className="relative">
          <Input
            placeholder="Search games..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex flex-wrap gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="math">Mathematics</SelectItem>
              <SelectItem value="language">Language Arts</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="social">Social Studies</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Grade Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="k-2">K-2</SelectItem>
              <SelectItem value="3-5">3-5</SelectItem>
              <SelectItem value="6-8">6-8</SelectItem>
              <SelectItem value="9-12">9-12</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="popular">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="difficulty">Difficulty</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}