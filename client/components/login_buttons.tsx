'use client';

import { signIn, signOut } from "next-auth/react";

const className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right";

export function LoginButton(): JSX.Element {
    return (
        <button
            className={className}
            onClick={() => signIn('google', { callbackUrl: '/callback' })}
        >
            Login
        </button>
    );
}

export function LogoutButton(): JSX.Element {
    return (
        <button className={className} onClick={() => signOut()}>
            Logout
        </button>
    );
}
