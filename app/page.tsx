"use client";

import Header from "@/app/components/core/Header";

import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { Peoples } from "@/app/components/secondary/Peoples";
import { VerticalQuotes } from "@/app/components/secondary/VerticalQuotes";

export default function Home() {
  return (
    <div>
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
          <section className="flex flex-col justify-center gap-4">
            <Peoples />
            <h2 className="ml-4">Rejoignez une communauté de passionés</h2>
            <h1 className="font-buildTitling text-[12rem] leading-none">Yukanime</h1>
          </section>
          <section>
            <VerticalQuotes />
          </section>
        </div>
      </main>
    </div>
  );
}
