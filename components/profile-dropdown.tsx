"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  BookOpen,
  ShoppingBag,
  Heart,
  Clock,
  Shield,
  GraduationCap,
  Receipt,
  Bookmark,
  Activity,
  Users,
  Palette
} from "lucide-react";
import { toast } from "sonner";

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
}

export function ProfileDropdown({ user }: ProfileDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      group: "Profile",
      items: [
        { icon: User, label: "View Profile", href: "/profile" },
        { icon: GraduationCap, label: "My Courses", href: "/profile/courses", badge: "3 Active" },
        { icon: Receipt, label: "Orders", href: "/profile/orders", badge: "2 Pending" },
        { icon: Bookmark, label: "Saved Items", href: "/profile/saved" },
        { icon: Activity, label: "Activity", href: "/profile/activity" },
        { icon: Users, label: "Friends", href: "/profile/friends", badge: "5 Requests" }
      ]
    },
    {
      group: "Settings",
      items: [
        { icon: Settings, label: "Settings", href: "/settings" },
        { icon: Bell, label: "Notifications", href: "/settings/notifications", badge: "12 New" },
        { icon: Shield, label: "Privacy", href: "/settings/privacy" },
        { icon: Palette, label: "Appearance", href: "/settings/appearance" }
      ]
    }
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST"
      });

      if (!response.ok) throw new Error("Logout failed");

      toast.success("Logged out successfully");
      router.push("/auth");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Avatar className="h-8 w-8">
            <img src={user.avatar} alt={user.name} className="object-cover" />
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center gap-4 p-4">
          <Avatar className="h-16 w-16">
            <img src={user.avatar} alt={user.name} className="object-cover" />
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-semibold">{user.name}</h4>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              {user.role}
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        
        {menuItems.map((group, index) => (
          <div key={group.group}>
            {index > 0 && <DropdownMenuSeparator />}
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs uppercase text-muted-foreground px-2 py-1.5">
                {group.group}
              </DropdownMenuLabel>
              {group.items.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className="flex items-center justify-between px-4 py-2 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </div>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600 focus:text-red-600 px-4 py-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}