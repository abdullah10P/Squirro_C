import React from "react";
import { sanitizeUrl } from "../../utils/utils";

const StoreFooter = ({ establishmentDate, website, flagUrl, countryCode }) => {
  const formattedDate = new Date(establishmentDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const sanitizedWebsite = sanitizeUrl(website);

  return (
    <div className="store-footer">
      <p className="establishment-date">
        {formattedDate} -{" "}
        <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">
          {sanitizedWebsite}
        </a>
      </p>
      <img className="flag" src={flagUrl} alt={countryCode} />
    </div>
  );
};

export default StoreFooter;
