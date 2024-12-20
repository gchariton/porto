import { parse } from 'react-native-rss-parser';
import axios from 'axios';
import feed from '../config/feed';

export const fetchNews = async (
    setSortedFeed,
    setRefreshing,
    setShowActivityIndicator
) => {
    try {
        const fetchRequests = feed.news.map(async (url) => {
            try {
                const response = await axios.get(url);
                const parsed = await parse(response.data);
                return parsed.items.slice(0, 20);
            } catch (err) {
                console.error(`Error fetching RSS feed from ${url}:`, err);
                return [];
            }
        });

        const results = await Promise.allSettled(fetchRequests);
        const successfulResults = results
            .filter((result) => result.status === 'fulfilled')
            .map((result) => result.value)
            .flat();

        const mergedFeed = successfulResults.sort(
            (a, b) =>
                new Date(b.published).getTime() -
                new Date(a.published).getTime()
        );

        setSortedFeed(mergedFeed);
    } catch (err) {
        console.error(
            'Unexpected error while fetching or parsing RSS feeds:',
            err
        );
    } finally {
        setRefreshing(false);
        setShowActivityIndicator(false);
    }
};
