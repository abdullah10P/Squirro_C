import React, { useEffect, useState } from "react";
import StoreInfo from "../StoreInfo/StoreInfo";
import BookList from "../BookList/BookList";
import StoreFooter from "../StoreFooter/StoreFooter";
import { getFlagUrl } from "../../utils/utils";
import { COUNTRIES } from "../../utils/constants";
import "./styles.scss";

const Store = ({ store, included }) => {
  const [flagUrl, setFlagUrl] = useState("");
  const storeAttributes = store.attributes || {};
  const storeRelationships = store.relationships || {};
  

  const storeCountries =
    included.find(
      (inc) =>
        inc.type === COUNTRIES &&
        inc.id === storeRelationships.countries?.data?.id
    )?.attributes || {};
  useEffect(() => {
    const fetchFlagUrl = async () => {
      const url = await getFlagUrl(storeCountries.code);
      setFlagUrl(url);
    };
    fetchFlagUrl();
  }, [storeCountries.code]);

  return (
    <div className="store">
      <div className="store-image-container">
        <img
          className="store-image"
          src={storeAttributes.storeImage}
          alt={storeAttributes.name}
        />
      </div>
      <div className="store-details">
        <StoreInfo store={store} />
        <BookList
          books={storeRelationships.books?.data || []}
          included={included}
        />
      </div>
      <StoreFooter
        establishmentDate={storeAttributes.establishmentDate}
        website={storeAttributes.website}
        flagUrl={flagUrl}
        countryCode={storeCountries.code}
      />
    </div>
  );
};

export default Store;
