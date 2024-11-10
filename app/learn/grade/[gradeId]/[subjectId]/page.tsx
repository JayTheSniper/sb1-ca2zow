"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Video, 
  Trophy,
  CheckCircle,
  Clock,
  FileText,
  Play,
  ArrowLeft
} from "lucide-react";

export default function SubjectPage({ 
  params 
}: { 
  params: { gradeId: string; subjectId: string } 
}) {
  const router = useRouter();
  const [activeUnit, setActiveUnit] = useState(1);

  const units = [
    {
      id: 1,
      title: "Introduction",
      lessons: [
        {
          id: 1,
          title: "Basic Concepts",
          type: "video",
          duration: "15 min",
          completed: true
        },
        {
          id: 2,
          title: "Key Terms",
          type: "reading",
          duration: "10 min",
          completed: true
        },
        {
          id: 3,
          title: "Practice Quiz",
          type: "quiz",
          duration: "20 min",
          completed: false
        }
      ],
      progress: 66
    },
    {
      id: 2,
      title: "Core Concepts",
      lessons: [
        {
          id: 4,
          title: "Advanced Topics",
          type: "video",
          duration: "20 min",
          completed: false
        },
        {
          id: 5,
          title: "Case Studies",
          type: "reading",
          duration: "15 min",
          completed: false
        }
      ],
      progress: 0
    }
  ];

  const gradeName = params.gradeId === 'k' ? 'Kindergarten' : 
                    `${params.gradeId}${params.gradeId === '3' ? 'rd' : 'th'} Grade`;
  const subjectName = params.subjectId.charAt(0).toUpperCase() + params.subjectId.slice(1);

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost"
                onClick={() => router.push(`/learn/grade/${params.gradeId}`)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{subjectName}</h1>
                <p className="text-muted-foreground">{gradeName}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
                <Progress value={45} className="mb-2" />
                <p className="text-sm text-muted-foreground">
                  45% Complete • 3/8 Units
                </p>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Units</h2>
                <div className="space-y-4">
                  {units.map((unit) => (
                    <div
                      key={unit.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        activeUnit === unit.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                      onClick={() => setActiveUnit(unit.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Unit {unit.id}: {unit.title}</h3>
                        <span className="text-sm">
                          {unit.progress}%
                        </span>
                      </div>
                      <Progress 
                        value={unit.progress}
                        className={activeUnit === unit.id ? "bg-primary-foreground/20" : ""}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Unit {activeUnit}: {units[activeUnit - 1].title}
                </h2>
                <div className="space-y-4">
                  {units[activeUnit - 1].lessons.map((lesson) => (
                    <Card key={lesson.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-muted rounded-lg">
                            {lesson.type === 'video' && <Video className="h-5 w-5" />}
                            {lesson.type === 'reading' && <FileText className="h-5 w-5" />}
                            {lesson.type === 'quiz' && <Trophy className="h-5 w-5" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{lesson.title}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="h-4 w-4 mr-1" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <Button>
                            <Play className="h-4 w-4 mr-2" />
                            Start
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  const grades = ['k', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const subjects = ['math', 'science', 'english', 'history'];
  
  return grades.flatMap(gradeId =>
    subjects.map(subjectId => ({
      gradeId,
      subjectId
    }))
  );
}