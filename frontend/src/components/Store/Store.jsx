import React, { useEffect, useState } from 'react';
import StoreInfo from '../StoreInfo/StoreInfo';
import BookList from '../BookList/BookList';
import { sanitizeUrl, getFlagUrl } from '../../utils';
import { COUNTRIES } from '../../constants';
import './styles.scss';

const Store = ({ store, included }) => {
    const [flagUrl, setFlagUrl] = useState('');
    const storeAttributes = store.attributes || {};
    const storeRelationships = store.relationships || {};

    const storeCountries = included.find(inc => inc.type === COUNTRIES && inc.id === storeRelationships.countries?.data?.id)?.attributes || {};
    const sanitizedWebsite = sanitizeUrl(storeAttributes.website);
    useEffect(() => {
        const fetchFlagUrl = async () => {
            const url = await getFlagUrl(storeCountries.code);
            setFlagUrl(url);
        };
        fetchFlagUrl();
    }, [storeCountries.code]);

    const formattedDate = new Date(storeAttributes.establishmentDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    return (
        <div className="store">
            <div className="store-image-container">
                <img className="store-image" src={storeAttributes.storeImage} alt={storeAttributes.name} />
            </div>
            <div className="store-details">
                <StoreInfo store={store} />
                <BookList books={storeRelationships.books?.data || []} included={included} />

            </div>
            <div className="store-footer">
                    <p className="establishment-date">
                        {formattedDate} - <a href={storeAttributes.website} target="_blank" rel="noopener noreferrer">
                        {sanitizedWebsite}</a>
                    </p>
                    <img className="flag" src={flagUrl} alt={storeCountries.code} />
                </div>
        </div>
    );
};

export default Store;
