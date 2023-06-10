import Article from '@/components/article';
import { PrismaClient, story as Story } from '@prisma/client';

const prismaClient = new PrismaClient();

const getRandomlySortedFeed = async (date: string): Promise<Story[]> => {
    let curFeed = await prismaClient.story.findMany({
        where: {
            date: {
                equals: date
            }
        }
    });

    let i = curFeed.length;
    while (i > 0) {
        const swapIndex = Math.floor(Math.random() * i);
        --i;

        [curFeed[i], curFeed[swapIndex]] = [curFeed[swapIndex], curFeed[i]];
    }

    return curFeed;
}

export default async function Home(): Promise<JSX.Element> {

    const curFeed = (await getRandomlySortedFeed('2023-06-08')).map((story) => {
        return <Article {...story} key={story.id} />;
    });

    return (
        <div className="flex flex-row space-x-4">
            <div className="flex flex-col space-y-4">
                {curFeed.slice(0, curFeed.length / 2)}
            </div>
            <div className="flex flex-col space-y-4">
                {curFeed.slice(curFeed.length / 2)}
            </div>
        </div>
    );

}
