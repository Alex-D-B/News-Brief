export type StoryCategory
    = 'world' | 'us' | 'politics' | 'nyregion'
    | 'business' | 'opinion' | 'science' | 'health'
    | 'sports' | 'arts' | 'books' | 'style'
    | 'food' | 'travel' | 'magazine' | 'realestate';

export const allCategories: StoryCategory[] = [
    'world', 'us', 'politics', 'nyregion',
    'business', 'opinion', 'science', 'health',
    'sports', 'arts', 'books', 'style',
    'food', 'travel', 'magazine', 'realestate'
];

export type UserPreferences = string[];