'use client';

import { allCategories, allSources } from '@/app/types';

export default function PreferenceForm(): JSX.Element {
    const categoryBoxes = allCategories.map((category, index) => {
        return (
            <div className="space-x-1" key={index}>
                <input
                    type='checkbox' name={category}
                />
                <label>{category}</label>
            </div>
        );
    });

    const sourceBoxes = allSources.map((source, index) => {
        return (
            <div className="space-x-1" key={index}>
                <input
                    type='checkbox' name={source}
                />
                <label>{source}</label>
            </div>
        );
    });

    let date = new Date();
    date.setDate(date.getDate() - 2);
    let dateStr = date.toISOString().slice(0, 10);
    dateStr = dateStr.slice(5) + '-' + dateStr.slice(0, 4);

    return (
        <>
            <div className="mb-2">
                <div className="grid grid-cols-2 max-w-md">
                    <div>
                        {categoryBoxes}
                    </div>
                    <div>
                        {sourceBoxes}
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <p>Date (optional): MM-DD-YYYY</p>
                <input type='text' name='date' pattern='^([0-9]{1,2}-){2}[0-9]{4}$' placeholder={dateStr} />
            </div>  
        </>
    );
}