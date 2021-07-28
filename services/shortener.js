const url = require('url');
const urlValidation = require('valid-url');
const shortId = require('shortid');
const { Crypto } = require('../helper');
const { Database } = require('./index');

const shortener = {
    isURLValid: async function (req, res, next) {
        const userURL = url.parse(req.body.url);
        return (urlValidation.isWebUri(userURL.href));
    },
    isURLValidToReverse: function (req, res, next) {
        const userURL = url.parse(req.params.url);
        if (!userURL || !shortId.isValid(userURL.href)) return false;

        // ed is just a simple prefix; nothing especial;
        return (userURL.pathname.startsWith('ed') && userURL.href);
    },
    shortIt: function (originalURL) {

        const customResponse = {
            isSucceeded: false,
            shortenedURL: null
        };

        if (!originalURL) {
            customResponse.isSucceeded = false;
        } else {

            const randomUUID = Crypto.generateUUID;
            const saveResult = await Database.Save(randomUUID, originalURL);

            if (saveResult) {
                customResponse.isSucceeded = true;
                customResponse.shortenedURL = randomUUID;
            }
        }

        return customResponse;
    },
    reverseShortenedURL: function (shortenedURLInput) {

        const customResponse = {
            isSucceeded: false,
            originalURL: null
        };

        if (originalURL) {

            const originalURL = await Database.Get(shortenedURLInput);

            customResponse.isSucceeded = true;
            customResponse.originalURL = originalURL;
        }

        return customResponse;
    }
};

module.exports = shortener;