import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import PreferenceForm from '@/components/preference_form';
import { getUserPreferences } from '@/net/database';

export default async function Profile(): Promise<JSX.Element> {
    const email = (await getServerSession(authOptions))?.user?.email;
    if (!email) {
        redirect('/');
    }
    
    return (
        <>
            <p className="fixed bottom-2 right-4">{`Logged in as ${email}`}</p>
            <PreferenceForm initiallySelectedCategories={await getUserPreferences()} />
        </>
    );
}
