'use server'

import { put } from '@vercel/blob'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import type { CreateQuoteData } from "@/types/quote"
import sharp from 'sharp'

export async function createQuote({
    quote,
    character,
    manga,
    image,
    episode,
    chapter,
    authorId
}: CreateQuoteData) {
    try {
        const quoteCreated = await prisma.quote.create({
            data: {
                quote: String(quote),
                character: String(character),
                manga: String(manga),
                image: String(image),
                episode: episode ? String(episode) : null,
                chapter: chapter ? String(chapter) : null,
                authorId: String(authorId)
            }
        })
        
        revalidatePath('/admin')
        revalidatePath('/quotes')
        
        return { success: true, data: quoteCreated }
        
    } catch (error) {
        console.error("Erreur création quote:", error)
        return { success: false, error: "Erreur lors de la création" }
    }
}


export async function uploadQuoteImage(formData: FormData) {
    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user?.id) {
            return { success: false, error: 'Non authentifié' }
        }

        const file = formData.get('file') as File
        
        if (!file) {
            return { success: false, error: 'Aucun fichier fourni' }
        }
        if (!file.type.startsWith('image/')) {
            return { success: false, error: 'Le fichier doit être une image' }
        }

        if (file.size > 10 * 1024 * 1024) {
            return { success: false, error: 'Fichier trop volumineux (max 10MB)' }
        }

        // ✅ Convertir File en Buffer
        const buffer = Buffer.from(await file.arrayBuffer())
        
        // ✅ Obtenir les dimensions
        const { width, height } = await sharp(buffer).metadata()
        const size = Math.min(width!, height!)
        
        // ✅ Redimensionner en carré avec Sharp
        const resizedBuffer = await sharp(buffer)
        .resize(size, size, {
            fit: 'cover', // ✅ Équivalent d'object-cover
            position: 'center'
        })
        .jpeg({ quality: 90 })
        .toBuffer()

        const extension = file.name.split('.').pop()
        const blob = await put(`quotes/quote.${extension}`, resizedBuffer, {
            access: 'public',
            addRandomSuffix: true,
        })

        revalidatePath('/admin')
        revalidatePath('/quotes')

        return { 
            success: true, 
            url: blob.url,
            message: 'Image uploadée avec succès'
        }

    } catch (error) {
        console.error('Erreur upload quote image:', error)
        return { 
            success: false, 
            error: 'Erreur lors de l\'upload' 
        }
    }
}