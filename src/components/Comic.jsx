import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import PriceTag from './PriceTag.jsx';

import { getComicPrice } from '../utils.js';


const Comic = React.createClass({
    displayName: 'Comic',

    propTypes: {
        children: PropTypes.element,
        id: PropTypes.number,
        comic: PropTypes.object,
        toggleCart: PropTypes.func,
        throwComic: PropTypes.func
    },

    getInitialState() {
        return {
            closing: false
        };
    },

    componentWillLeave(callback) {
        setTimeout(callback, 200);
        this.setState({closing: true});
    },

    render() {
        let {comic, toggleCart, isInCart, throwComic} = this.props,
            closingClass = this.state.closing ? 'closing' : '';

        return comic && (
            <div className={`popup-container appear-bounce ${closingClass}`} key={comic.id}>
                <Link className="popup-overlay" to={'/'} onClick={throwComic}></Link>

                <div className="popup comic-popup">
                    <div className="title" title={comic.title}>
                        <div
                            className="btn btn-cart"
                            title={isInCart ? 'Remove from cart' : 'Add to cart'}
                            onClick={toggleCart(comic)}>
                                {isInCart ? '-' : '+'}
                                <i className="cart-icon"></i>
                        </div>
                        <PriceTag comic={comic} />
                        {comic.title}
                    </div>

                    <img className="cover" src={comic.thumbnail.path+'.'+comic.thumbnail.extension} />

                    <div className="description">{comic.description}</div>

                    <h4>Series</h4>
                    {comic.series ? comic.series.name : (
                        <p>This comic is a special edition</p>
                    )}

                    <h4>Authors</h4>
                    {comic.creators.available > 0 ? (
                        <ul>
                            {comic.creators.items.map(({name, role}, i) => (
                                <li key={i}><em>{name}</em>, {role}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No author specified</p>
                    )}

                    <h4>References</h4>
                    <ul>
                        {comic.urls.map(({url, type}, i) => (
                            <li key={i}><em><a target="_blank" rel="noopener noreferrer" href={url}>{type}</a></em></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
});

export default Comic;
