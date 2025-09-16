
import { signOut, deleteUser } from "@/lib/auth-client"
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import Header from "@/app/components/core/Header";
import DisconnectButton from "@/app/components/secondary/buttons/DisconnectButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, MessageSquareQuote, UserStar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge";
import Image from 'next/image'
import NotificationPop from "@/app/components/secondary/Notifications";
import AvatarDropzone from "@/app/components/secondary/AvatarDropzone";

export default async function AccountPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    console.log(session)

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
        <div className="flex flex-col gap-4 h-full">
            <div className="flex-none">
                <h1 className="text-xl font-bold uppercase">Mon compte</h1>
            </div>
            <section className="grow w-full flex flex-col gap-2">
                <div className="flex-none border p-4">
                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                            <AvatarDropzone 
                            currentImage={session?.user?.image} 
                            fallback={session?.user?.name?.charAt(0)} 
                            />
                            <div className="flex flex-col gap-2">
                                <span className="font-bold">{session?.user?.name}</span>
                                <span className="text-sm">{session?.user?.email}</span>
                                <div>
                                    {
                                        session?.user?.role?.includes("admin") ? (
                                            <Badge className=""> <UserStar /> {session?.user?.role}</Badge>
                                        ) : <Badge> <User /> {session?.user?.role}</Badge>
                                    }
                                </div>
                            </div>
                        </div>
                        <div>

                            
                        </div>
                        
                    </div>
                </div>
                <div className="grow border p-4">

                </div>
            </section>
        </div>
    );
}