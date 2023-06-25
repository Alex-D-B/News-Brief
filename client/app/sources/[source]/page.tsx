import { SectionFeedPage } from '@/components/feed';
import { getStories } from '@/net/database';

type Props = {
    params: {
        source: string;
    }
};
export default async function CategoryPage({ params }: Props): Promise<JSX.Element> {
    return (
        <SectionFeedPage getSectionStories={
            async () => getStories({ sources: [params.source.replaceAll('%20', ' ')], getTop: true })
        } />
    );
}