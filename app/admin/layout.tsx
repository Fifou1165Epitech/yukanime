
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

import Header from "@/app/components/core/Header";
import DisconnectButton from "@/app/components/secondary/buttons/DisconnectButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, MessageSquareQuote, ShieldUser, Users, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
      headers: await headers()
  })

  const isAdmin = session?.user?.role?.includes("admin");

  const links = [
    { href: "/admin", label: "Accueil", icon: Home },
    { href: "/admin/users", label: "Utilisateurs", icon: Users },
    { href: "/admin/quotes?page=1", label: "Citations", icon: MessageSquareQuote },
  ];

  return (
    <>
        <div className="w-9/10 m-auto border-x flex flex-col h-screen">
            <Header />
            <main className="flex grow">
                <section className="w-1/6 border-r flex flex-col justify-between p-4">
                    <div>
                        <nav className="flex flex-col gap-2">
                            {links.map(link => (
                                <Button key={link.href} className="w-full flex justify-start" asChild variant="ghost">
                                    <Link href={link.href}>{<link.icon />} {link.label}</Link>
                                </Button>
                            ))}
                        </nav>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <Button className="text-center bg-red-400" asChild variant="outline">
                            <Link href="/account"><User /> Mon compte</Link>
                        </Button>
                        <DisconnectButton />
                        <div className="border p-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="rounded-none">
                                    {
                                        session?.user.image ? (
                                            <AvatarImage className="rounded-none border" src={session.user.image} />
                                        ) : null
                                    }
                                    <AvatarFallback className="rounded-none bg-transparent border">{session?.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col text-xs">
                                    <h1>{session?.user?.name}</h1>
                                    <h2>{session?.user?.email}</h2>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-5/6 flex flex-col">
                  <div className="bg-diagonale border-b h-12 flex-none w-full"></div>
                  <div className="p-4 grow">
                    {children}
                  </div>
                </section>
            </main>
        </div>
    </>
  );
}
