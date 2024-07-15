AUTH = {
    API_URL: 'https://api-dev.laiki.eu/auth/local',
    ORIGIN: 'https://wms-dev.laiki.eu',
};

CRYPTO = {
    API_KEY: 'b0a5949f-b36c-479d-8cae-633c92223b01',
    API_URL:
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=200',

    COININFO: 'https://www.coingecko.com/en/coins/',
};

const RADIOSTATIONS = [
    { name: 'ΣΚΑΪ', url: 'http://netradio.live24.gr:80/skai1003' },
    { name: 'ΠΑΡΑΠΟΛΙΤΙΚΑ', url: 'http://netradio.live24.gr/athinaradio' },
    { name: 'ΕΡΑΣΠΟΡ', url: 'http://radiostreaming.ert.gr/ert-erasport' },
    { name: 'SPORT FM', url: 'http://www.gointernet.gr:8005/' },
    { name: 'ΜΕΛΩΔΙΑ', url: 'https://stream.rcs.revma.com/melodia992' },
    { name: 'ΔΕΥΤΕΡΟ', url: 'http://radiostreaming.ert.gr/ert-deftero' },
    { name: 'KISS FM', url: 'https://s6.onweb.gr:7029/' },
    { name: 'MANCODE', url: 'https://sheepfish.radioca.st/stream' },
];

SOCCER = {
    API_URL: 'https://v3.football.api-sports.io/teams?league=197&season=2023',

    OPTIONS: {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'fe1358836efa86e4a36af1a429a16456',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        },
    },
};

WEATHER = {
    API_URL: 'https://api.open-meteo.com/v1/forecast?',
};

export default {
    AUTH,
    CRYPTO,
    RADIOSTATIONS,
    SOCCER,
    WEATHER,
};
