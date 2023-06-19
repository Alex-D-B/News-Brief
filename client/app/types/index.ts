export type StoryCategory
    = 'world' | 'us' | 'politics' | 'nyregion'
    | 'business' | 'opinion' | 'investigation' | 'science' | 'health'
    | 'sports' | 'arts' | 'books' | 'style'
    | 'food' | 'travel' | 'magazine' | 'realestate';

export const allCategories: StoryCategory[] = [
    'world', 'us', 'politics', 'nyregion',
    'business', 'opinion', 'investigation', 'science', 'health',
    'sports', 'arts', 'books', 'style',
    'food', 'travel', 'magazine', 'realestate'
];

export type StorySource = 'New York Times' | 'Washington Post';

export const allSources: StorySource[] = [
    'New York Times', 'Washington Post'
];

export type UserCategoryPreferences = string[];
export type UserSourcePreferences = string[];

export type UserPreferences = {
    categories: UserCategoryPreferences,
    sources: UserSourcePreferences
};