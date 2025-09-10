"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { redirect } from "next/navigation";

import { isUsernameAvailable, signUp } from "@/lib/auth-client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from "next/image";
import { toast } from "sonner";

const delay = () => {
    return new Promise(resolve => setTimeout(resolve, 1000));
};

export default function SignUpPage() {

    const [betterAuthError, setBetterAuthError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const checkUsername = async (usernameAvailable: string) => {
        const { data: response, error } = await isUsernameAvailable({
            username: usernameAvailable,
        });
        if(response?.available) {
            return true;
        } else {
            return false;
        }
    }

    const handleSignUp = async (data: FieldValues) => {

        const promise = new Promise(async (resolve, reject) => {
            const isAvailable = await checkUsername(data.name);
            if (!isAvailable) {
                setBetterAuthError("Ce pseudo n'est pas disponible");
                reject();
                return;
            }

            
            const { data: res, error } = await signUp.email({
                    email: data.email,
                    password: data.password,
                    name: data.name,
                    username: data.name,
                    callbackURL: "/dashboard",
                }, {
                    onRequest: (ctx) => {
                        console.log("Signing up...", ctx);
                    },
                    onSuccess: async (ctx) => {
                        resolve(ctx);
                        await delay();
                        redirect("/account");
                    },
                    onError: (ctx) => {
                        setBetterAuthError("L'email est déjà utilisé.");
                        reject(ctx);
                    },
            });
        });

        toast.promise(promise, {
            loading: 'Chargement...',
            success: 'Inscription réussie ! Bienvenue sur Yukanime 👋',
            error: 'Oops, une erreur s\'est produite lors de l\'inscription.'
        });
    }

    return (
        <div className="w-9/10 flex flex-col h-screen border-x m-auto relative">
            <main className="relative grow z-3 flex flex-col items-center gap-8 justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-buildTitling">Rejoignez Yukanime !</h1>
                    <p className="">Créez votre compte dès maintenant !</p>
                </div>
                <div className="w-sm min-w-sm">
                    <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>Pseudo</Label>
                            <Input {...register("name", { required: "Pseudo requis" })} placeholder="Pseudo" type="text" className="rounded-none backdrop-blur-xs bg-background/50" />
                            <p>
                                {errors.name && (
                                    <span className="text-red-400 text-sm">
                                        {` ${errors.name.message}`}
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input {...register("email", { required: "Email requis", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Email invalide" } })} placeholder="Email@yukanime.fr" type="email" className="rounded-none backdrop-blur-xs bg-background/50" />
                            <p>
                                {errors.email && (
                                    <span className="text-red-400 text-sm">
                                        {` ${errors.email.message}`}
                                    </span>
                                )}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Mot de passe</Label>
                            <Input
                                {...register("password", {
                                    required: "Mot de passe requis",
                                    minLength: {
                                        value: 8,
                                        message: "Le mot de passe doit contenir au moins 8 caractères"
                                    } })}
                                placeholder="Mot de passe"
                                type="password"
                                className="rounded-none backdrop-blur-xs bg-background/50"
                            />
                            <p>
                                {errors.password && (
                                    <span className="text-red-400 text-sm">
                                        {` ${errors.password.message}`}
                                    </span>
                                )}
                            </p>
                        </div>
                        <Button className="w-full mt-4 rounded-none">Créer mon compte</Button>
                        {betterAuthError && (
                            <p className="text-red-400 text-sm text-center mt-2 duration-700 opacity-100 transition-opacity animate-in fade-in slide-in-from-top-2">
                                {betterAuthError}
                            </p>
                        )}
                    </form>
                    <div className="text-center mt-4">
                        <p>Déjà un compte ? <a href="/auth/sign-in" className="underline text-sm">Connectez-vous</a></p>
                    </div>
                    <div className="flex items-center pt-4">
                        <div className="h-0.1 bg-foreground mr-2 flex-1"></div>
                        <p className="shrink-0 uppercase text-xs">Ou continuer avec</p>
                        <div className="h-0.1 bg-foreground ml-2 flex-1"></div>
                    </div>
                    <div className="flex flex-col gap-4 mt-4">
                        <Button variant="outline" className="bg-background/50 backdrop-blur-xs w-full rounded-none">
                            <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </Button>
                    </div>
                </div>
            </main>
            <div className="absolute w-full inset-0 left-0 right-0 z-0 overflow-hidden">
                <div className="absolute w-full h-full bg-gradient-to-b from-background to-transparent pointer-events-none">

                </div>
                <Image className="blur-xs object-cover grayscale opacity-5 w-full h-full" src="/assets/1.jpg" alt="yukanime thorfinn" width={2000} height={2000} />
            </div>
            <div className="flex-none bg-diagonale h-12 border-t bg-background z-10"></div>
        </div>
    );
}