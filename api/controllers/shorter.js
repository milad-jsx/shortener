const { ShortenerService } = require('../../services');
const { siteUrl } = require('../../config/keys');
const { URL } = require('../../helper');
const { MongoDBHelper, InMemoryDatabase } = require('../../services/');

const shorter = {
    makeItShorter: async function (inputURL) {

        let result = {
            isSucceed: false,
            shortenedURL: null
        };

        try {

            const userSanitizedURL = URL.parseURL(inputURL);

            const shortenerServiceResult = await ShortenerService.shortIt(userSanitizedURL);

            if (shortenerServiceResult) {
                const shortUrl = await InMemoryDatabase.Save(shortenerServiceResult.shortenedURL, userSanitizedURL);
                result.isSucceed = true;
                result.shortenedURL = `${siteUrl}/${shortenerServiceResult.shortenedURL}`;
            }
        }
        catch (error) {
            console.error(error);
        }
        return result;
    },
    revertToOriginal: async function (shortenedURL) {
        let result = {
            isSucceed: false,
            shortenedURL: null
        };

        try {
            const isValid = await ShortenerService.isURLValidToReverse(shortenedURL);

            if (isValid) {

                const originalUrl = await InMemoryDatabase.Get(shortenedURL);

                if (originalUrl) {
                    result.isSucceed = true;
                    result.shortenedURL = originalUrl
                }

            }
        }
        catch (error) {
            console.error(error);
        }
        return result;
    }
}

module.exports = shorter;