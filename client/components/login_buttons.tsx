'use client';

import { signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import SearchMenu from './search_menu';

const className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

export function LoginButton(): JSX.Element {

    const pathname = usePathname();
    const homeButton = pathname === '/' ? <div></div> : (
        <Link className={className + " justify-self-start"} href="/">
            Home
        </Link>
    );

    return (
        <div className="grid grid-cols-2">
            {homeButton}
            <div className="flex space-x-4 justify-self-end">
                <SearchMenu />
                <button
                    className={className + " justify-self-end"}
                    onClick={() => signIn('google', { callbackUrl: '/callback' })}
                >
                    Login
                </button>
            </div>
        </div>
    );
}

export function LogoutButton(): JSX.Element {
    const homeButton = (
        <Link className={className + " justify-self-start"} href="/" key={0}>
            Home
        </Link>
    );

    const pathname = usePathname();
    const children = pathname === '/profile' ? [
        homeButton,
        <button className={className + " justify-self-end"} onClick={() => signOut({ callbackUrl: '/callback' })} key={1}>
            Logout
        </button>
    ] : [
        pathname !== '/' ? homeButton : <div></div>,
        <div className="flex space-x-4 justify-self-end" key={1}>
            <SearchMenu />
            <Link className={className} href="/profile">
                Profile
            </Link>
        </div>
    ];

    return (
        <div className="grid grid-cols-2">
            {children}
        </div>
    );
}
