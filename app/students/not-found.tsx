import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">Could not find requested resource</p>
        <Link href="/students">
          <Button>Return to Students</Button>
        </Link>
      </div>
    </div>
  );
}