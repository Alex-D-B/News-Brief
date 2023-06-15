'use client';

import { allCategories, UserPreferences } from '@/app/types';
import { useState } from 'react';

type Props = {
    initiallySelectedCategories: UserPreferences;
};
export default function PreferenceForm({ initiallySelectedCategories }: Props): JSX.Element {
    // turn the selected categories back into a set, since passing it through props turns it into an array
    initiallySelectedCategories = new Set(initiallySelectedCategories);
    const [formData] = useState<UserPreferences>(initiallySelectedCategories);
    let x = [1, 2, 3];

    const categoryBoxes = allCategories.map((category, index) => {
        return (
            <div className="space-x-1" key={index}>
                <input
                    type='checkbox' value={category} defaultChecked={initiallySelectedCategories.has(category)}
                    onClick={() => formData.has(category) ? formData.delete(category) : formData.add(category)}
                />
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
                    await fetch('/api/user', {
                        method: 'POST',
                        cache: 'no-store',
                        body: JSON.stringify(Array.from(formData))
                    });
                }
            }>save</button>
        </form>
    );
}