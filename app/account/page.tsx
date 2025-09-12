
import { signOut, deleteUser, useSession } from "@/lib/auth-client"
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Header from "@/app/components/core/Header";
import DisconnectButton from "@/app/components/secondary/buttons/DisconnectButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, MessageSquareQuote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function AccountPage() {

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
            <h1 className="text-4xl font-bold uppercase">Mon compte</h1>
            <div>
                
            </div>
        </div>
    );
}