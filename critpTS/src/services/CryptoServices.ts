import axios from 'axios'
import { CryptoCurrenciesResponseShema, CryptoPriceSchema } from '../shemas/Shema-crypto'
import { Pair } from '../types'

export async function getCryptos() {
    const url = 'AQUI PONER API KEY'
    const { data: { Data } } = await axios(url)
    const result = CryptoCurrenciesResponseShema.safeParse(Data)
    if (result.success) {
        return result.data
    }

    return

}


export async function getData(pair : Pair) {
    const url = `AQUI PONER API KEY`
    const {data: {DISPLAY} } = await axios(url)
    const result = CryptoPriceSchema.safeParse(DISPLAY[pair.criptocurrency][pair.currency])
    if(result.success){
        return result.data
    }

    return
}