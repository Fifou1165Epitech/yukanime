import prisma from "@/lib/prisma";
import TableQuote from "@/app/admin/_components/TableQuote";

export default async function QuotesPage() {


    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex-none">
                <h1 className="text-4xl font-bold uppercase">Citations</h1>
            </div>
            <section className="grow w-full">
                <TableQuote />
            </section>
        </div>
    );
}