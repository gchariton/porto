import constants from '../config/constants';

const fetchSoccer = async () => {
    try {
        const response = await fetch(
            constants.SOCCER.API_URL,
            constants.SOCCER.OPTIONS
        );
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default fetchSoccer;
