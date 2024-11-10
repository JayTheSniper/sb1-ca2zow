"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export function ProfileSettings() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Appearance</h3>
      <RadioGroup
        value={theme}
        onValueChange={setTheme}
        className="grid grid-cols-3 gap-4"
      >
        {themes.map(({ value, label, icon: Icon }) => (
          <Label
            key={value}
            className="cursor-pointer"
            htmlFor={`theme-${value}`}
          >
            <RadioGroupItem
              value={value}
              id={`theme-${value}`}
              className="sr-only"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-lg border-2 transition-colors ${
                theme === value
                  ? "border-primary bg-primary/10"
                  : "border-transparent bg-muted hover:border-primary/20"
              }`}
            >
              <Icon className={`h-6 w-6 mb-2 ${
                theme === value ? "text-primary" : ""
              }`} />
              <p className="font-medium">{label}</p>
              <p className="text-sm text-muted-foreground">
                {value === 'light' && "Always use light mode"}
                {value === 'dark' && "Always use dark mode"}
                {value === 'system' && "Sync with system theme"}
              </p>
            </motion.div>
          </Label>
        ))}
      </RadioGroup>
    </Card>
  );
}