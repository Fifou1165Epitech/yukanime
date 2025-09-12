
import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || '1';
    const countByPage = 10;
    console.log("Page:", page);
    const totalQuotes = await prisma.quote.count();
    const pageCount = Math.ceil(totalQuotes / countByPage);

    const quotes = await prisma.quote.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        skip: (parseInt(page) - 1) * countByPage,
        take: countByPage,
    })
    const res = {
        "quotesList": quotes,
        "pagination": {
            "total": totalQuotes,
            "page": parseInt(page),
            "totalPages": pageCount,
            "countByPage": countByPage
        }
    }
    return Response.json(res);
}