"use client";

import { cn } from "@/lib/utils";
import { Camera, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import Dropzone from "react-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateAvatar } from "@/lib/actions/user.action";
import { toast } from "sonner";

interface AvatarDropzoneProps {
  currentImage?: string | null;
  fallback?: string;
}

export default function AvatarDropzone({ currentImage, fallback = "U" }: AvatarDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    startTransition(async () => {
      const formData = new FormData();
      formData.append('avatar', file);

      const result = await updateAvatar(formData);

      if (result.success) {
        toast.success(result.message);
        setPreview(null);
      } else {
        toast.error(result.error);
        setPreview(null); 
      }
    });
  };

  const displayImage = preview || currentImage;

  return (
    <div className="relative">
      <Dropzone
        onDrop={handleDrop}
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
        maxFiles={1}
        disabled={isPending}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div {...getRootProps()} className="cursor-pointer group">
            <input {...getInputProps()} />
            
            <Avatar className="size-20 relative rounded">
              {displayImage ? (
                <AvatarImage src={displayImage} className="object-cover" />
              ) : (
                <AvatarFallback>{fallback}</AvatarFallback>
              )}
              
              <div className={cn(
                "absolute inset-0 bg-black/50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                isDragActive && "opacity-100 bg-blue-500/50",
                isPending && "opacity-100"
              )}>
                {isPending ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <Camera className="w-6 h-6 text-white" />
                )}
              </div>
            </Avatar>
          </div>
        )}
      </Dropzone>
    </div>
  );
}