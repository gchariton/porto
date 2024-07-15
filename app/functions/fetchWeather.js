import axios from 'axios';
import constants from '../config/constants';

const fetchWeather = async (latitude, longitude) => {
    try {
        const response = await axios.get(
            `${constants.WEATHER.API_URL}latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&timezone=auto`
        );

        const { data } = response;
        return data;
    } catch (error) {
        console.error('[weatherService.js] Error fetching weather:', error);
        throw error;
    }
};

export default fetchWeather;
