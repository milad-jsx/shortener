const { expect } = require('chai');

describe('.'.repeat(30) + ' Shortener ' + '.'.repeat(30), function () {

    describe('.'.repeat(30) + ' Helper ' + '.'.repeat(30), function () {

        it('should create a random UUID', async () => {
            const { Crypto } = require('../helper');
            const uuid = Crypto.generateUUID;
            expect(uuid).not.be.null;
            expect(uuid).not.be.undefined;
        });

    })

});