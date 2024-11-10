"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EMOJI_CATEGORIES = {
  smileys: ["😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰"],
  gestures: ["👋", "🤚", "🖐", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙"],
  hearts: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❤️‍🔥", "❤️‍🩹", "❣️", "💕", "💞"],
  activities: ["🎮", "🎲", "🎭", "🎨", "🎤", "🎧", "🎸", "🎹", "🎯", "🎳", "🎾", "🏈", "⚽️", "🏀", "🎱"]
};

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmojis = searchQuery
    ? Object.values(EMOJI_CATEGORIES)
        .flat()
        .filter(emoji => emoji.includes(searchQuery))
    : null;

  return (
    <div className="w-64">
      <div className="p-2 border-b">
        <Input
          placeholder="Search emojis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-8"
        />
      </div>

      {searchQuery ? (
        <ScrollArea className="h-[300px] p-2">
          <div className="grid grid-cols-6 gap-1">
            {filteredEmojis?.map((emoji, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => onSelect(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <Tabs defaultValue="smileys">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
            {Object.keys(EMOJI_CATEGORIES).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-3 py-2 h-auto"
              >
                {category === "smileys" && "😀"}
                {category === "gestures" && "👋"}
                {category === "hearts" && "❤️"}
                {category === "activities" && "🎮"}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(EMOJI_CATEGORIES).map(([category, emojis]) => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[300px]">
                <div className="grid grid-cols-6 gap-1 p-2">
                  {emojis.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => onSelect(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
}