import { useMemo } from "react";
import { useCryptoStrore } from "../context/Store";

function DisplayPrices() {
  const result = useCryptoStrore((state) => state.CryptoPrices);
  const hasResult = useMemo(
    () =>
      Object.values(result).map((cadena) => {
        if (cadena.trim() === "") {
          return false;
        }
        return true;
      }),
    [result]
  );

  return (
    <div className="result-wrapper">
      {hasResult.includes(true) && (
        <>
          <h2>Cotizacion</h2>
          <div className="result">
            <img
              src={`https://cryptocompare.com/${result.IMAGEURL}`}
              alt="img-coin"
            />
            <div>
              <p>
                El precio es de: <span>{result.PRICE}</span>
              </p>
              <p>
                El precio es de: <span>{result.HIGHDAY}</span>
              </p>
              <p>
                El precio es de: <span>{result.LOWDAY}</span>
              </p>
              <p>
                El precio es de: <span>{result.LASTUPDATE}</span>
              </p>
              <p>
                El precio es de: <span>{result.CHANGEPCT24HOUR}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DisplayPrices;
