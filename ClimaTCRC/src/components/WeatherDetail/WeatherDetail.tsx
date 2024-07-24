import { Weather } from "../../types";
import { formatTemperature } from "../../utils";
import styes from './WeatherDetail.module.css'

type WeatherDetailProps = {
  weather: Weather;
};

function WeatherDetail({ weather }: WeatherDetailProps) {
  return (
    <div className={styes.container}>
      <h2>Clima de: {weather.name}</h2>
      <p className={styes.current}>{formatTemperature(weather.main.temp)}&deg;C</p>
      <div className={styes.temperatures}>
        <p>
          Min: <span>{formatTemperature(weather.main.temp_min)}&deg;C </span>{" "}
        </p>
        <p>
          Max: <span> {formatTemperature(weather.main.temp_max)}&deg;C</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherDetail;
