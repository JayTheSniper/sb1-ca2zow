import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";

export function VideoHeader() {
  const router = useRouter();
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Videos</h1>
        <p className="text-muted-foreground">
          Learn through engaging video content
        </p>
      </div>
      <Button onClick={() => router.push("/videos/upload")}>
        <Video className="h-4 w-4 mr-2" />
        Upload Video
      </Button>
    </div>
  );
}