import Cache from '../cache.js';
import { getCartItemIndex } from '../utils.js';

const CartMixin = {
    // Remove or add item to cart
    _toggleCart(comic) {
        return (e) => {
            let cart,
                isInCart = getCartItemIndex(this.state.cart, comic);

            e.stopPropagation();
            e.preventDefault();

            cart = this.state.cart.slice();

            // If is in cart, remove
            if (isInCart) {
                cart.splice(cart.indexOf(isInCart), 1);
            } else {
                comic.quantity = 1;
                cart.push(comic);
            }

            this._saveCart(cart);
        };
    },

    _editQuantity(comic) {
        return (event) => {
            let quantity = event.target.value,
                cart = this.state.cart.slice();

            cart.map((item, i) => {
                if (item.id === comic.id) {
                    cart[i].quantity = Math.max(1, quantity);
                }
            });

            this._saveCart(cart);
        };
    },

    _saveCart(cart) {
        this.setState({
            cart: cart
        });

        if (Cache.isEnabled()) {
            Cache.set('data', 'cart', JSON.stringify(cart));
        }
    }

};

export default CartMixin;
