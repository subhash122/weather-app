import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();


const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState(null);

    return (
        <WeatherContext.Provider
            value={{
                setWeatherData,
                weatherData
            }}
        >
            {children}

        </WeatherContext.Provider>
    );
}
const useWeather = () => useContext(WeatherContext);


export { WeatherProvider, useWeather }