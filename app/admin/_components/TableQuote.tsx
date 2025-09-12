"use client"

import useSwr from "swr";
import { fetcher } from "@/lib/fn";

import PaginateQuote from "./PaginateQuote";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge";
import { useSearchParams } from 'next/navigation'

export type Quote = {
    id: string,
    author: {
        id: string,
        name: string
    },
    quote: string,
    character: string,
    manga: string,
    image: string,
    chapter: null | string,
    episode: string,
    verified: true,
    createdAt: string,
    updatedAt: string,
    authorId: string
}

export default function TableQuote() {

    const searchParams = useSearchParams()
    const page = searchParams.get('page')

    const { data: quotes } = useSwr(`/api/quotes?page=${page}`, fetcher);
    console.log(quotes);

    return (
        <div className="w-full h-full flex flex-col gap-4 justify-between">
            <section className="">
                <div className="border p-2">
                    <div className="flex gap-2 uppercase font-bold">
                        <h1 className="w-1/12">Id</h1>
                        <h1 className="w-2/12">Auteur</h1>
                        <h1 className="w-2/12">Personnage</h1>
                        <h1 className="w-2/12">Manga</h1>
                        <h1 className="w-2/12">Citation</h1>
                        <h1 className="w-2/12">Date de création</h1>
                        <h1 className="w-1/12">Status</h1>
                    </div>
                </div>
                <div className="border-x">
                    {quotes && quotes.quotesList.map((quote: Quote) => (
                        <div className="flex gap-2 border-b p-2" key={quote.id}>
                            <h1 className="w-1/12"><Badge>{quote.id}</Badge></h1>
                            <h1 className="w-2/12">{quote.author.name}</h1>
                            <h1 className="w-2/12">{quote.character}</h1>
                            <h1 className="w-2/12">{quote.manga}</h1>
                            <h1 className="w-2/12 line-clamp-1">{quote.quote}</h1>
                            <h1 className="w-2/12">25/08/10</h1>
                            <h1 className="w-1/12">
                                {quote.verified ? (
                                    <Badge>Vérifié</Badge>
                                ) : (
                                    <Badge variant="outline">Non vérifié</Badge>
                                )}
                            </h1>
                            
                        </div>
                    ))}
                </div>
            </section>
            <PaginateQuote selectedPage={Number(page)} totalPages={quotes?.pagination.totalPages}  />
        </div>
    );
}