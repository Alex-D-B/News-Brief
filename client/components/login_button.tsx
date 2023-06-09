'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton(): JSX.Element {

    const session = useSession();

    return getLoginButtons(session.status);
}

function getLoginButtons(authStatus: 'authenticated' | 'unauthenticated' | 'loading'): JSX.Element {

    const className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right";

    if (authStatus === 'unauthenticated') {
        return (
            <button
                className={className}
                onClick={() => {
                    console.log('Login button clicked');
                    signIn('google', { callbackUrl: '/callback' });
                }}
            >
                Login
            </button>
        );
    } else if (authStatus === 'authenticated') {
        return (
            <button
                className={className}
                onClick={() => {
                    console.log('Logout button clicked');
                    signOut();
                }}
            >
                Logout
            </button>
        );
    } else {
        return <button hidden={true}>filler</button>;
    }
}
