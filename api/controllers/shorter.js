const services = require('../../services/index');

const shorter = {
    makeItShorter: async function (req, res, next) {
        try {
            const checkUrl = await services.shortener.isURLValid(req, res, next);

            if (checkUrl) {
                //TODO Make it shorter
                res.status(200).json('short url');
            }
            else {
                res.status(422).json('Check your input, e.g https://domain.com');
            }
        }
        catch (err) {
            errorHandler(err, res);
        }
    },
    revertToOriginal: async function (req, res, next) {
        try {

            const checkUrl = await services.shortener.isURLValidToReverse(req, res, next);

            //TODO back to Original

            if (checkUrl) {
                res.status(200).json('long url');
            }
            else {
                res.status(422).json('Where did you get the link? Sorry, it does\'nt look valid!');
            }
        }
        catch (err) {
            errorHandler(err, res);
        }
    }
}

function errorHandler(err, res) {
    //TODO Log properly
    console.log(`Error: ${err}`);
    res.status(500).json(`Sorry, Please try again, something went wrong on my side!`);
}

module.exports = shorter;