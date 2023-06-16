'use client';

import { allCategories, UserPreferences } from '@/app/types';
import { MouseEvent, useState } from 'react';

type Props = {
    initiallySelectedCategories: UserPreferences;
};
export default function PreferenceForm({ initiallySelectedCategories }: Props): JSX.Element {
    type OnClick = (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => Promise<void>;
    const mainSaveBarClasses = [
        "mt-4 text-white font-bold py-0.5 px-2 rounded bg-green-500 hover:bg-green-700",
        "bg-green-400 border-x-2 border-y-4 border-green-800 bg-opacity-80 border-opacity-20 py-1 fixed left-0 min-w-full transition-opacity duration-1000 opacity-0"
    ];
    const altSaveBarClasses = [
        "mt-4 text-white font-bold py-0.5 px-2 rounded bg-green-200 hover:bg-green-200",
        "bg-green-400 border-x-2 border-y-4 border-green-800 bg-opacity-80 border-opacity-20 py-1 fixed left-0 min-w-full transition-opacity duration-1000 opacity-100"
    ];

    // turn the selected categories back into a set, since passing it through props turns it into an array
    let selectedCategories = new Set(initiallySelectedCategories);
    const [formData] = useState<Set<string>>(selectedCategories);

    const defaultOnClick: OnClick = async (event) => {
        event.preventDefault();
        updateOnclick((): OnClick => async (event) => event.preventDefault());
        updateSaveBarClasses(altSaveBarClasses);
        await fetch('/api/user', {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify(Array.from(formData))
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
                    onClick={() => formData.has(category) ? formData.delete(category) : formData.add(category)}
                />
                <label>{category}</label>
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
                {categoryBoxes}
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