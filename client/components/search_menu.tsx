import SearchForm from './search_form';

export default function SearchMenu(): JSX.Element {
    return (
        <div>
            <style>{`
                .search_bar_div {position: relative;}
                .search_bar_div:hover span {display: block;}
            `}</style>
            <div className="search_bar_div">
                <p
                    className="mt-auto mb-auto bg-slate-300 px-4 py-2"
                >Search</p>
                <span className="absolute right-0 min-w-max bg-slate-500 p-2" hidden={true}>
                    <SearchForm {...{initiallySelectedCategories: [], initiallySelectedSources: []}} />
                </span>
            </div>
        </div>
    );
}