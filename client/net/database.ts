import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { UserPreferences } from '@/app/types';

const prismaClient = new PrismaClient();

export default prismaClient;

export const getUserPreferences = async (): Promise<UserPreferences> => {
    let res = new Set<string>();

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    // if logged in, return user specific preferences
    if (email !== null && email !== undefined) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: {
                    equals: email
                }
            }
        });

        // if user has stored preferences, use them
        if (user) {
            user.preferences.forEach((category) => res.add(category));
        }
    }

    return res;
};