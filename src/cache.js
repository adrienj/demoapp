const storageKey = 'marvel-cache';

let cache,
    cacheEnabled = true,
    hasLocalStorage = window.localStorage;

if (hasLocalStorage) {
    cache = JSON.parse(localStorage.getItem(storageKey));
}

const Cache = {
    isEnabled: () => (cacheEnabled),

    has: (chan, key) => {
        return Cache.get(chan, key);
    },
    get: (chan, key) => {
        return hasLocalStorage && cache && cache[chan] && cache[chan][key];
    },
    set: (chan, key, value) => {
        if (hasLocalStorage) {
            if (!cache) {
                cache = {[chan]:{}};
            }
            else if (!cache[chan]) {
                cache[chan] = {};
            }
            cache[chan][key] = value;
            localStorage.setItem(storageKey, JSON.stringify(cache));
        }
    }
};

export default Cache;
