import { story as Story } from "@prisma/client";

type Props = {
    story: Story,
    showDate: boolean
};
export default async function Article({ story, showDate }: Props): Promise<JSX.Element> {

    const categories = story.categories.map((category) => {
        return <a
            href={`/categories/${category}`} key={category} className="hover:text-gray-300"
        >{category}</a>;
    });
    const dateClass = `pt-2 text-xs float-right ${showDate ? 'text-gray-100' : 'text-blue-400'}`;

    return (
        <div className="bg-blue-400 rounded-lg py-2 px-4 max-w-md float-left">
            <div className="pb-2 text-gray-100 text-xs grid grid-cols-2">
                <ul className="font-bold flex space-x-2">{categories}</ul>
                <p className="justify-self-end">{story.source}</p>
            </div>
            <a
                className="hover:text-gray-700"
                href={story.link}
            >
                <span className="font-bold text-lg">{story.title}</span>
                <span> by {story.author ?? 'unknown'}</span>
            </a>
            <p className="text-sm">{story.description}</p>
            <p className={dateClass}>{story.date.slice(5) + '-' + story.date.slice(0, 4)}</p>
        </div>
    );
}