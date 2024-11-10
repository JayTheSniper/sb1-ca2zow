"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { GraduationCap, BookOpen, Trophy, Star, Globe } from "lucide-react";

export function LearnContent() {
  const router = useRouter();
  const [curriculum, setCurriculum] = useState<'american' | 'canadian' | 'ig'>('american');

  const curriculumInfo = {
    american: {
      name: "American Curriculum",
      description: "Based on Common Core State Standards",
      icon: "🇺🇸"
    },
    canadian: {
      name: "Canadian Curriculum",
      description: "Following Provincial Standards",
      icon: "🇨🇦"
    },
    ig: {
      name: "International GCSE",
      description: "Cambridge International Education",
      icon: "🌍"
    }
  };

  const grades = {
    american: [
      { id: "k", name: "Kindergarten", icon: "🎨", progress: 0 },
      { id: "1", name: "1st Grade", icon: "1️⃣", progress: 65 },
      { id: "2", name: "2nd Grade", icon: "2️⃣", progress: 45 },
      { id: "3", name: "3rd Grade", icon: "3️⃣", progress: 30 },
      { id: "4", name: "4th Grade", icon: "4️⃣", progress: 0 },
      { id: "5", name: "5th Grade", icon: "5️⃣", progress: 0 },
      { id: "6", name: "6th Grade", icon: "6️⃣", progress: 0 },
      { id: "7", name: "7th Grade", icon: "7️⃣", progress: 0 },
      { id: "8", name: "8th Grade", icon: "8️⃣", progress: 0 },
      { id: "9", name: "9th Grade", icon: "9️⃣", progress: 0 },
      { id: "10", name: "10th Grade", icon: "🔟", progress: 0 },
      { id: "11", name: "11th Grade", icon: "1️⃣1️⃣", progress: 0 },
      { id: "12", name: "12th Grade", icon: "1️⃣2️⃣", progress: 0 }
    ],
    canadian: [
      { id: "k", name: "Kindergarten", icon: "🎨", progress: 0 },
      { id: "1", name: "Grade 1", icon: "1️⃣", progress: 0 },
      { id: "2", name: "Grade 2", icon: "2️⃣", progress: 0 },
      { id: "3", name: "Grade 3", icon: "3️⃣", progress: 0 },
      { id: "4", name: "Grade 4", icon: "4️⃣", progress: 0 },
      { id: "5", name: "Grade 5", icon: "5️⃣", progress: 0 },
      { id: "6", name: "Grade 6", icon: "6️⃣", progress: 0 },
      { id: "7", name: "Grade 7", icon: "7️⃣", progress: 0 },
      { id: "8", name: "Grade 8", icon: "8️⃣", progress: 0 },
      { id: "9", name: "Grade 9", icon: "9️⃣", progress: 0 },
      { id: "10", name: "Grade 10", icon: "🔟", progress: 0 },
      { id: "11", name: "Grade 11", icon: "1️⃣1️⃣", progress: 0 },
      { id: "12", name: "Grade 12", icon: "1️⃣2️⃣", progress: 0 }
    ],
    ig: [
      { id: "primary1", name: "Primary 1", icon: "1️⃣", progress: 0 },
      { id: "primary2", name: "Primary 2", icon: "2️⃣", progress: 0 },
      { id: "primary3", name: "Primary 3", icon: "3️⃣", progress: 0 },
      { id: "primary4", name: "Primary 4", icon: "4️⃣", progress: 0 },
      { id: "primary5", name: "Primary 5", icon: "5️⃣", progress: 0 },
      { id: "primary6", name: "Primary 6", icon: "6️⃣", progress: 0 },
      { id: "lower1", name: "Lower Secondary 1", icon: "7️⃣", progress: 0 },
      { id: "lower2", name: "Lower Secondary 2", icon: "8️⃣", progress: 0 },
      { id: "lower3", name: "Lower Secondary 3", icon: "9️⃣", progress: 0 },
      { id: "igcse1", name: "IGCSE Year 1", icon: "🔟", progress: 0 },
      { id: "igcse2", name: "IGCSE Year 2", icon: "1️⃣1️⃣", progress: 0 }
    ]
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">School Learning Portal</h1>
            <p className="text-muted-foreground">
              Access complete curriculum, lessons, and resources
            </p>
          </div>

          <Tabs defaultValue="american" onValueChange={(v) => setCurriculum(v as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="american">
                <span className="mr-2">🇺🇸</span>
                American
              </TabsTrigger>
              <TabsTrigger value="canadian">
                <span className="mr-2">🇨🇦</span>
                Canadian
              </TabsTrigger>
              <TabsTrigger value="ig">
                <span className="mr-2">🌍</span>
                International GCSE
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <Card className="p-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{curriculumInfo[curriculum].icon}</div>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {curriculumInfo[curriculum].name}
                    </h2>
                    <p className="text-muted-foreground">
                      {curriculumInfo[curriculum].description}
                    </p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {grades[curriculum].map((grade) => (
                  <Card
                    key={grade.id}
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden"
                    onClick={() => router.push(`/learn/${curriculum}/grade/${grade.id}`)}
                  >
                    {grade.progress > 0 && (
                      <div 
                        className="absolute inset-0 bg-primary/10"
                        style={{ width: `${grade.progress}%` }}
                      />
                    )}
                    <div className="relative flex items-center gap-4">
                      <div className="text-4xl">{grade.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold">{grade.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {grade.progress > 0 ? (
                            <span>{grade.progress}% Complete</span>
                          ) : (
                            <span>Start Learning</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}