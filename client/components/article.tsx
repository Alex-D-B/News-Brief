type Props = {
    title: string,
    image: number,
    source: string
}

export default function Article(props: Props): JSX.Element {
    return (
        <div>
            <h1 className="text-lg">{props.title}</h1>
            <h3 className="text-base">{`Displaying image ${props.image}!`}</h3>
            <p className="text-sm">{props.source}</p>
        </div>
    );
}