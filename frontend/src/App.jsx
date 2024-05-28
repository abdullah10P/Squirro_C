import React from 'react';
import StoreList from './components/StoreList/StoreList';
import './styles.scss'; 

const App = () => {
    return (
        <div className="App">
            <main>
                <StoreList data-testid="store-container" />
            </main>
        </div>
    );
};

export default App;