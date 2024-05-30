import React from "react";
import StoreList from "./components/StoreList/StoreList";
import "./styles.scss";

const App = () => {
  return (
    <div className="App">
      <StoreList data-testid="store-container" />
    </div>
  );
};

export default App;
