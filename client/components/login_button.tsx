'use client';

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton(): JSX.Element {

    const session = useSession();

    return (
        <>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
                console.log('Login button clicked');
                signIn('google', { callbackUrl: '/callback' });
            }}
        >
            Login
        </button>
        <p>{session.status}</p>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
                console.log('Logout button clicked');
                signOut();
            }}
        >
            Logout
        </button>
        </>
    );
}
