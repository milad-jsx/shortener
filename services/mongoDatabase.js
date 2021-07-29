const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const services = require('./shortener');

const limit = {
    minlength: 10,
    maxlength: 1024
}

const urlModel = new Schema({
    url: { type: String, required: true, ...limit },
    shortened: { type: String, required: true, ...limit }
}, { timestamps: true });


const mongoDbHelpers = {
    model: mongoose.model('UrlModel', urlModel),
    connect: async () => {
        try {
            const { dbUrl } = require('../config/keys');

            await mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });
            console.log('MongoDB Connected');
        }
        catch (error) {
            console.error('MongoDB Connection failed');
        }
    }, 
    add: (url) => {
        return new Promise((resolve, reject) => {

            const shortUrl = services.shortIt(url);

            const newUrl = new mongoDbHelpers.model();
            newUrl.url = url;
            newUrl.shortened = shortUrl;

            newUrl.save((err, newUrlMapper) => {

                if (err) reject(`Add Failed: ${err}`);

                resolve(newUrlMapper.shortened);
            });
        })
    },
    delete: async (id) => {
        await mongoDbHelpers.model.deleteOne({ _id: id });
    },
    get: async (shortUrl) => {
        const urlMapper = await mongoDbHelpers.model.findOne({ shortened: shortUrl });
        if (urlMapper)
            return urlMapper.url;
        return null;
    }
}

module.exports = mongoDbHelpers;
