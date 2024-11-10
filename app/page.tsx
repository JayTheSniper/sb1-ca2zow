import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { Building2, User, GraduationCap, Gamepad2, Video } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      icon: GraduationCap,
      title: "Education Hub",
      description: "Connect with schools, explore courses, and advance your learning journey",
      href: "/education"
    },
    {
      icon: Gamepad2,
      title: "Educational Games",
      description: "Learn through interactive games designed for all age groups",
      href: "/games"
    },
    {
      icon: Video,
      title: "Video Learning",
      description: "Access educational videos from expert instructors worldwide",
      href: "/videos"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="container flex flex-col lg:flex-row items-center gap-12 py-16 lg:py-24">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="flex justify-center lg:justify-start">
            <Logo size="xlarge" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold">
            Welcome to <span className="text-primary">Schoolsat</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Your all-in-one platform for education, connecting schools, students, and communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/auth">
              <Button size="lg" className="text-lg w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/home">
              <Button size="lg" variant="outline" className="text-lg w-full sm:w-auto">
                Explore Platform
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-center">Create Account</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Link href="/auth?type=personal">
                <Button
                  variant="outline"
                  className="h-auto py-6 px-4 flex flex-col items-center gap-2 w-full"
                >
                  <User className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold">Personal</div>
                    <div className="text-xs text-muted-foreground">
                      For students and individuals
                    </div>
                  </div>
                </Button>
              </Link>

              <Link href="/auth?type=institution">
                <Button
                  variant="outline"
                  className="h-auto py-6 px-4 flex flex-col items-center gap-2 w-full"
                >
                  <Building2 className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-semibold">Institution</div>
                    <div className="text-xs text-muted-foreground">
                      For schools and organizations
                    </div>
                  </div>
                </Button>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Link href="/auth">
              <Button variant="outline" className="w-full">
                Already have an account? Log In
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-background py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Schoolsat?</h2>
            <p className="text-muted-foreground">
              Everything you need for a complete educational experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="p-6 h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}