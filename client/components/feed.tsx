import { story as Story } from '@prisma/client';
import Article from './article';

type Props = {
    getFeed: () => Promise<Story[]>,
    divideArticles: (articles: JSX.Element[]) => {leftFeed: JSX.Element[], rightFeed: JSX.Element[]},
    showDate: boolean
}
export default async function Feed({ getFeed, divideArticles, showDate }: Props): Promise<JSX.Element> {
    const curFeed = (await getFeed()).map((story) => {
        return <Article story={story} showDate={showDate} key={story.id} />;
    });
    const { leftFeed, rightFeed } = divideArticles(curFeed);

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