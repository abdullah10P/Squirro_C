
import React from 'react';
import StoreInfo from './StoreInfo';
import BookList from './BookList';

const Store = ({ store, included }) => {
    const storeAttributes = store.attributes || {};
    const storeRelationships = store.relationships || {};

    const storeCountries = included.find(inc => inc.type === 'countries' && inc.id === storeRelationships.countries?.data?.id)?.attributes || {};

    return (
        <div className="store">
            <div className="store-image-container">
                <img className="store-image" src={storeAttributes.storeImage} alt={storeAttributes.name} />
            </div>
            <div className="store-details">
                <StoreInfo store={store} />
                <BookList books={storeRelationships.books?.data || []} included={included} />
                <div className="store-footer">
                    <p className="establishment-date">
                        {new Date(storeAttributes.establishmentDate).toLocaleDateString()} - <a href={`http://${storeAttributes.website}`} target="_blank" rel="noopener noreferrer">{storeAttributes.website.replace(/^https?:\/\//, '')}</a>
                    </p>
                    <img className="flag" src={`https://flagsapi.com/${storeCountries.code}/flat/64.png`} alt={storeCountries.code} />
                </div>
            </div>
        </div>
    );
};

export default Store;
