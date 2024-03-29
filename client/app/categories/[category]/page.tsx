import { SectionFeedPage } from '@/components/feed';
import { getStories } from '@/net/database';

type Props = {
    params: {
        category: string;
    }
};
export default async function CategoryPage({ params }: Props): Promise<JSX.Element> {
    return <SectionFeedPage getSectionStories={async () => getStories({ categories: [params.category], getTop: true })} />;
}