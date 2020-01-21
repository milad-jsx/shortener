'use strict'

const controller = require('./controllers/index');

module.exports = function (app) {
    app.route('/about')
        .get(controller.about);

    app.route('/')
        .post(controller.makeItShorter);

    app.route('/:url')
        .get(controller.revertToOriginal);

    app.route('/')
        .get((req, res, next) => {
            res.status(422).json('pass the URL please');
        })
};