import { PrismaClient, stories } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Article(): Promise<JSX.Element> {

    const story = await prisma.stories.findFirst({
        where: {
            categories: {
                has: 'world'
            }
        }
    }) as stories;
    const categories = story.categories.map((category) => {
        return <li key={category}>{category}</li>;
    });

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
            <p className="pt-2 text-gray-100 text-xs float-right">{story.date}</p>
        </div>
    );
}