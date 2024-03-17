import { FormControl, Spinner, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { toast } from "react-toastify";
import axios from "axios";
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { setWeatherData } = useWeather();
    const navigate = useNavigate();
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);

    const filterWeatherResponse = (weatherResponse) => {
        let weatherObj = {
            temprature: weatherResponse.data?.main?.temp,
            feels_like: weatherResponse.data?.main?.feels_like,
            humidity: weatherResponse.data?.main?.humidity,
            weather_description: weatherResponse.data?.weather[0]?.description,
            place: `${weatherResponse.data?.name}, ${weatherResponse.data?.sys?.country}`,
            icon: weatherResponse.data?.weather[0]?.icon,
        }
        setWeatherData(weatherObj);
    }

    /*
    fetches the weather data based on from input.
    */
    const getWeatherData = async () => {
        if (city) {
            setLoading(true);
            const apiKey = process.env.REACT_APP_apiKey;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            try {
                const weatherResponse = await axios.get(url);
                filterWeatherResponse(weatherResponse);
                navigate('/details');
            } catch (error) {
                toast.error(error?.response?.data?.message ?? 'something went wrong. please try again later');
            } finally {
                setLoading(false);
            }
        }
    }

    /*
     fetches weather data based on location cordinates
     */
    const getDataUsingCordinates = async (lat, lon) => {
        setLoading(true);
        const apiKey = process.env.REACT_APP_apiKey;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        try {
            const weatherResponse = await axios.get(url);
            filterWeatherResponse(weatherResponse);
            navigate('/details');
        } catch (error) {
            toast.error(error?.response?.data?.message ?? 'something went wrong. please try again later');
        } finally {
            setLoading(false);
        }
    }

    const onSuccess = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude)
        getDataUsingCordinates(latitude, longitude);
    }

    const onError = (err) => {
        toast.error(err?.message ?? 'something went wrong. please try again later');
    }

    const getLocation = () => {
        if (window.navigator.geolocation) {
            //check if user has given access to location 
            window.navigator.permissions.query({ name: "geolocation" })
                .then(function (result) {

                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, });
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, });
                    } else if (result.state === "denied") {
                        //If denied then warn user to share location
                        toast.warn('Please allow access to the location');
                    }
                })
        } else {
            toast.error("Device does not support location");
        }
    }
    return (
        <div className={styles.container}>
            <Card className={styles.item}>
                <Card.Header className={styles.header}>Weather App</Card.Header>
                <Card.Body>
                    {
                        loading ? <div className='d-flex justify-content-center mt-3'>
                            <Spinner animation="border" variant='primary'></Spinner>
                        </div> :
                            <>
                                <div className='d-flex mt-2 mb-3'>
                                    <FormControl placeholder='Enter city name' value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        onKeyDown={(event) => event.key === 'Enter' ? getWeatherData() : null}></FormControl>
                                    <Button variant='primary' onClick={getWeatherData}>
                                        <i className="bi bi-arrow-right"></i>
                                    </Button>
                                </div>
                                <div className={`${styles.divider} mt-2 mb-2 border-top`}></div>
                                <Button className="mt-3 w-100" variant="primary" onClick={getLocation}>Get Location</Button>
                            </>
                    }
                </Card.Body>
            </Card>
        </div>
    )
}


export { Home }
