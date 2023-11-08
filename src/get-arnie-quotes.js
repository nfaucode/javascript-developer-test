const { httpGet } = require('./mock-http-interface');


/**
 * Returns a Promise that resolves to an array of result objects. 
 * @param {string[]} urls - Array or URLs to fetch quotes from.
 */
const getArnieQuotes = async (urls) => {
    const requestPromises = urls.map((url) => httpGet(url));
    const responses = await Promise.all(requestPromises);
    return responses.map((response) => transformResponse(response.status, response.body));
};

/**
 * Transforms an Arnie API response into a result object.
 * @param {number} responseStatus - Numeric status code from the Arnie API.
 * @param {string} responseBody - Body string from the Arnie API.
 * @returns {{ 'Arnie Quote': string } | { FAILURE: string }}
 */
const transformResponse = (responseStatus, responseBody) => {
    try {
        const message = JSON.parse(responseBody)?.message ?? '';
        if (responseStatus === 200) {
            return { 'Arnie Quote': message };
        } else {
            return { 'FAILURE': message };
        }
    } catch (err) {
        return { 'FAILURE': 'Invalid response from Skynet' };
    }
};


module.exports = {
    getArnieQuotes,
};
