import { PrismaClient, story as Story } from "@prisma/client";

export default async function Article(props: Story): Promise<JSX.Element> {

    const categories = props.categories.map((category) => {
        return <li key={category}>{category}</li>;
    });

    return (
        <div className="bg-blue-400 rounded-lg py-2 px-4 max-w-md float-left">
            <div className="pb-2 text-gray-100 text-xs grid grid-cols-2">
                <ul className="font-bold flex space-x-2">{categories}</ul>
                <p className="justify-self-end">{props.source}</p>
            </div>
            <a
                className="hover:text-gray-700"
                href={props.link}
            >
                <span className="font-bold text-lg">{props.title}</span>
                <span> by {props.author ?? 'unknown'}</span>
            </a>
            <p className="text-sm">{props.description}</p>
            <p className="pt-2 text-gray-100 text-xs float-right">{props.date}</p>
        </div>
    );
}