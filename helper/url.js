module.exports = {
    parseURL: function (urlInRequest) {
        let result = null;

        try {
            const url = require('url');

            const userURL = url.parse(urlInRequest);

            result = userURL.href;
        } catch (error) {
            console.error(error);
        }
        return result;
    }
}