import axios from "axios"
import { SearchType } from "../types"
import { object, string, number, InferOutput, parse } from "valibot"
import { useMemo, useState } from "react"

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })
    
    const [loading, setLoading] = useState(false)

    const [notFound, setNotFound] = useState(false)




    const WeatherShema = object({
        name: string(),
        main: object({
            temp: number(),
            temp_max: number(),
            temp_min: number()
        })
    })

    type Weather = InferOutput<typeof WeatherShema>


    const fecthWeather = async (search: SearchType) => {
        setLoading(true)
        try {
            //Primera consulta
            const keyApi = import.meta.env.VITE_API_KEY
            const gUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${keyApi}`
            const { data } = await axios(gUrl)

            if(data.length <= 0){
                setLoading(false)
                setNotFound(true)
                return
            }


            //Segunda consulta
            const { lon, lat } = data[0]
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keyApi}`

            //Validacion con valibot
            const { data: weatherData } = await axios(weatherUrl)
            const result = parse(WeatherShema, weatherData)

            if (result) {
                setWeather(result)
            }

            console.log(result)

        } catch (error) {
            console.log(error)
        }finally{
            setTimeout(() => {
                setLoading(false)
                
            }, 2000);
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        fecthWeather,
        weather,
        hasWeatherData,
        loading,
        notFound

        
    }
}