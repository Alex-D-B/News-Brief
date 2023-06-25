import Feed, { SectionFeedPage } from '@/components/feed';
import { redirect } from 'next/navigation';
import { allCategories, allSources } from '@/app/types';
import { getStories } from '@/net/database';

type Params = {
    slug: string[]
}
export default function SearchPage({ params }: {params: Params}): JSX.Element {
    if (params.slug.length < 2) {redirect('/');}

    const a_charCode = 97;
    const categories = params.slug[0].slice(1).split('')
        .map((char) => allCategories[char.charCodeAt(0) - a_charCode]).filter((category) => category !== undefined);
    const sources = params.slug[1].slice(1).split('')
        .map((char) => allSources[char.charCodeAt(0) - a_charCode]).filter((source) => source !== undefined);
    const date = params.slug.length >= 2 ? params.slug[2] : undefined;

    return <SectionFeedPage getSectionStories={async () => getStories({ categories, sources, date, getTop: true })} />
}