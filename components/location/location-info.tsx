"use client";

interface LocationInfoProps {
  name: string;
  description?: string;
  lastActive?: string;
}

export function LocationInfo({ name, description, lastActive }: LocationInfoProps) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{name}</h3>
        {lastActive && (
          <span className="text-xs text-muted-foreground">
            {lastActive}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}