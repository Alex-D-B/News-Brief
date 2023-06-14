import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import PreferenceForm from '@/components/preference_form';

export default async function Profile(): Promise<JSX.Element> {
    const email = (await getServerSession(authOptions))?.user?.email;
    if (!email) {
        redirect('/');
    }
    // <p className="text-lg">{`Logged in as ${email}`}</p>
    return (
        <PreferenceForm />
    );
}
