import { request } from '../utils.js';
import md5 from 'md5';

const proxyUrl = '/marvel';
const marvelRoot = 'https://gateway.marvel.com/v1/public';
const routes = {
    comics: (offset) => ({url: `${proxyUrl}`, params: {route: `${marvelRoot}/comics?format=comic&limit=5&offset=${offset}&`}}),
    comic: (id) => ({url: `${proxyUrl}`, params: {route: `${marvelRoot}/comics/${id}?`}})
};

const DataMixin = {
    _fetchComics(offset) {
        return new Promise((resolve, reject) => {
            request('GET', routes.comics(offset))
                .then((data) => {
                    resolve(JSON.parse(JSON.parse(data).body).data.results);
                })
                .catch(reject);
        });
    },

    _fetchComic(id) {
        return new Promise((resolve, reject) => {
            request('GET', routes.comic(id))
                .then((data) => {
                    resolve(JSON.parse(JSON.parse(data).body).data.results[0]);
                })
                .catch(reject);
        });
    }
};

export default DataMixin;
