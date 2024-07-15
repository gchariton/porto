import { Audio } from 'expo-av';

const fetchRadio = async (url) => {
    const { sound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
    );
    return sound;
};

export default fetchRadio;
