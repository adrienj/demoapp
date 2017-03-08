import React, {PropTypes} from 'react';
import { Link } from 'react-router';

import CartList from './CartList.jsx';
import CartTotal from './CartTotal.jsx';

import { getCartCount, getCartTotal, orderCart } from '../utils.js';


const Cart = React.createClass({
    displayName: 'Cart',

    propTypes: {
        cart: PropTypes.array,
        editQuantity: PropTypes.func,
        toggleCart: PropTypes.func,
        openComic: PropTypes.func
    },

    getInitialState() {
        return {
            closing: false,
            order: 'title',
        };
    },

    componentWillLeave(callback) {
        setTimeout(callback, 200);
        this.setState({closing: true});
    },

    _order() {
        this.setState({
            order: this.refs.order.value
        });
    },

    render() {
        let {cart, toggleCart, openComic, editQuantity} = this.props,
            total = getCartTotal(cart),
            cartCount = getCartCount(cart),
            plurial = cartCount > 1 ? 's' : '',
            closingClass = this.state.closing ? 'closing' : '',
            orderedCart = orderCart(cart, this.state.order);

        return (<div id='cart-container' className={'popup-container appear-bounce ' + closingClass}>
                <Link className="popup-overlay" to={'/'}></Link>

                <div className="popup">
                    <h2>Your items</h2>

                    {(cartCount > 0) && (
                        <div className="orderby">
                            Order by
                            <select ref='order' onChange={this._order}>
                                <option value='title'>name</option>
                                <option value='quantity'>quantity</option>
                            </select>
                        </div>
                    )}

                    <CartList ref='cartlist' cart={orderedCart} toggleCart={toggleCart} openComic={openComic} editQuantity={editQuantity} />
                    {(cartCount === 0) && (
                        <p>Cart empty</p>
                    )}

                    <CartTotal cart={cart} />

                    {(cartCount > 0) && (
                        <Link to="/checkout" className="btn-checkout">
                            Proceed to checkout
                            <i className="arrow-right"></i>
                        </Link>
                    )}

                </div>
            </div>);
    }
});

export default Cart;
