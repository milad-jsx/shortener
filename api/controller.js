'use strict'

const properties = require('../package.json');

const controllers = {
    about: function(req, res, next){
        const aboutService = {
            name: properties.name,
            version: properties.version
        }
        res.json(aboutService);
    }
}

module.exports = controllers;