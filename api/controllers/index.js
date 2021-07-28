const shorter = require('./shorter');

const controllers = {
    about: require('./about'),
    makeItShorter: shorter.makeItShorter,
    revertToOriginal: shorter.revertToOriginal
}

module.exports = controllers;