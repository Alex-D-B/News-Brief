import { redirect } from 'next/navigation';

export default function CallbackPage(): JSX.Element {
    redirect('/');
}