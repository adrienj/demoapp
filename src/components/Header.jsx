import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import CartList from './CartList.jsx';
import CartTotal from './CartTotal.jsx';

import { getCartCount, getCartTotal } from '../utils.js';

const Header = ({ loading, cart, toggleCart, openComic, showGotoTop, goToTop }) => {
    let cartCount = getCartCount(cart),
        emptyCart = (cartCount === 0),
        cartIconProps = !emptyCart ? {'data-count': cartCount} : {};

    return (<div id='header-container'>
        <div id='logo-container'>
            <Link to={'/'} id='logo'>ComicsBrowser</Link>
        </div>
        {showGotoTop && (
            <div id='gototop-button'
                className='appear-bounce btn-header'
                onClick={goToTop}>
                    <div className='icon arrow-up'></div>
            </div>
        )}
        <Link to={'/cart'} className='btn-header cart-icon' {...cartIconProps}></Link>
        {!emptyCart && (
            <div id='cart-preview' className='appear-bounce'>
                <CartTotal cart={cart} />
                <CartList cart={cart} toggleCart={toggleCart} openComic={openComic} />
            </div>
        )}
        {loading && (
            <div className='loading-progress'></div>)}
    </div>);
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired,
    showGotoTop: PropTypes.bool.isRequired,
    goToTop: PropTypes.func.isRequired,
    openComic: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired,
    toggleCart: PropTypes.func.isRequired,
};

export default Header;
