import { LoginButton, LogoutButton } from '@/components/login_buttons';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

export default function Nav(): JSX.Element {
    return (
        <div className="flow-root bg-gray-200 p-2 min-w-full">
            <AuthButton />
        </div>
    );
}

async function AuthButton(): Promise<JSX.Element> {
    const session = await getServerSession(authOptions);
    return session?.user?.email ? <LogoutButton email={session.user.email} /> : <LoginButton />;
}