'use strict'

const controller = require('./controllers/index');

module.exports = function (app) {
    app.route('/about')
        .get(controller.about);
};