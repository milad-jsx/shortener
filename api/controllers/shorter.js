const services = require('../../services');
const models = require('../models');
const { siteUrl } = require('../../config/keys');

const shorter = {
    makeItShorter: async function (req, res, next) {
        try {
            const userUrl = await services.shortener.isURLValid(req, res, next);

            if (userUrl) {
                const shortUrl = await models.urlMapper.add(userUrl);
                res.status(200).json(`${siteUrl}/shorter/${shortUrl}`);
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
            const userUrl = await services.shortener.isURLValidToReverse(req, res, next);

            if (userUrl) {
                const originalUrl = await models.urlMapper.get(userUrl);
                res.status(200).json(originalUrl);
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