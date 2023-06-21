import { NextRequest, NextResponse } from "next/server";
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import database from '@/net/database';

export async function POST(request: NextRequest) {
    const email = (await getServerSession(authOptions))?.user?.email;
    if (!email) return NextResponse.error();

    const { categories, sources } = await request.json();
    await database.user.upsert({
        where: {
            email: email
        },
        update: {
            categories: categories,
            sources: sources
        },
        create: {
            email: email,
            categories: categories,
            sources: sources
        }
    });

    return NextResponse.json({});
}