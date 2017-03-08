import React, { PropTypes } from 'react';

import { getComicPrice } from '../utils.js';

const PriceTag = ({ comic }) => (
    <div className="price-tag">
        {'$' + getComicPrice(comic)}
    </div>
);

PriceTag.propTypes = {
    comic: PropTypes.object.isRequired
};

export default PriceTag;
