const { expect } = require('chai');

describe('.'.repeat(30) + ' Shortener ' + '.'.repeat(30), function () {

    describe('.'.repeat(30) + ' Helper ' + '.'.repeat(30), function () {

        it('should create a random UUID', async () => {
            const { Crypto } = require('../helper');
            const uuid = Crypto.generateUUID;
            expect(uuid).not.be.null;
            expect(uuid).not.be.undefined;
        });

        it('should shorten a url reversibly', async () => {
            const { ShortenerService } = require('../services');

            const originalURL = 'www.example.com';

            const shortenedURLResponse = await ShortenerService.shortIt(originalURL);
            expect(shortenedURLResponse.isSucceeded).to.be.true;
            expect(shortenedURLResponse.shortenedURL).to.not.be.null;

            const reversedURL = await ShortenerService.reverseShortenedURL(shortenedURLResponse);
            expect(reversedURL.isSucceeded).to.be.true;
            expect(reversedURL.originalURL).to.not.be.null;
            expect(reversedURL.originalURL).to.be.equal(originalURL);
        });

    })

});