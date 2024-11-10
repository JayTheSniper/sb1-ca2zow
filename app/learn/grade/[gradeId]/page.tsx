"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { BookOpen, Video, Trophy, Star, Clock, CheckCircle } from "lucide-react";

export default function GradePage({ params }: { params: { gradeId: string } }) {
  const router = useRouter();

  const subjects = [
    {
      id: "math",
      name: "Mathematics",
      progress: 75,
      units: 12,
      completedUnits: 9,
      icon: "📐"
    },
    {
      id: "science",
      name: "Science",
      progress: 60,
      units: 10,
      completedUnits: 6,
      icon: "🔬"
    },
    {
      id: "english",
      name: "English",
      progress: 85,
      units: 8,
      completedUnits: 7,
      icon: "📚"
    },
    {
      id: "history",
      name: "History",
      progress: 45,
      units: 6,
      completedUnits: 3,
      icon: "🌍"
    }
  ];

  const gradeName = params.gradeId === 'k' ? 'Kindergarten' : 
                    `${params.gradeId}${params.gradeId === '3' ? 'rd' : 'th'} Grade`;

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{gradeName}</h1>
              <p className="text-muted-foreground">
                Your personalized learning journey
              </p>
            </div>
            <Button onClick={() => router.push("/learn")}>
              Change Grade
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject) => (
              <Card key={subject.id} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{subject.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{subject.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {subject.completedUnits}/{subject.units} Units
                    </div>
                  </div>
                </div>

                <Progress value={subject.progress} className="mb-4" />

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    className="w-full"
                    onClick={() => router.push(`/learn/grade/${params.gradeId}/${subject.id}`)}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Continue
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Video className="h-4 w-4 mr-2" />
                    Watch
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Progress</h2>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject.id} className="flex items-center gap-4">
                  <div className="text-2xl">{subject.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">{subject.name}</h4>
                      <span className="text-sm text-muted-foreground">
                        {subject.progress}%
                      </span>
                    </div>
                    <Progress value={subject.progress} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { gradeId: 'k' },
    { gradeId: '1' },
    { gradeId: '2' },
    { gradeId: '3' },
    { gradeId: '4' },
    { gradeId: '5' },
    { gradeId: '6' },
    { gradeId: '7' },
    { gradeId: '8' },
    { gradeId: '9' },
    { gradeId: '10' },
    { gradeId: '11' },
    { gradeId: '12' }
  ];
}