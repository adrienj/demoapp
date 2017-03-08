import React, { PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';
import { Link, browserHistory } from 'react-router';

import Header from './Header.jsx';
import ComicCard from './ComicCard.jsx';

import DataMixin from '../mixins/DataMixin.js';
import CartMixin from '../mixins/CartMixin.js';
import ScrollMixin from '../mixins/ScrollMixin.js';

import Cache from '../cache.js';
import { getComicPrice, isInCart } from '../utils.js';

const comicsPerPage = 5;

const App = React.createClass({
    propTypes: {
      children: PropTypes.element
    },

    mixins: [CartMixin, ScrollMixin, DataMixin],

    getInitialState() {
        let cart = [];

        if (Cache.isEnabled() && Cache.has('data', 'cart')) {
            cart = JSON.parse(Cache.get('data', 'cart'));
        }

        return {
            // Current viewed page (multiply by comicsPerPage to get the offset)
            page: 0,
            // Loaded comics
            comics: [],
            // List of comics added to Cart
            cart: cart,
            // shows a loading animation when a comic is downloading
            loadingComic: false,
            // shows a loading animation when comics are downloading
            loadingComics: true,
            // Fully loaded comic data
            currentComic: null,
            // Requested or opened comic
            currentComicId: this.props.params && this.props.params.id,
            // Shows an icon after scrolling
            showGotoTop: false
        };
    },

    componentDidMount() {
        let {currentComicId} = this.state;

        this._getComics(0);
        if (currentComicId) {
            this._openComic(currentComicId);
        }

        // Handles manualy using browser history
        browserHistory.listen(({action, pathname}) =>  {
            let id;

            if (pathname === '/') {
                this._throwComic();
            }
            if (action === 'POP') {
                if ((id = pathname.match(/\/comics\/([1-9]+[0-9]*)/)) && id && id[1]) {
                    // Opening comic from browser's back button
                    if (this.state.currentComicId !== id[1]) {
                        this._openComic(id[1]);
                    }
                } else {
                    // Closing comic from browser's back button
                    this._throwComic();
                }
            }
        });
    },

    _loadMore() {
        this.setState({
            page: this.state.page + 1
        });
        this._getComics(this.state.page);
    },

    _getComics(page) {
        this.setState({
            loadingComics: true
        });

        this._fetchComics(page * comicsPerPage)
            .then((comics) => {
                this.setState({
                    loadingComics: false,
                    comics: this.state.comics.concat(comics)
                });
            }).catch((err) => {
                this.setState({
                    loadingComics: false
                });
                // Notify user
            });
    },

    _getComic(comicId) {
        return new Promise((resolve, reject) => {
            let comic = this.state.comics.find(({id}) => {return id == comicId});

            // Has comic
            if (comic) {
                resolve(comic);
            // Have to download comic
            } else {
                this._fetchComic(comicId)
                    .then(resolve)
                    .catch(reject)
            }
        })
    },

    _openComic(id) {
        if (!this.state.currentComic || this.state.currentComic.id !== id) {
            this.setState({
                loadingComic: true,
                currentComicId: id
            });

            this._getComic(id)
                .then((comic) => {
                    this.setState({
                        loadingComic: false,
                        currentComic: comic
                    });
                }).catch((e) => {
                    this.setState({
                        loadingComic: false,
                        currentComicId: null
                    });
                    // notify user
                });
        }
    },

    _throwComic() {
        this.setState({
            currentComic: null,
            currentComicId: null
        });
    },

    /* Renders  */

    _renderComics() {
        return (<div id="list-container" ref={'scrollContainer'} onScroll={this._onScroll}>
            {this.state.comics.length > 0 && this.state.comics.map((comic, i) => (
                <Link
                    key={i}
                    to={'/comics/'+comic.id}
                    onClick={()=>{this._openComic(comic.id)}}>
                    <ComicCard
                        comic={comic}
                        isInCart={isInCart(this.state.cart, comic)}
                        selected={comic.id == this.state.currentComicId}
                        toggleCart={this._toggleCart} />
                </Link>
            ))}
            {this.state.comics.length > 0 && !this.state.loadingComics && (
                <div key='loadmore' className='btn-loadmore' onClick={this._loadMore}>Load more</div>
            )}
        </div>);
    },

    // Filter children to extend Comic props
    _renderComic() {
        return (<TransitionGroup transitionName="cart">
                {this.state.currentComic && React.Children.map(this.props.children, (child) => {
                    if (child.type.displayName === 'Comic') {
                        return React.cloneElement(child, {
                            comic: this.state.currentComic,
                            id: this.state.currentComic.id,
                            throwComic: this._throwComic,
                            isInCart: isInCart(this.state.cart, this.state.currentComic),
                            toggleCart: this._toggleCart
                        });
                    }
                })}
            </TransitionGroup>);
    },

    // Filter children to extend Cart props
    _renderCart() {
        return (<TransitionGroup transitionName="cart">
                {React.Children.map(this.props.children, (child) => {
                    if (child.type.displayName === 'Cart') {
                        return React.cloneElement(child, {
                            cart: this.state.cart,
                            toggleCart: this._toggleCart,
                            editQuantity: this._editQuantity,
                            openComic: this._openComic,
                        });
                    }
                })}
            </TransitionGroup>);
    },

    render() {
        return (
            <div id="main-container">
                <Header
                    openComic={this._openComic}
                    cart={this.state.cart}
                    toggleCart={this._toggleCart}
                    goToTop={this._goToTop}
                    showGotoTop={this.state.showGotoTop}
                    loading={this.state.loadingComics || this.state.loadingComic} />

                <div id="body-container">
                    {this._renderComics()}

                    <div id="sidepanel-container">
                        {this._renderComic()}
                        {this._renderCart()}
                    </div>
                </div>
            </div>
        );
    }
});


export default App;
