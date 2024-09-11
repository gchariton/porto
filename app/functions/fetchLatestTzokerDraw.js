import axios from 'axios';
import constants from '../config/constants';

const fetchLatestTzokerDraw = async () => {
    try {
        const response = await axios.get(constants.TZOKER.API_URL);
        const { data } = response;
        return data;
    } catch (error) {
        console.error(
            '[tzokerDrawService.js] Error fetching latest tzoker draw:',
            error
        );
        throw error;
    }
};

export default fetchLatestTzokerDraw;
