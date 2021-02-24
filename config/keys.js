const dbUserName = 'userName';
const dbPassword = 'password';
const dbName = 'urlMapper';
const dbUrl = 'mongodb://' + '127.0.0.1' + ':27017';
mongoConnectionString = `${dbUrl}/${dbName}`;

module.exports = {
    dbUrl : mongoConnectionString,
    siteUrl: 'exampleTinyUrl.com'
};