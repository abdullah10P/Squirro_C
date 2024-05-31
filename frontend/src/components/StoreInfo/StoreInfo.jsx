import React from "react";
import "./styles.scss";
import { STAR_FILLED, STAR_EMPTY,STAR_COUNT } from "../../utils/constants";

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
  for (let i = storeAttributes.rating; i < STAR_COUNT; i++) {
    ratingStars.push(
      <span key={i} className="star">
        {STAR_EMPTY}
      </span>
    );
  }

  return (
    <div className="store-info">
      <div className="store-header">
        <h2>{storeAttributes.name}</h2>
        <div className="rating">{ratingStars}</div>
      </div>
    </div>
  );
};

export default StoreInfo;
