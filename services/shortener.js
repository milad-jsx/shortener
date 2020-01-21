const http = require('http');
const url = require('url');
const urlValidation = require('valid-url');

const shortener = {
    isURLValid: async function (req, res, next) {
        const userURL = url.parse(req.body.url);
        return (urlValidation.isWebUri(userURL.href));

        //TODO: Check URI existence (for security concerns, for now let's not do this.)
        const options = {
            method: 'HEAD',
            host: url.parse(userURL).host,
            port: 80,
            path: url.parse(userURL).pathname
        }
        return new Promise((resolve, reject) => {
            http.request(options, function (httpResponse) {
                resolve(httpResponse.statusCode === 200 || httpResponse.statusCode === 301);
            }).end();
        });
    },
    isURLValidToReverse: function (req, res, next) {
        const userURL = url.parse(req.params.url);
        if (!userURL) return false;

        return (userURL.pathname.startsWith('ed'));
    }
};

module.exports = shortener;