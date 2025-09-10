
import Header from "@/app/components/core/Header";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Peoples } from "@/app/components/secondary/Peoples";
import { VerticalQuotes } from "@/app/components/secondary/VerticalQuotes";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Button } from "@/components/ui/button";
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { Suspense } from 'react'
import Footer from "@/app/components/core/Footer";


export default async function Home() {


  return (
    <div className="w-9/10 m-auto border-x">
      <Header />
      <main className="relative border-b">
        <div className="opacity-50 absolute -z-1 bg-background p-20 flex justify-center w-full h-full">
          <GridPattern
            width={20}
            height={20}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
            )}
          />
        </div>
        <div className="flex justify-around">
          <section className="flex flex-col justify-center">
            <Peoples />
            <h2 className="text-xl">Rejoignez une communauté de passionés</h2>
            <h1 className="font-buildTitling text-[12rem] leading-[0.9]">Yukanime</h1>
            <InteractiveHoverButton>Découvrir les citations</InteractiveHoverButton>
          </section>
          <section>
            <VerticalQuotes />
          </section>
        </div>
      </main>
      <section>
        <div className="flex flex-col gap-4 justify-center items-center p-16 border-b bg-[url('/chibi.png')] bg-no-repeat bg-contain">
          <div className="text-center">
            <h1 className="mix-blend-difference uppercase text-4xl font-medium">Une communauté grandissante</h1>
            <p className="mix-blend-difference">Rejoignez une communauté de passionés d'anime et partagez vos idées, critiques et recommandations.</p>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <div>
                <Image
                  src="/icons/discord.svg"
                  alt="Discord"
                  width={16}
                  height={16}
                />
                Rejoignez le discord
              </div>
            </Button>
            <Button asChild>
              <div>
                <Image
                  className="invert"
                  src="/app.ico"
                  alt="Yukanime"
                  width={16}
                  height={16}
                />
                S'inscrire sur Yukanime
              </div>
            </Button>
          </div>
        </div>
      </section>
      <section className="flex bg-diagonale border-b">
          <section className="bg-background w-[95%] border-x m-auto p-12">
            <div>
              <h1 className="text-4xl uppercase font-medium">Dernières sorties</h1>
              <p>Découvrez les dernières nouveautés de vos animes préférés !</p>
              <Button variant="link">Voir plus</Button>
            </div>
            <div>

            </div>
          </section>
      </section>
      <Footer />
    </div>
  );
}
