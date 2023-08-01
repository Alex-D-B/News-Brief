import Link from 'next/link';
import { getHomeMessage } from '@/net/database';

export default async function Home(): Promise<JSX.Element> {
    const welcomeMessage = await getHomeMessage();
    return (
        <>
            <div>
                <p className="indent-8 bg-blue-200 rounded-lg py-4 px-20 mr-10">{welcomeMessage}</p>
            </div>
            <center>
                <Link
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-self-center inline-flex"
                    href="/feed"
                >Go to Feed</Link>
            </center>
        </>
    );
}
