"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X } from "lucide-react";
import { ChangeEvent, useRef } from "react";

interface FileInputProps {
  accept?: string;
  multiple?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  uploadedImages: File[];
  onRemove: (index: number) => void;
}

export default function FileUploader({
  accept,
  multiple,
  onChange,
  uploadedImages,

  onRemove,
}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images = uploadedImages.map((image) => URL.createObjectURL(image));

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div>
        <Input
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          ref={fileInputRef}
          onChange={onChange}
        />
        <Button type="button" variant="outline" onClick={handleClick}>
          <Upload className="mr-2 h-4 w-4" /> Upload Images
        </Button>
      </div>
      {uploadedImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {images.map((image, index) => (
            <div key={index} className="group relative">
              <img
                src={image || "/placeholder.svg"}
                alt={`Uploaded image ${index + 1}`}
                className="h-32 w-full rounded object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => onRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
