import Cache from './cache.js';

export function getComicPrice(comic) {
    return comic.prices.filter((p)=>(p.type==='printPrice'))[0].price;
};

export function getCartTotal(cart) {
    let total = 0;
    cart.map((comic) => {
        total += getComicPrice(comic) * (comic.quantity || 1);
    });
    return total === 0 ? 'free' : '$'+total.toFixed(2);
};

export function getCartCount(cart) {
    let total = 0;
    cart.map((comic) => {
        total += (comic.quantity || 1);
    });
    return total;
};

export function isInCart(cart, comic) {
    return !!getCartItemIndex(cart, comic);
};

export function getCartItemIndex(cart, comic) {
    return cart.find(({id}) => {return id === comic.id});
};

export function orderCart(cart, order) {
    let ordered = cart.slice();

    ordered.sort((a, b) => {
        if(a[order] < b[order]) return -1;
        if(a[order] > b[order]) return 1;
        return 0;
    });

    return ordered;
};

export function request(method, query) {
    return new Promise(function (resolve, reject) {
        if (Cache.isEnabled() && Cache.has('xhr', query.params.route)) {
            resolve(Cache.get('xhr', query.params.route));
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open(method, query.url + '?route='+encodeURIComponent(query.params.route));
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    // Cache
                    if(Cache.isEnabled()) {
                        Cache.set('xhr', query.params.route, xhr.response);
                    }

                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        }

    });
};
