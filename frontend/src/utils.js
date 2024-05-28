
import { FLAG_API, FALLBACK_FLAG_API } from './config';

export const sanitizeUrl = (url) => {
    return url.replace(/^https?:\/\//, '');
};

export const getFlagUrl = async (countryCode) => {
    const primaryUrl = `${FLAG_API}/${countryCode}/flat/64.png`;
    const fallbackUrl = `${FALLBACK_FLAG_API}/${countryCode}.svg`;

    try {
        const response = await fetch(primaryUrl, { mode: 'no-cors' });
        if (response.ok || response.type === 'opaque') {
            return primaryUrl;
        }
        throw new Error('Primary URL failed');
    } catch (error) {
        return fallbackUrl;
    }
};
