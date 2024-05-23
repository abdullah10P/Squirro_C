// src/components/StoreList.jsx

import React, { useEffect, useState } from 'react';
import Store from './Store';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [included, setIncluded] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/stores')
            .then(response => response.json())
            .then(data => {
                setStores(data.data);
                setIncluded(data.included);
            });
    }, []);

    return (
        <div className="store-container">
            {stores.map(store => (
                <Store key={store.id} store={store} included={included} />
            ))}
        </div>
    );
};

export default StoreList;
