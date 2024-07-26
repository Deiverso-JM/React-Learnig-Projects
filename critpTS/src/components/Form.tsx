import React, { ChangeEvent, useState } from "react";
import { currencies } from "../data";
import { useCryptoStrore } from "../context/Store";
import { Currency, Pair } from "../types";
import Error from "./Error";
function Form() {
  const CryptoCurrencies = useCryptoStrore((state) => state.CryptoCurrencies);
  const CryptoData = useCryptoStrore((state) => state.fetchData);

  const [pair, setPair] = useState<Pair>({
    currency: "",
    criptocurrency: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPair({
      ...pair,
      [e.target.name]: e.target.value,
    });
  };

  const  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(pair).includes("")) {
      return setError("Debes seleccionar todos los campos");
    }

    
    setError("");
    
    //Consultar la api
     CryptoData(pair);

  };

  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      {error && <Error>{error}</Error>}
      <div className="field">
        <label htmlFor="currency">Moneda:</label>
        <select
          name="currency"
          id="currency"
          onChange={(e) => handleChange(e)}
          value={pair.currency}
        >
          <option value=""> -- Seleccione una opcion --</option>
          {currencies.map((currecy: Currency) => (
            <option key={currecy.code} value={currecy.code}>
              {currecy.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="criptocurrency">Cryptomoneda:</label>
        <select
          name="criptocurrency"
          id="criptocurrency"
          onChange={(e) => handleChange(e)}
          value={pair.criptocurrency}
        >
          <option value=""> -- Seleccione una opcion --</option>
          {CryptoCurrencies.map((crypto) => (
            <option key={crypto.CoinInfo.FullName} value={crypto.CoinInfo.Name}>
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" className="" value="cotizar" />
    </form>
  );
}

export default Form;
