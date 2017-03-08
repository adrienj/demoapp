import React, { PropTypes } from 'react';

import { getCartCount, getCartTotal } from '../utils.js';

const CartTotal = ({ cart }) => {
    let cartCount = getCartCount(cart),
        plurial = cartCount>1?'s':'';

    return (cartCount > 0) && (
        <div className="cart-total">{cartCount + ' item' + plurial + ' for ' + getCartTotal(cart)}</div>
    );
};

CartTotal.propTypes = {
    cart: PropTypes.array.isRequired
};

export default CartTotal;
