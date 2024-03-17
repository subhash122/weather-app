import Card from 'react-bootstrap/Card';
import styles from './index.module.css'
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';

const WeatherDetails = () => {
    const { weatherData } = useWeather();
    const navigator = useNavigate();

    const navigateToHome = () => {
        navigator('/')
    }

    return (
        <div className={styles.container}>
            <Card className={styles.item}>
                <Card.Header className={styles.header}>
                    <i className={`${styles.pointer} bi bi-arrow-left me-2`} onClick={navigateToHome}></i>Weather App
                </Card.Header>
                <Card.Body>
                    <div className='d-flex justify-content-center'>
                        <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt='weather-icon'></img>
                    </div>
                    <h2 className='fw-bold fs-1 text-center'>{weatherData.temprature}°C</h2>
                    <p className='text-center fw-medium'>{weatherData.weather_description}</p>
                    <div className='d-flex justify-content-center '>
                        <i className="bi bi-geo-alt me-2"></i>
                        <p>{weatherData.place}</p>
                    </div>
                </Card.Body>
                <Card.Footer className="d-flex p-0">
                    <div className={`${styles.footer} p-2 border-start d-flex justify-content-center`}>
                        <i className="bi bi-thermometer me-1" style={{ color: '#45a2ff' }}></i>
                        <div>
                            <p className='m-0 lh-1 fw-semibold'> {weatherData.feels_like}°C</p >
                            <p className={`${styles.littleFont} m-0 lh-1`}>Feels Like</p>
                        </div>
                    </div>
                    <div className={`${styles.footer} p-2 border-start d-flex justify-content-center`}>
                        <i className="bi bi-moisture me-1" style={{ color: '#45a2ff' }}></i>
                        <div>
                            <p className='m-0 lh-1 fw-semibold'> {weatherData.humidity}%</p >
                            <p className={`${styles.littleFont} m-0 lh-1`}>Humidity</p>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </div>
    )
}
export { WeatherDetails }
