import React, { PropTypes } from 'react';

import PriceTag from './PriceTag.jsx';

const ComicCard = ({ comic, isInCart, toggleCart, selected }) => (
    <div className={'comicitem ' + (selected ? 'selected' : '')} key={comic.id}>
        <img className="cover" src={comic.thumbnail.path+'.'+comic.thumbnail.extension} />
        <div className="title" title={comic.title}>
            <div
                className="btn btn-cart"
                title={isInCart ? 'Remove from cart' : 'Add to cart'}
                onClick={toggleCart(comic)}>
                {isInCart ? '-' : '+'} <i className="cart-icon"></i>
            </div>
            <PriceTag comic={comic} />
            {comic.title}
        </div>

    </div>
);

ComicCard.propTypes = {
    comic: PropTypes.object.isRequired,
    isInCart: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    toggleCart: PropTypes.func.isRequired,
};

export default ComicCard;
