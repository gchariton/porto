import axios from 'axios';
import constants from '../config/constants';

export const fetchCryptoList = async (setCoinData, setRefreshing) => {
    try {
        setRefreshing(true);
        const response = await axios.get(constants.CRYPTO.API_URL, {
            headers: {
                'X-CMC_PRO_API_KEY': constants.CRYPTO.API_KEY,
            },
        });

        const { data } = response.data;
        setCoinData(data);
    } catch (err) {
        console.error('Error fetching crypto list:', err);
    } finally {
        setRefreshing(false);
    }
};
