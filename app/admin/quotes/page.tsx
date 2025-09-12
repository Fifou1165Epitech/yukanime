import prisma from "@/lib/prisma";

export default async function QuotesPage() {

    return (
        <div className="flex flex-col gap-4 h-[70vh]">
            <div className="flex-none">
                <h1 className="text-4xl font-bold uppercase">Citations</h1>
            </div>
            <section className="grow">
                <input type="text" placeholder="Rechercher un id.." />
            </section>
        </div>
    );
}