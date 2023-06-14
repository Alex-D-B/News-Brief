'use client';

import { allCategories, UserPreferences } from '@/app/types';

type Props = {
    initiallySelectedCategories: UserPreferences;
};
export default function PreferenceForm({ initiallySelectedCategories }: Props): JSX.Element {
    // turn the selected categories back into a set, since passing it through props turns it into an array
    initiallySelectedCategories = new Set(initiallySelectedCategories);
    const categoryBoxes = allCategories.map((category, index) => {
        return (
            <div className="space-x-1" key={index}>
                <input type='checkbox' value={category} defaultChecked={initiallySelectedCategories.has(category)} />
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