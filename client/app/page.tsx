import Article from '@/components/article';
import { story as Story } from '@prisma/client';
import database from '@/net/database';

const getMostRecentStories = async (): Promise<Story[]> => {
    let date = new Date();
    for (let i = 0; i < 3; ++i) {
        const feed = await database.story.findMany({
            where: {
                date: {
                    equals: date.toISOString().slice(0, 10)
                }
            }
        });

        if (feed.length > 0) {
            return feed;
        }

        date.setDate(date.getDate() - 1);
    }

    return await database.story.findMany({
        where: {
            date: {
                equals: '2023-06-08'
            }
        }
    });
}

const getRandomlySortedFeed = async (): Promise<Story[]> => {
    let curFeed = await getMostRecentStories();

    let i = curFeed.length;
    while (i > 0) {
        const swapIndex = Math.floor(Math.random() * i);
        --i;

        [curFeed[i], curFeed[swapIndex]] = [curFeed[swapIndex], curFeed[i]];
    }

    return curFeed;
}

export default async function Home(): Promise<JSX.Element> {

    const curFeed = (await getRandomlySortedFeed()).map((story) => {
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
