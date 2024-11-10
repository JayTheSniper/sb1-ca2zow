"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Star } from "lucide-react";

interface EducationCardProps {
  type: "university" | "course";
  name: string;
  image: string;
  rating: number;
  location: string;
  price: string;
  description: string;
}

export function EducationCard({
  type,
  name,
  image,
  rating,
  location,
  price,
  description
}: EducationCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <Badge 
          className="absolute top-2 left-2"
          variant={type === "university" ? "default" : "secondary"}
        >
          {type === "university" ? "University" : "Course"}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span>{price}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Learn More</Button>
      </CardFooter>
    </Card>
  );
}