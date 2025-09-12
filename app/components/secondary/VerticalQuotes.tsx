/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import prisma from "@/lib/prisma";

import Image from "next/image";

const QuoteCard = ({
  quote,
  character,
  manga,
  image,
}: Quote) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit sm:w-48 cursor-pointer overflow-hidden border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-3">
        <Image 
          className="object-cover h-8 w-8" 
          width="40" 
          height="40" 
          alt={character} 
          src={`/db/characters/${image}`} 
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {character}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{manga}</p>
        </div>
      </div>
      <blockquote className="text-sm leading-relaxed italic">
        "{quote}"
      </blockquote>
    </figure>
  );
};

type Quote = {
  quote: string;
  character: string;
  manga: string;
  image: string;
}


export async function VerticalQuotes() {

  const firstRowQuotes = await prisma.quote.findMany({
    take: 5,
  })
  const secondRowQuotes = await prisma.quote.findMany({
    skip: 5,
    take: 5,
  })

  console.log(firstRowQuotes, secondRowQuotes);

  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
      <Marquee vertical className="[--duration:25s]">
        {firstRowQuotes.map((quote) => (
          <QuoteCard key={quote.id} {...quote} />
        ))}
      </Marquee>
      <Marquee reverse vertical className="[--duration:25s]">
        {secondRowQuotes.map((quote) => (
          <QuoteCard key={quote.id} {...quote} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
