import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMessages } from "@/lib/messages";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MessageButtonProps {
  recipientId: string | number;
  recipientName: string;
  recipientAvatar: string;
  variant?: "default" | "outline" | "secondary";
  className?: string;
}

export function MessageButton({ 
  recipientId, 
  recipientName, 
  recipientAvatar,
  variant = "default",
  className
}: MessageButtonProps) {
  const router = useRouter();
  const { createChat } = useMessages();
  const [isLoading, setIsLoading] = useState(false);

  const handleMessage = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const chatId = await createChat({
        id: Number(recipientId),
        name: recipientName,
        avatar: recipientAvatar
      });
      
      router.push(`/messages/${chatId}`);
    } catch (error) {
      console.error("Message error:", error);
      toast.error("Failed to start conversation. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant={variant}
      className={cn("flex items-center gap-2", className)}
      onClick={handleMessage}
      disabled={isLoading}
    >
      <MessageCircle className="h-4 w-4" />
      {isLoading ? "Starting chat..." : "Message"}
    </Button>
  );
}