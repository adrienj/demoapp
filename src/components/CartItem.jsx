import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import PriceTag from './PriceTag.jsx';

import { getComicPrice } from '../utils.js';

const CartItem = ({ comic, isInCart, toggleCart, openComic, editQuantity, selected }) => (
    <div className={'comic-cart-item ' + (selected ? 'selected' : '')} key={comic.id}>
        <div
            className="btn btn-cart"
            title={isInCart ? 'Remove from cart' : 'Add to cart'}
            onClick={toggleCart(comic)}>
                {isInCart ? '-' : '+'}
        </div>

        <div className="price-tag">
            {editQuantity ? (
                <div className="quantity">
                    <input
                        type="number"
                        defaultValue={comic.quantity || 1}
                        min={1}
                        max={1000}
                        onChange={editQuantity(comic)}/>
                    {' x '}
                </div>
            ) : ((comic.quantity || 1) + ' x ')}
            <PriceTag comic={comic} />
        </div>

        <div className="title" title={comic.title}>
            <Link
                key={'comic'+comic.id}
                className="cart-comic-link"
                to={'/comics/'+comic.id}
                onClick={()=>{openComic(comic.id)}}>
                {comic.title}
            </Link>
        </div>
    </div>
);

CartItem.propTypes = {
    comic: PropTypes.object.isRequired,
    isInCart: PropTypes.bool.isRequired,
    selected: PropTypes.bool,
    toggleCart: PropTypes.func.isRequired,
    editQuantity: PropTypes.func,
};

export default CartItem;
