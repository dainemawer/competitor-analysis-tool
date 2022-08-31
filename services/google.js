import fetch from 'isomorphic-unfetch'

/**
 * Google PSI API Request
 * 
 * Sends a collection of requests to PageSpeed Insights
 * using Promise.all
 * 
 * @param {*} props
 * @param {Object} props.data the url to post to PSI
 * @returns void
 */
export const postDataToGooglePSI = async (data) => {
    const endpoint = 'http://localhost:3000/api/pagespeed';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const urls = data.filter(url => url !== '')
        .map(url => fetch(`${endpoint}?url=${encodeURIComponent(url)}`, options));

    const requests = await Promise.all(urls)
    const promises = requests.map((response) => response.json());

    return await Promise.all(promises);
}
