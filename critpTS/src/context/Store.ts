import { devtools } from "zustand/middleware";
import { create } from "zustand";
import { CryptoCurrency, CryptoPrice, Pair } from "../types";
import { getCryptos, getData } from "../services/CryptoServices";
type CryotoStore = {
    CryptoCurrencies: CryptoCurrency[];
    fetchCryptos: () => Promise<void>;
    fetchData: (pair: Pair) => Promise<void>;
    CryptoPrices: CryptoPrice;
    Loading: boolean;
};

export const useCryptoStrore = create<CryotoStore>()(
    devtools((set) => ({
        CryptoCurrencies: [],
        CryptoPrices: {} as CryptoPrice,
        Loading: false,


        fetchCryptos: async () => {
            const CryptoCurrencies = await getCryptos();
            set(() => ({
                CryptoCurrencies
            }));
        },



        fetchData: async (Pair) => {
            set(() => ({
                Loading: true
            }))

            const dataPrices = await getData(Pair)
            setTimeout(() => {
                set(() => ({
                    CryptoPrices: dataPrices,
                    Loading: false
                }))   
            }, 1000);
      

        },



    }))


);
