import styles from "./App.module.css";
import Form from "./components/Form/Form";
import useWeather from "./hooks/useWeather";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import Loading from "./components/Loading/Loading";
import Alert from "./components/Alert/Alert";

function App() {
  const { fecthWeather, weather, notFound, hasWeatherData, loading } = useWeather();

  return (
    <>
      <h1 className={styles.title}>Buscador de Clima</h1>
      <div className={styles.container}>
        <Form fecthWeather={fecthWeather} />
        {loading && <Loading/>}
        {hasWeatherData && !loading && <WeatherDetail weather={weather} />}
        {notFound && <Alert>Ciudad no encontrada</Alert>}
      </div>
    </>
  );
}

export default App;
