"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  School,
  Gamepad2,
  Video,
  ShoppingBag,
  Users,
  BookOpen,
  Trophy,
  MapPin
} from "lucide-react";

const shortcuts = [
  { icon: School, label: "Education", href: "/education" },
  { icon: Gamepad2, label: "Games", href: "/games" },
  { icon: Video, label: "Videos", href: "/videos" },
  { icon: ShoppingBag, label: "Shop", href: "/shop" },
  { icon: Users, label: "Groups", href: "/games/groups" },
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: Trophy, label: "Sports", href: "/sports" },
  { icon: MapPin, label: "Location", href: "/location" }
];

export function Shortcuts() {
  return (
    <Card className="p-4">
      <div className="space-y-2">
        {shortcuts.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  );
}