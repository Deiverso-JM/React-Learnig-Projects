import { z } from 'zod'
import { CurrencySchema, CryptoCurrencyResponseShema, PairShema, CryptoPriceSchema } from '../shemas/Shema-crypto'

export type Currency = z.infer<typeof CurrencySchema>
export type CryptoCurrency = z.infer<typeof CryptoCurrencyResponseShema>
export type Pair = z.infer<typeof PairShema>
export type CryptoPrice = z.infer<typeof CryptoPriceSchema>