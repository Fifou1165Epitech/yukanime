'use server'

import { put } from '@vercel/blob'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateAvatar(formData: FormData) {
    try {

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user?.id) {
            return { success: false, error: 'Non authentifié' }
        }

        const file = formData.get('avatar') as File
        
        if (!file) {
            return { success: false, error: 'Aucun fichier fourni' }
        }

        if (!file.type.startsWith('image/')) {
            return { success: false, error: 'Le fichier doit être une image' }
        }

        if (file.size > 5 * 1024 * 1024) {
            return { success: false, error: 'Fichier trop volumineux (max 5MB)' }
        }


        const blob = await put(`avatars/${session.user.id}.${file.name.split('.').pop()}`, file, {
            access: 'public',
            allowOverwrite: true,
        })


        await prisma.user.update({
            where: { id: session.user.id },
            data: { image: blob.url }
        })

        revalidatePath('/account')
        revalidatePath('/admin')

        return { 
            success: true, 
            url: blob.url,
            message: 'Avatar mis à jour avec succès'
        }

    } catch (error) {
        console.error('Erreur update avatar:', error)
        return { 
            success: false, 
            error: 'Erreur lors de la mise à jour' 
        }
    }
}