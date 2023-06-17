import { PrismaClient, story as Story, Prisma } from '@prisma/client';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { UserPreferences } from '@/app/types';

const prismaClient = new PrismaClient();

export default prismaClient;

export const getUserPreferences = async (): Promise<UserPreferences> => {
    let res: string[] = [];

    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    // if logged in, return user specific preferences
    if (email !== null && email !== undefined) {
        const user = await prismaClient.user.findUnique({
            where: {
                email: email
            }
        });

        // if user has stored preferences, use them
        if (user) {
            res = user.preferences;
        }
    }

    return res;
};

type AdditionalParams = {
    date?: string,
    getTop?: boolean
};
export const getStories = async (categories: string[], { date, getTop }: AdditionalParams): Promise<Story[]> => {
    return prismaClient.story.findMany({
        where: {
            date: date,
            categories: categories.length > 0 ? { hasSome: categories } : undefined
        },
        orderBy: getTop ? { date: 'desc' } : undefined,
        take: getTop ? 50 : undefined
    });
}