import React, { useEffect, useState } from 'react';
import Store from '../Store/Store';
import { getStores } from '../../api';
import './styles.scss';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [included, setIncluded] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getStores();
                setStores(data.data);
                setIncluded(data.included);
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchData();
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
