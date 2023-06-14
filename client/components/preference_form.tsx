'use client';

import { allCategories } from '@/app/types';

export default function PreferenceForm(): JSX.Element {
    const categoryBoxes = allCategories.map((category, index) => {
        return (
            <div className="space-x-1" key={index}>
                <input type='checkbox' value={category} />
                <label>{category}</label>
            </div>
        );
    });

    return (
        <form>
            {categoryBoxes}
            <button
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-0.5 px-2 rounded"
                onClick={async (event) => {
                    event.preventDefault();
                    const res = await fetch('/api/user', { cache: 'no-cache' });
                    console.log(await res.json());
                }
            }>save</button>
        </form>
    );
}