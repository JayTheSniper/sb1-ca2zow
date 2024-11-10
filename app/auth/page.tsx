"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Successfully logged in!");
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="flex flex-col items-center space-y-2">
          <Logo />
          <h1 className="text-2xl font-bold">Welcome to Schoolsat</h1>
          <p className="text-muted-foreground text-center">
            Connect with schools and share your learning experience
          </p>
        </div>

        <Card className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="First name"
                    required
                    disabled={isLoading}
                  />
                  <Input
                    placeholder="Last name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  disabled={isLoading}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  required
                  disabled={isLoading}
                />
                <Input
                  type="password"
                  placeholder="Confirm password"
                  required
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          By continuing, you agree to Schoolsat's{" "}
          <a href="#" className="underline hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-primary">
            Privacy Policy
          </a>
          .
        </div>
      </motion.div>
    </div>
  );
}