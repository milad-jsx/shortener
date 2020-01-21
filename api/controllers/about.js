const properties = require('../../package.json');

const about = function (req, res, next) {
    const aboutService = {
        name: properties.name,
        version: properties.version
    }
    res.json(aboutService);
}

module.exports = about;