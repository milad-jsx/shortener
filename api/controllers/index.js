'use strict'

const about = require('./about');
const shorter = require('./shorter');


const controllers = {
    about: about,
    makeItShorter: shorter.makeItShorter,
    revertToOriginal: shorter.revertToOriginal
}

module.exports = controllers;