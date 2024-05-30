import React from "react";
import "./styles.scss";
import { STAR_FILLED, STAR_EMPTY } from "../../utils/constants";

const StoreInfo = ({ store }) => {
  const storeAttributes = store.attributes;

  const ratingStars = [];
  for (let i = 0; i < storeAttributes.rating; i++) {
    ratingStars.push(
      <span key={i} className="star">
        {STAR_FILLED}
      </span>
    );
  }
  for (let i = storeAttributes.rating; i < 5; i++) {
    ratingStars.push(
      <span key={i} className="star">
        {STAR_EMPTY}
      </span>
    );
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
