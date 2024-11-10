"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Clock, DollarSign, Users, BookOpen, Trophy } from "lucide-react";
import { CourseFilters } from "@/components/course-filters";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();
  const courses = [
    {
      id: 1,
      name: "Advanced Web Development",
      provider: "Tech Academy",
      duration: "16 weeks",
      price: "$1,999",
      rating: 4.9,
      students: 3240,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
      description: "Master modern web development with React, Node.js, and cloud technologies.",
      features: ["Live Projects", "Career Support", "Industry Certification"],
      level: "Advanced"
    },
    {
      id: 2,
      name: "Digital Marketing Mastery",
      provider: "Marketing Institute",
      duration: "12 weeks",
      price: "$1,499",
      rating: 4.8,
      students: 2180,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
      description: "Comprehensive digital marketing course covering SEO, SEM, and social media.",
      features: ["Real Campaigns", "Industry Tools", "Portfolio Building"],
      level: "Intermediate"
    },
    {
      id: 3,
      name: "Data Science Fundamentals",
      provider: "Analytics Academy",
      duration: "20 weeks",
      price: "$2,499",
      rating: 4.9,
      students: 1850,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
      description: "Learn data analysis, machine learning, and statistical modeling.",
      features: ["Python Programming", "ML Projects", "Job Placement"],
      level: "Beginner to Intermediate"
    },
  ];

  const handleEnroll = (courseId: number) => {
    router.push(`/checkout/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-muted-foreground">
              Explore professional courses and advance your career
            </p>
          </div>

          <CourseFilters />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.image})` }}
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{course.name}</h3>
                      <p className="text-sm text-muted-foreground">{course.provider}</p>
                    </div>
                    <div className="flex items-center bg-primary/10 text-primary rounded-full px-2 py-1">
                      <Star className="h-4 w-4 mr-1 fill-primary" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm mb-4">{course.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students} enrolled
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold text-lg">{course.price}</span>
                    </div>
                    <Button onClick={() => handleEnroll(course.id)}>
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}