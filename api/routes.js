'use strict'

const controller = require('./controllers/index');

module.exports = function (app) {
    app.route('/about')
        .get(controller.about);

    app.route('/encode/:url')
        .get(async (req, res, next) => {

            let resultOfOperation = {
                status: 422,
                data: null
            };

            try {

                const userInput =  /* some validations */ req.params.url;

                const result = await controller.makeItShorter(userInput);
                if (result.isSucceed) {

                    resultOfOperation = {
                        status: 200,
                        data: result.shortenedURL //`${siteUrl}/${shortUrl}`
                    }

                } else {

                    resultOfOperation = {
                        status: 422,
                        data: 'Check your input, it should be like domainName.domainsuffixes.'
                    }

                }
            }
            catch (error) {
                resultOfOperation = {
                    status: 500,
                    data: 'Error, please try again.'
                }
                console.error(error);
            }

            res.status(resultOfOperation.status).json(resultOfOperation.data);
        });

    app.route('/decode/:url')
        .get(async (req, res, next) => {

            let resultOfOperation = {
                status: 422,
                data: false
            };

            try {

                const result = await controller.revertToOriginal(req.params.url);

                if (result.isSucceed)
                    resultOfOperation = {
                        status: 200,
                        data: result.shortenedURL
                    }
            }
            catch (error) {
                resultOfOperation = {
                    status: 500,
                    data: 'Error, please try again.'
                }
                console.error(error);
            }
            res.status(resultOfOperation.status).json(resultOfOperation.data);
        });
};