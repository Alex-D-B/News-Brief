import Feed from '@/components/feed';
import { story as Story } from '@prisma/client';
import { getUserPreferences, getStories } from '@/net/database';

const getMostRecentStories = async (): Promise<Story[]> => {
    const userPreferences = await getUserPreferences();

    let date = new Date();
    for (let i = 0; i < 3; ++i) {
        const feed = await getStories({...userPreferences, date: date.toISOString().slice(0, 10) });

        if (feed.length > 0) {
            return feed;
        }

        date.setDate(date.getDate() - 1);
    }
    
    return await getStories({...userPreferences, date: '2023-06-08' });
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

export default async function FeedPage(): Promise<JSX.Element> {
    return (
        <Feed getFeed={getRandomlySortedFeed} divideArticles={(articles) => {
            return { leftFeed: articles.slice(0, articles.length / 2), rightFeed: articles.slice(articles.length / 2) };
        }} showDate={false} />
    );
}
