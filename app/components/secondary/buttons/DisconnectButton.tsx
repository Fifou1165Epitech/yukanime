"use client"

import { signOut } from "@/lib/auth-client"
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function DisconnectButton() {

    const handleDisconnect = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    redirect("/auth/sign-in");
                }
            }
        })
    }

    return (
        <Button variant="outline" onClick={handleDisconnect}>
                <LogOut />
                Se déconnecter
        </Button>
    )
}
