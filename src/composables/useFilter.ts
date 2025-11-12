function searchFilterObject<T extends object>(items: T[], params: string[], search: string): T[] {
    const searchValue = search.toLowerCase();
    return items.filter(item =>
        params.some(param =>
            String(item[param]).toLowerCase().includes(searchValue)
        )
    );
}

function searchFilterById<T extends object>(items: T[], params: string[], searchId: number) {
    return items.filter(item =>
        params.some(param =>
            item[param] === searchId
        )
    );
}

export {searchFilterObject, searchFilterById}