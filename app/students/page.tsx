"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { MessageButton } from "@/components/message-button";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { 
  Search,
  MapPin,
  GraduationCap,
  Star,
  Filter,
  Globe,
  Users,
  QrCode,
  Clock,
  Hash
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function StudentsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [showQR, setShowQR] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  const [students] = useState([
    {
      id: 1,
      username: "sarah-wilson",
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      school: "Tech Academy",
      grade: "10th Grade",
      country: "United States",
      location: "New York",
      rating: 4.8,
      reviews: 48,
      online: true,
      lastActive: "2 minutes ago",
      subjects: ["Mathematics", "Physics", "Computer Science"],
      achievements: ["Math Competition Winner", "Science Fair Gold"],
      joinedDate: "Sep 2023"
    },
    {
      id: 2,
      username: "mike-johnson",
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      school: "Science High",
      grade: "11th Grade",
      country: "Canada",
      location: "Toronto",
      rating: 4.7,
      reviews: 32,
      online: false,
      lastActive: "5 minutes ago",
      subjects: ["Biology", "Chemistry", "Mathematics"],
      achievements: ["Biology Olympiad Silver", "Research Award"],
      joinedDate: "Aug 2023"
    }
  ]);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate real-time search
    setTimeout(() => {
      setIsSearching(false);
      toast.success("Search results updated");
    }, 500);
  };

  const generateQRCode = (student: any) => {
    setSelectedStudent(student);
    setShowQR(true);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.subjects.some(subject => 
        subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesCountry = selectedCountry === "all" || 
      student.country.toLowerCase().includes(selectedCountry.toLowerCase());

    return matchesSearch && matchesCountry;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Students</h1>
            <p className="text-muted-foreground">
              Connect with students worldwide
            </p>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, school, subjects, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
              {isSearching && (
                <div className="absolute right-3 top-2.5">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="h-5 w-5 text-primary" />
                  </motion.div>
                </div>
              )}
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-[200px]">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 relative">
                  <div className="absolute top-4 right-4 text-sm text-muted-foreground">
                    <Hash className="h-4 w-4 inline-block mr-1" />
                    {String(student.id).padStart(3, '0')}
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <img src={student.avatar} alt={student.name} className="object-cover" />
                      </Avatar>
                      {student.online && (
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        {student.school}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {student.location}, {student.country}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{student.rating}</span>
                        <span className="text-muted-foreground ml-1">
                          ({student.reviews} reviews)
                        </span>
                      </div>
                      <span className="text-muted-foreground">{student.grade}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {student.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 inline-block mr-1" />
                      {student.online ? "Online now" : `Last active ${student.lastActive}`}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => router.push(`/profile/${student.username}`)}
                    >
                      View Profile
                    </Button>
                    <MessageButton
                      recipientId={student.id}
                      recipientName={student.name}
                      recipientAvatar={student.avatar}
                      variant="outline"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => generateQRCode(student)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profile QR Code</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="text-center space-y-4">
              <div className="bg-white p-8 rounded-lg inline-block">
                <QrCode className="h-48 w-48" />
              </div>
              <div>
                <h3 className="font-semibold">{selectedStudent.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Scan to view profile
                </p>
              </div>
              <Button 
                onClick={() => {
                  // In a real app, implement download functionality
                  toast.success("QR Code downloaded");
                }}
              >
                Download QR Code
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}