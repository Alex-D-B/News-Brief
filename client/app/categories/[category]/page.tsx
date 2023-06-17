import Feed from '@/components/feed';
import { getStories } from '@/net/database';

type Props = {
    params: {
        category: string;
    }
};
export default async function CategoryPage({ params }: Props): Promise<JSX.Element> {
    return <Feed getFeed={async () => getStories([params.category], { getTop: true })} divideArticles={(articles) => {
        let [leftFeed, rightFeed]: JSX.Element[][] = [[], []];
        articles.forEach((article, index) => {
            index % 2 === 0 ? leftFeed.push(article) : rightFeed.push(article);
        });
        return { leftFeed, rightFeed };
    }} showDate={true} />;
}