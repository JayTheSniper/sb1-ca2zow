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
  Star, 
  Clock,
  CheckCircle,
  FileText,
  BrainCircuit,
  Beaker,
  Globe2,
  Calculator,
  Palette,
  Music2
} from "lucide-react";

const subjects = {
  american: [
    { id: "math", name: "Mathematics", icon: Calculator, progress: 75 },
    { id: "science", name: "Science", icon: Beaker, progress: 60 },
    { id: "english", name: "English Language Arts", icon: BookOpen, progress: 85 },
    { id: "social", name: "Social Studies", icon: Globe2, progress: 45 },
    { id: "art", name: "Art", icon: Palette, progress: 30 },
    { id: "music", name: "Music", icon: Music2, progress: 20 }
  ],
  canadian: [
    { id: "math", name: "Mathematics", icon: Calculator, progress: 70 },
    { id: "science", name: "Science", icon: Beaker, progress: 55 },
    { id: "english", name: "English", icon: BookOpen, progress: 80 },
    { id: "social", name: "Social Studies", icon: Globe2, progress: 40 },
    { id: "french", name: "French", icon: BookOpen, progress: 35 },
    { id: "art", name: "Arts Education", icon: Palette, progress: 25 }
  ],
  ig: [
    { id: "math", name: "Mathematics", icon: Calculator, progress: 65 },
    { id: "science", name: "Combined Science", icon: Beaker, progress: 50 },
    { id: "english", name: "English", icon: BookOpen, progress: 75 },
    { id: "geography", name: "Geography", icon: Globe2, progress: 40 },
    { id: "ict", name: "ICT", icon: BrainCircuit, progress: 60 },
    { id: "art", name: "Art & Design", icon: Palette, progress: 30 }
  ]
};

export default function GradePage({ 
  params 
}: { 
  params: { curriculum: 'american' | 'canadian' | 'ig'; gradeId: string } 
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  const gradeName = params.gradeId === 'k' ? 'Kindergarten' : 
                    params.curriculum === 'ig' ? params.gradeId :
                    `${params.gradeId}${params.gradeId === '3' ? 'rd' : 'th'} Grade`;

  const currentSubjects = subjects[params.curriculum];

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container py-6">
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Button 
                variant="ghost" 
                className="p-0 h-auto"
                onClick={() => router.push("/learn")}
              >
                Learning Portal
              </Button>
              <span>/</span>
              <span>{gradeName}</span>
            </div>
            <h1 className="text-3xl font-bold">{gradeName}</h1>
            <p className="text-muted-foreground">
              Your personalized learning journey
            </p>
          </div>

          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <Trophy className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Overall Progress</h3>
                      <p className="text-2xl font-bold">65%</p>
                    </div>
                  </div>
                  <Progress value={65} className="mt-4" />
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <Clock className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Study Time</h3>
                      <p className="text-2xl font-bold">24h 30m</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-4">
                    <Star className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Achievements</h3>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {currentSubjects.slice(0, 3).map((subject) => (
                    <div key={subject.id} className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <subject.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{subject.name}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          Last studied 2 hours ago
                        </div>
                      </div>
                      <Progress value={subject.progress} className="w-24" />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSubjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => router.push(
                      `/learn/${params.curriculum}/grade/${params.gradeId}/${subject.id}`
                    )}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <subject.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{subject.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {subject.progress}% Complete
                        </p>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="mb-4" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>12 Units</span>
                      <span>48 Lessons</span>
                      <span>24 Quizzes</span>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="progress">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Progress Overview</h2>
                <div className="space-y-6">
                  {currentSubjects.map((subject) => (
                    <div key={subject.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <subject.icon className="h-5 w-5" />
                          <h3 className="font-medium">{subject.name}</h3>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {subject.progress}%
                        </span>
                      </div>
                      <Progress value={subject.progress} />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6">
                  <Video className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Video Lessons</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Watch expert-led video tutorials
                  </p>
                  <Button className="w-full">Access Videos</Button>
                </Card>

                <Card className="p-6">
                  <FileText className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Study Materials</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download worksheets and notes
                  </p>
                  <Button className="w-full">View Materials</Button>
                </Card>

                <Card className="p-6">
                  <Trophy className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Practice Tests</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Test your knowledge
                  </p>
                  <Button className="w-full">Start Practice</Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { curriculum: 'american', gradeId: 'k' },
    { curriculum: 'american', gradeId: '1' },
    { curriculum: 'american', gradeId: '2' },
    { curriculum: 'american', gradeId: '3' },
    { curriculum: 'american', gradeId: '4' },
    { curriculum: 'american', gradeId: '5' },
    { curriculum: 'american', gradeId: '6' },
    { curriculum: 'american', gradeId: '7' },
    { curriculum: 'american', gradeId: '8' },
    { curriculum: 'american', gradeId: '9' },
    { curriculum: 'american', gradeId: '10' },
    { curriculum: 'american', gradeId: '11' },
    { curriculum: 'american', gradeId: '12' },
    { curriculum: 'canadian', gradeId: 'k' },
    { curriculum: 'canadian', gradeId: '1' },
    { curriculum: 'canadian', gradeId: '2' },
    { curriculum: 'canadian', gradeId: '3' },
    { curriculum: 'canadian', gradeId: '4' },
    { curriculum: 'canadian', gradeId: '5' },
    { curriculum: 'canadian', gradeId: '6' },
    { curriculum: 'canadian', gradeId: '7' },
    { curriculum: 'canadian', gradeId: '8' },
    { curriculum: 'canadian', gradeId: '9' },
    { curriculum: 'canadian', gradeId: '10' },
    { curriculum: 'canadian', gradeId: '11' },
    { curriculum: 'canadian', gradeId: '12' },
    { curriculum: 'ig', gradeId: 'primary1' },
    { curriculum: 'ig', gradeId: 'primary2' },
    { curriculum: 'ig', gradeId: 'primary3' },
    { curriculum: 'ig', gradeId: 'primary4' },
    { curriculum: 'ig', gradeId: 'primary5' },
    { curriculum: 'ig', gradeId: 'primary6' },
    { curriculum: 'ig', gradeId: 'lower1' },
    { curriculum: 'ig', gradeId: 'lower2' },
    { curriculum: 'ig', gradeId: 'lower3' },
    { curriculum: 'ig', gradeId: 'igcse1' },
    { curriculum: 'ig', gradeId: 'igcse2' }
  ];
}