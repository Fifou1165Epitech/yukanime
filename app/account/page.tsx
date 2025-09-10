"use client"

import { signOut, deleteUser } from "@/lib/auth-client"
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function AccountPage() {
    
    const handleDisconnect = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    redirect("/auth/sign-in");
                }
            }
        })
    }

    const handleDeleteAccount = async () => {
        await deleteUser({
            fetchOptions: {
                onSuccess: () => {
                    redirect("/auth/sign-in");
                }
            }
        })
    }


    return (
        <div>
            <h1>Mon Compte</h1>
            <Button onClick={handleDisconnect}>Se déconnecter</Button>
            <Button onClick={handleDeleteAccount}>Supprimer mon compte</Button>
        </div>
    );
}