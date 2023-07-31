import Link from 'next/link';
import { getHomeMessage } from '@/net/database';

export default async function Home(): Promise<JSX.Element> {
    const welcomeMessage = await getHomeMessage();
    return (
        <>
            <p>{welcomeMessage}</p>
            <Link href="/feed">Go to Feed</Link>
        </>
    );
}
