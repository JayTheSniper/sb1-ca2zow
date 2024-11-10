import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="p-6 text-center max-w-md">
        <UserX className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h1 className="text-2xl font-bold mb-2">Profile Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The profile you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/students">
          <Button>
            Browse Students
          </Button>
        </Link>
      </Card>
    </div>
  );
}