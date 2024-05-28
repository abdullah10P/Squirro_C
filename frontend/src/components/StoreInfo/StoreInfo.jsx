
import React from 'react';
import './styles.scss';

const StoreInfo = ({ store }) => {
    const storeAttributes = store.attributes;

    const ratingStars = [];
    for (let i = 0; i < storeAttributes.rating; i++) {
        ratingStars.push(<span key={i} className="star">★</span>);
    }
    for (let i = storeAttributes.rating; i < 5; i++) {
        ratingStars.push(<span key={i} className="star">☆</span>);
    }

    return (
        <div className="store-info">
            <div className="store-header">
                <h3>{storeAttributes.name}</h3>
                <div className="rating">{ratingStars}</div>
            </div>
        </div>
    );
};

export default StoreInfo;
