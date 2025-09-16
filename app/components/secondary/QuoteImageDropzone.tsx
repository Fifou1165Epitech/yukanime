"use client";

import { cn } from "@/lib/utils";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useState, useTransition } from "react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";
import Image from "next/image";
import { uploadQuoteImage } from "@/lib/actions/quote.action";

interface QuoteImageDropzoneProps {
  currentImage?: string | null;
  onImageChange?: (imageUrl: string | null) => void;
  className?: string;
}

export default function QuoteImageDropzone({ 
  currentImage, 
  onImageChange,
  className 
}: QuoteImageDropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDrop = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    // ✅ Preview immédiat
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // ✅ Upload via server action (même pattern que updateAvatar)
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadQuoteImage(formData);

        if (result.success) {
          toast.success(result.message);
          onImageChange?.(result.url || null);
        } else {
          throw new Error(result.error || 'Erreur upload');
        }
      } catch (error) {
        console.error('Erreur upload:', error);
        toast.error("Erreur lors de l'upload");
        setPreview(null);
      }
    });
  };

  const handleRemove = () => {
    setPreview(null);
    onImageChange?.(null);
  };

  const displayImage = preview || currentImage;

  return (
    <div className={cn("relative w-full", className)}>
      <Dropzone
        onDrop={handleDrop}
        accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
        maxFiles={1}
        disabled={isPending}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div {...getRootProps()} className="cursor-pointer group">
            <input {...getInputProps()} />
            
            {displayImage ? (
              <div className="relative aspect-video w-full max-w-sm mx-auto">
                <Image
                  src={displayImage}
                  alt="Quote image"
                  fill
                  className="object-cover rounded-lg border"
                />
                
                <div className={cn(
                  "absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                  isDragActive && "opacity-100 bg-blue-500/50",
                  isPending && "opacity-100"
                )}>
                  {isPending ? (
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    <ImagePlus className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
            ) : (
              <div className={cn(
                "border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors",
                "aspect-video w-full max-w-sm mx-auto flex flex-col items-center justify-center gap-3",
                isDragActive && "border-primary bg-primary/5"
              )}>
                {isPending ? (
                  <Loader2 className="w-8 h-8 text-muted-foreground animate-spin" />
                ) : (
                  <>
                    <ImagePlus className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {isDragActive ? "Déposez l'image" : "Ajouter une image"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, WebP jusqu'à 10MB
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {displayImage && !isPending && (
        <button
          onClick={handleRemove}
          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow-sm hover:bg-destructive/90"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}