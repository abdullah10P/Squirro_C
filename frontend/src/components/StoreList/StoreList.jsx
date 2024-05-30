import React, { useEffect, useState } from 'react';
import Store from '../Store/Store';
import { getStores } from '../../services/apiService';
import './styles.scss';
import {ERROR_FETCHING_DATA} from '../../utils/constants';

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
                alert(ERROR_FETCHING_DATA);
                console.error(ERROR_FETCHING_DATA, error);
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
