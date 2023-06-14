import { NextResponse } from "next/server";
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export async function GET() {
    const email = (await getServerSession(authOptions))?.user?.email;
    console.log(`Request from ${email}`);
    return NextResponse.json({ hello: 'world' });
}