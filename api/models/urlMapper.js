const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const services = require('../../services');

const limit = {
    minlength: 10,
    maxlength: 1024
}

const urlModel = new Schema({
    url: { type: String, required: true, ...limit },
    shortened: { type: String, required: true, ...limit }
}, { timestamps: true });


const dbHelpers = {
    model: mongoose.model('UrlModel', urlModel),
    add: (url) => {
        return new Promise((resolve, reject) => {
            const shortUrl = services.shortener.shortIt(url);
            const newUrl = new dbHelpers.model();
            newUrl.url = url;
            newUrl.shortened = shortUrl;
            newUrl.save((err, newUrlMapper) => {
                if (err) reject(`Add Failed: ${err}`);
                resolve(newUrlMapper.shortened);
            });
        })
    },
    delete: async (id) => {
        await dbHelpers.model.deleteOne({ _id: id });
    },
    get: async (shortUrl) => {
        const urlMapper = await dbHelpers.model.findOne({shortened : shortUrl});
        if(urlMapper)
            return urlMapper.url;
    }
}

module.exports = dbHelpers