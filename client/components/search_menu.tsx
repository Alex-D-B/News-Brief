'use client';

import SearchSelect from './search_select';
import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { allCategories, allSources } from '@/app/types';

export default function SearchMenu(): JSX.Element {
    const router = useRouter();

    const onSubmit = (event: FormEvent) => {
        event.preventDefault();

        const a_charCode = 97;
        const categoriesStr = allCategories.map((category, index) => {
            return (event.target as any)[category]?.checked ? String.fromCharCode(index + a_charCode) : undefined;
        }).filter((category) => category !== undefined).join('');
        const sourcesStr = allSources.map((source, index) => {
            return (event.target as any)[source]?.checked ? String.fromCharCode(index + a_charCode) : undefined;
        }).filter((source) => source !== undefined).join('');
        let date = (event.target as any).date?.value;
        if (date) {
            const sections = date.split('-');
            date = sections[2] + '-'
                + (sections[0].length === 1 ? '0' : '') + sections[0] + '-'
                + (sections[1].length === 1 ? '0' : '') + sections[1];
        }

        router.push(`/search/0${categoriesStr}/0${sourcesStr}/${date ?? ''}`);
    };

    return (
        <div>
            <style>{`
                .search_bar_div {position: relative;}
                .search_bar_div:hover span {display: block;}
            `}</style>
            <div className="search_bar_div">
                <p
                    className="mt-auto mb-auto bg-slate-300 pl-4 pr-2 py-2 inline-block"
                >Search</p>
                <form className="inline-block" onSubmit={onSubmit}>
                    <button className="bg-slate-400 pl-1 pr-2 py-2">Go</button>
                    <span className="absolute right-0 min-w-max bg-slate-400 p-2" hidden={true}>
                        <SearchSelect />
                    </span>
                </form>
            </div>
        </div>
    );
}