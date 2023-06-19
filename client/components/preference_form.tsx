'use client';

import { allCategories, allSources, UserCategoryPreferences, UserSourcePreferences } from '@/app/types';
import { MouseEvent, useState } from 'react';

type Props = {
    initiallySelectedCategories: UserCategoryPreferences,
    initiallySelectedSources: UserSourcePreferences
};
export default function PreferenceForm({ initiallySelectedCategories, initiallySelectedSources }: Props): JSX.Element {
    type OnClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => Promise<void>;
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
    const [formData] = useState({selectedCategories, selectedSources});

    const defaultOnClick: OnClick = async (event) => {
        event.preventDefault();
        updateOnclick((): OnClick => async (event) => event.preventDefault());
        updateSaveBarClasses(altSaveBarClasses);
        await fetch('/api/user', {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({
                categories: Array.from(formData.selectedCategories),
                sources: Array.from(formData.selectedSources)
            })
        });
        setupFade();
    };

    const [onClick, updateOnclick] = useState(() => defaultOnClick);
    const [hideSavedBar, updateHideSavedBar] = useState(false);
    const [saveBarClasses, updateSaveBarClasses] = useState(mainSaveBarClasses);

    const categoryBoxes = allCategories.map((category, index) => {
        return (
            <div className="space-x-1" key={index}>
                <input
                    type='checkbox' value={category} defaultChecked={selectedCategories.has(category)}
                    onClick={
                        () => formData.selectedCategories.has(category)
                            ? formData.selectedCategories.delete(category)
                            : formData.selectedCategories.add(category)
                    }
                />
                <label>{category}</label>
            </div>
        );
    });

    const sourceBoxes = allSources.map((source, index) => {
        return (
            <div className="space-x-1" key={index}>
                <input
                    type='checkbox' value={source} defaultChecked={selectedSources.has(source)}
                    onClick={
                        () => formData.selectedSources.has(source)
                            ? formData.selectedSources.delete(source)
                            : formData.selectedSources.add(source)
                    }
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
            updateOnclick(() => defaultOnClick);
        }, 3000);
    };

    return (
        <div>
            <form className="mb-2">
                <div className="grid grid-cols-2 max-w-md">
                    <div>
                        {categoryBoxes}
                    </div>
                    <div>
                        {sourceBoxes}
                    </div>
                </div>
                <button
                    className={saveBarClasses[0]}
                    onClick={onClick}>
                    save
                </button>
            </form>
            <div className={saveBarClasses[1]} hidden={hideSavedBar}>
                <p className="text-center font-semibold">successfully saved</p>
            </div>
        </div>
    );
}