import { NextRequest, NextResponse } from "next/server";
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import database from '@/net/database';

export async function GET(request: NextRequest) {
    const email = (await getServerSession(authOptions))?.user?.email;
    console.log(`Request from ${email}`);
    console.log(request.headers);
    return NextResponse.json({ hello: 'world' });
}

export async function POST(request: NextRequest) {
    const email = (await getServerSession(authOptions))?.user?.email;
    if (!email) return NextResponse.error();

    const updatedPreferences = await request.json();
    await database.user.upsert({
        where: {
            email: email
        },
        update: {
            preferences: updatedPreferences
        },
        create: {
            email: email,
            preferences: updatedPreferences
        }
    });

    return NextResponse.json({});
}