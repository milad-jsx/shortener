'use strict'

const controller = require('./controllers/index');

module.exports = function (app) {
    app.route('/about')
        .get(controller.about);

    app.route('/shorter/:url')
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
                        data: 'Check your input, e.g https://domain.com'
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

            res.json(resultOfOperation);
        });

    app.route('/revert/:url')
        .get(async (req, res, next) => {

            const result = await controller.revertToOriginal(req.params.url);

            if (result.isSucceed)
                res.status(200).json(result.shortenedURL);
            else
                res.status(422).json(false);

        });
};