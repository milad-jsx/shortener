const url = require('url');
const urlValidation = require('valid-url');
const shortId = require('shortid');
const { Crypto } = require('../helper');
const Database = require('./inMemoryDatabase');

const shortener = {
    isURLValid: async function (req, res, next) {
        const userURL = url.parse(req.body.url);
        return (urlValidation.isWebUri(userURL.href));
    },
    isURLValidToReverse: function (rawInputURL) {

        const userURL = url.parse(rawInputURL);

        if (!userURL) return false;

        return userURL.href;
    },
    shortIt: async function (originalURL) {

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
    reverseShortenedURL: async function (shortenedURLInput) {

        const customResponse = {
            isSucceeded: false,
            originalURL: null
        };

        if (shortenedURLInput) {

            const originalURL = await Database.Get(shortenedURLInput.shortenedURL);

            customResponse.isSucceeded = true;
            customResponse.originalURL = originalURL;
        }

        return customResponse;
    }
};

module.exports = shortener;