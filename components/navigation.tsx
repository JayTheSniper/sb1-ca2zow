"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Notifications } from "@/components/notifications";
import { ProfileDropdown } from "@/components/profile-dropdown";
import { NotificationBadge } from "@/components/notification-badge";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { RealtimeDB } from "@/lib/realtime-db";
import {
  Home,
  GraduationCap,
  Video,
  ShoppingBag,
  MessageCircle,
  Search,
  Users,
  Star
} from "lucide-react";
import Link from "next/link";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user) return;

    // Subscribe to unread message count
    const unsubMessages = RealtimeDB.subscribeToUnreadMessages(
      user.uid,
      setUnreadMessages
    );

    // Subscribe to unread notification count
    const unsubNotifications = RealtimeDB.subscribeToNotifications(
      user.uid,
      setUnreadNotifications
    );

    return () => {
      unsubMessages();
      unsubNotifications();
    };
  }, [user]);

  if (!mounted) {
    return null;
  }

  const navItems = [
    { icon: Home, href: "/home", label: "Home" },
    { icon: Users, href: "/students", label: "Students" },
    { icon: Star, href: "/reviews", label: "Reviews" },
    { icon: Video, href: "/videos", label: "Videos" },
    { icon: ShoppingBag, href: "/shop", label: "Shop" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="flex items-center">
            <Logo size="small" />
          </Link>

          <div className="relative hidden md:flex flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Schoolsat"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <nav className="flex items-center gap-1 mx-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                size="icon"
                className="relative group"
              >
                <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="sr-only">{item.label}</span>
                <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/messages">
            <Button 
              variant={pathname === '/messages' ? "secondary" : "ghost"} 
              size="icon" 
              className="relative"
            >
              <MessageCircle className="h-5 w-5" />
              {unreadMessages > 0 && (
                <NotificationBadge count={unreadMessages} />
              )}
            </Button>
          </Link>
          <Notifications count={unreadNotifications} />
          <ProfileDropdown user={{
            name: "John Doe",
            email: "john.doe@example.com",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800",
            role: "Student"
          }} />
        </div>
      </div>

      <div className="md:hidden border-t">
        <div className="container py-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Schoolsat"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </header>
  );
}