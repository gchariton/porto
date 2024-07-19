import axios from 'axios';
import constants from '../config/constants';

const authenticateUser = async (user, pass) => {
    if (user !== '' && pass !== '') {
        try {
            const response = await axios.post(
                constants.AUTH.API_URL,
                {
                    identifier: user,
                    password: pass,
                },
                {
                    headers: {
                        Origin: constants.AUTH.ORIGIN,
                    },
                }
            );

            if (response.status === 200) {
                console.log('Authentication successful');
                const jwtToken = response.data.jwt;
                return jwtToken;
            } else {
                console.log('Authentication failed:', response.data);
                return null;
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            return null;
        }
    } else {
        console.log('Username or Password fields cannot be empty');
        return null;
    }
};

export default authenticateUser;
