'use client';

import { allCategories, allSources, UserCategoryPreferences, UserSourcePreferences } from '@/app/types';
import { FormEvent, useState } from 'react';

type Props = {
    initiallySelectedCategories: UserCategoryPreferences,
    initiallySelectedSources: UserSourcePreferences
};
export default function PreferenceForm({ initiallySelectedCategories, initiallySelectedSources }: Props): JSX.Element {
    type OnSubmit = (event: FormEvent) => Promise<void>;
    const mainSaveBarClasses = [
        "mt-4 text-white font-bold py-0.5 px-2 rounded bg-green-500 hover:bg-green-700",
        "bg-green-400 border-x-2 border-y-4 border-green-800 bg-opacity-80 border-opacity-20 py-1 fixed left-0 min-w-full transition-opacity duration-1000 opacity-0"
    ];
    const altSaveBarClasses = [
        "mt-4 text-white font-bold py-0.5 px-2 rounded bg-green-200 hover:bg-green-200",
        "bg-green-400 border-x-2 border-y-4 border-green-800 bg-opacity-80 border-opacity-20 py-1 fixed left-0 min-w-full transition-opacity duration-1000 opacity-100"
    ];

    // turn the selected categories and sources back into a set, since passing it through props turns it into an array
    let selectedCategories = new Set(initiallySelectedCategories);
    let selectedSources = new Set(initiallySelectedSources);

    const defaultOnSubmit: OnSubmit = async (event) => {
        event.preventDefault();
        updateOnSubmit((): OnSubmit => async (event) => event.preventDefault());
        updateSaveBarClasses(altSaveBarClasses);
        await fetch('/api/user', {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({
                categories: allCategories.map(
                        (category) => (event.target as any)[category]?.checked ? category : undefined
                    ).filter((category) => category !== undefined),
                sources: allSources.map(
                        (source) => (event.target as any)[source]?.checked ? source : undefined
                    ).filter((source) => source !== undefined)
            })
        });
        setupFade();
    };

    const [onSubmit, updateOnSubmit] = useState(() => defaultOnSubmit);
    const [hideSavedBar, updateHideSavedBar] = useState(false);
    const [saveBarClasses, updateSaveBarClasses] = useState(mainSaveBarClasses);

    const categoryBoxes = allCategories.map((category, index) => {
        return (
            <div className="space-x-1" key={index}>
                <input
                    type='checkbox' name={category} defaultChecked={selectedCategories.has(category)}
                />
                <label>{category}</label>
            </div>
        );
    });

    const sourceBoxes = allSources.map((source, index) => {
        return (
            <div className="space-x-1" key={index}>
                <input
                    type='checkbox' name={source} defaultChecked={selectedSources.has(source)}
                />
                <label>{source}</label>
            </div>
        );
    });

    const setupFade = () => {
        updateHideSavedBar(false);
        setTimeout(() => {
            updateSaveBarClasses([altSaveBarClasses[0], mainSaveBarClasses[1]]);
        }, 2000);
        setTimeout(() => {
            updateHideSavedBar(true);
            updateSaveBarClasses(mainSaveBarClasses);
            updateOnSubmit(() => defaultOnSubmit);
        }, 3000);
    };

    return (
        <div>
            <form className="mb-2" onSubmit={onSubmit}>
                <div className="grid grid-cols-2 max-w-md">
                    <div>
                        {categoryBoxes}
                    </div>
                    <div>
                        {sourceBoxes}
                    </div>
                </div>
                <input
                    type='submit'
                    className={saveBarClasses[0]}
                    defaultValue='save'
                />
                    
            </form>
            <div className={saveBarClasses[1]} hidden={hideSavedBar}>
                <p className="text-center font-semibold">successfully saved</p>
            </div>
        </div>
    );
}