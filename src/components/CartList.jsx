import React, { PropTypes } from 'react';

import ComicCard from './ComicCard.jsx';
import CartItem from './CartItem.jsx';

import { isInCart } from '../utils.js';

const CartList = ({ cart, toggleCart, openComic, editQuantity }) => (
    <div className="cart-list">
        {cart.map((comic, i) => (
            <CartItem key={i}
                comic={comic}
                openComic={openComic}
                isInCart={isInCart(cart, comic)}
                editQuantity={editQuantity}
                toggleCart={toggleCart} />
        ))}
    </div>
);

CartList.propTypes = {
    cart: PropTypes.array.isRequired,
    toggleCart: PropTypes.func.isRequired,
    editQuantity: PropTypes.func,
    openComic: PropTypes.func.isRequired
};

export default CartList;
