'use client';

import { signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'

const className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

export function LoginButton(): JSX.Element {
    return (
        <button
            className={className + " float-right"}
            onClick={() => signIn('google', { callbackUrl: '/callback' })}
        >
            Login
        </button>
    );
}

type LogoutButtonProps = {
    email: string;
}
export function LogoutButton({ email }: LogoutButtonProps): JSX.Element {

    const pathname = usePathname();
    const children = pathname === '/profile' ? [
        <Link className={className + " justify-self-start"} href="/" key={0}>
            Home
        </Link>,
        <button className={className + " justify-self-end"} onClick={() => signOut({ callbackUrl: '/callback' })} key={1}>
            Logout
        </button>
    ] : [
        <p className="font-bold mt-auto mb-auto" key={0}>{`Logged in as ${email}`}</p>,
        <Link className={className + " justify-self-end"} href="/profile" key={1}>
            Profile
        </Link>
    ];

    return (
        <div className="grid grid-cols-2">
            {children}
        </div>
    );
}
