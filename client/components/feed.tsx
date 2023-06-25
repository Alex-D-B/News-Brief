import { story as Story } from '@prisma/client';
import Article from './article';

type FeedProps = {
    getFeed: () => Promise<Story[]>,
    divideArticles: (articles: JSX.Element[]) => {leftFeed: JSX.Element[], rightFeed: JSX.Element[]},
    showDate: boolean
};
export default async function Feed({ getFeed, divideArticles, showDate }: FeedProps): Promise<JSX.Element> {
    const curFeed = await getFeed();
    if (curFeed.length === 0) {
        return <p className="font-bold text-lg">Nothing under this section was found.</p>;
    }

    const articles = (await getFeed()).map((story) => {
        return <Article story={story} showDate={showDate} key={story.id} />;
    });
    const { leftFeed, rightFeed } = divideArticles(articles);

    return (
        <div className="flex flex-row space-x-4">
            <div className="flex flex-col space-y-4">
                {leftFeed}
            </div>
            <div className="flex flex-col space-y-4">
                {rightFeed}
            </div>
        </div>
    );
}

type SectionFeedPageProps = {
    getSectionStories: () => Promise<Story[]>
};
export async function SectionFeedPage({ getSectionStories }: SectionFeedPageProps): Promise<JSX.Element> {
    return (
        <Feed getFeed={getSectionStories} divideArticles={(articles) => {
            let [leftFeed, rightFeed]: JSX.Element[][] = [[], []];
            articles.forEach((article, index) => {
                index % 2 === 0 ? leftFeed.push(article) : rightFeed.push(article);
            });
            return { leftFeed, rightFeed };
        }} showDate={true} />
    );
}