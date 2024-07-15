import fetchRadio from './fetchRadio';

const handlePlayPause = async (
    sound,
    setSound,
    setIsPlaying,
    setIsBuffering,
    station
) => {
    setIsBuffering(true);
    if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
            await sound.pauseAsync();
            setIsPlaying(false);
        } else {
            await sound.unloadAsync();
            const newSound = await fetchRadio(station.url);
            setSound(newSound);
            await newSound.playAsync();
            setIsPlaying(true);
        }
    } else {
        const newSound = await fetchRadio(station.url);
        setSound(newSound);
        await newSound.playAsync();
        setIsPlaying(true);
    }
    setIsBuffering(false);
};

export default handlePlayPause;
