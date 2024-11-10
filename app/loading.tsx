import { LoadingLogo } from "@/components/loading-logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingLogo />
    </div>
  );
}