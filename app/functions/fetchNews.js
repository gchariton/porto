import { parse } from 'react-native-rss-parser';
import axios from 'axios';

import feed from '../config/feed';

export const fetchNews = async (
    setSortedFeed,
    setRefreshing,
    setIsProgressHidden
) => {
    try {
        const fetchRequests = feed.news.map(async (url) => {
            const response = await axios.get(url);
            const parsed = await parse(response.data);
            return parsed.items.slice(0, 20);
        });
        const results = await Promise.all(fetchRequests);
        const mergedFeed = results
            .flat()
            .sort(
                (a, b) =>
                    new Date(b.published).getTime() -
                    new Date(a.published).getTime()
            );
        setSortedFeed(mergedFeed);
    } catch (err) {
        console.error('Error fetching or parsing RSS feeds:', err);
    } finally {
        setRefreshing(false);
    }
};
