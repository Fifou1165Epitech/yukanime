"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createQuote } from "@/lib/actions/quote.action"
import { CreateQuoteData } from "@/types/quote"
import { Plus, Loader2 } from "lucide-react"
import { useSession } from "@/lib/auth-client"
import QuoteImageDropzone from "@/app/components/secondary/QuoteImageDropzone"
import { toast } from "sonner"

export default function DialogCreateQuote() {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { data } = useSession()
  const userId = data?.user?.id

  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateQuoteData>()

  const onSubmit = async (data: CreateQuoteData) => {
    setIsLoading(true)
    
    try {
      const result = await createQuote({
        quote: data.quote,
        character: data.character,
        manga: data.manga,
        image: imageUrl || "default.png",
        episode: data.episode,
        chapter: data.chapter,
        authorId: userId || ""
      })
      
      if (result.success) {
        toast.success("Citation créée avec succès !")
        setOpen(false)
        reset()
        setImageUrl(null)
      } else {
        toast.error(result.error || "Erreur lors de la création")
      }
      
    } catch (error) {
      console.error("Erreur lors de la création :", error)
      toast.error("Erreur inattendue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Créer une citation
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Créer une nouvelle citation</DialogTitle>
            <DialogDescription>
              Ajoutez une nouvelle citation d'anime ou de manga à la base de données.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">

            <div className="grid gap-2">
              <Label htmlFor="quote">Citation *</Label>
              <Textarea
                id="quote"
                placeholder="Saisissez la citation..."
                {...register("quote", { 
                  required: "La citation est obligatoire",
                  minLength: { value: 10, message: "Minimum 10 caractères" }
                })}
                className="min-h-[80px]"
              />
              {errors.quote && (
                <p className="text-sm text-destructive">{errors.quote.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="character">Personnage *</Label>
              <Input
                id="character"
                placeholder="Ex: Naruto Uzumaki"
                {...register("character", { 
                  required: "Le personnage est obligatoire" 
                })}
              />
              {errors.character && (
                <p className="text-sm text-destructive">{errors.character.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="manga">Manga/Anime *</Label>
              <Input
                id="manga"
                placeholder="Ex: Naruto"
                {...register("manga", { 
                  required: "Le manga/anime est obligatoire" 
                })}
              />
              {errors.manga && (
                <p className="text-sm text-destructive">{errors.manga.message}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Image de la citation (optionnel)</Label>
              <QuoteImageDropzone 
                onImageChange={setImageUrl}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="chapter">Chapitre</Label>
                <Input
                  id="chapter"
                  placeholder="Ex: 700"
                  {...register("chapter")}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="episode">Episode</Label>
                <Input
                  id="episode"
                  placeholder="Ex: 220"
                  {...register("episode")}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Annuler
              </Button>
            </DialogClose>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer la citation"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}