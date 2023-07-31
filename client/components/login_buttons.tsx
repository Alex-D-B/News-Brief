'use client';

import { signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SearchMenu from './search_menu';

const className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

function NavBase({ children }: { children: JSX.Element }): JSX.Element {
    const pathname = usePathname();
    const homeButton = (
        <div className="flex space-x-4">
            <Link className={className + " justify-self-start"} href="/">
                Home
            </Link>
            <Link className={className + " justify-self-start"} href="/feed">
                Feed
            </Link>
        </div>
    );

    return (
        <div className="grid grid-cols-2">
            {homeButton}
            <div className="flex space-x-4 justify-self-end">
                <SearchMenu />
                {children}
            </div>
        </div>
    );
}

export function LoginButton(): JSX.Element {
    return (
        <NavBase>
            <button
                className={className + " justify-self-end"}
                onClick={() => signIn('google', { callbackUrl: '/callback' })}
            >
                Login
            </button>
        </NavBase>
    );
}

export function LogoutButton(): JSX.Element {
    const pathname = usePathname();
    const button = pathname === '/profile' ? (
        <button className={className} onClick={() => signOut({ callbackUrl: '/callback' })}>
            Logout
        </button>
    ) : (
        <Link className={className} href="/profile">
            Profile
        </Link>
    );

    return (
        <NavBase>
            {button}
        </NavBase>
    );
}
