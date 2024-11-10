"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Upload, DollarSign, Tag, Package } from "lucide-react";
import { toast } from "sonner";

export default function CreateProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Product created successfully!");
      router.push("/shop");
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12">
      <div className="container max-w-2xl">
        <Card className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create New Product</h1>
            <p className="text-muted-foreground">List your educational product or service</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title</Label>
              <Input id="title" required placeholder="e.g., Advanced Math Textbook" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="textbooks">Textbooks</SelectItem>
                  <SelectItem value="supplies">School Supplies</SelectItem>
                  <SelectItem value="equipment">Educational Equipment</SelectItem>
                  <SelectItem value="digital">Digital Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                placeholder="Describe your product..."
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    required
                    placeholder="0.00"
                    className="pl-10"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="relative">
                  <Package className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="quantity"
                    type="number"
                    required
                    placeholder="0"
                    className="pl-10"
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Product Images</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="images"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Upload Images
                    </span>
                  </label>
                </div>
                {images.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <img
                      src={url}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas"
                  className="pl-10"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}