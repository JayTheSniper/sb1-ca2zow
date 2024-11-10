import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface VideoSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function VideoSearch({ value, onChange }: VideoSearchProps) {
  return (
    <div className="relative">
      <Input
        placeholder="Search videos..."
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
    </div>
  );
}