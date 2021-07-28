const http = require('http');
const url = require('url');
const urlValidation = require('valid-url');
const shortId = require('shortid');
const { Crypto } = require('../helper');

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
    shortIt: function (url) {
        return Crypto.generateUUID
    }
};

module.exports = shortener;