const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { dbUrl } = require('./config/keys');

const app = express();
const port = 3003;

mongoose.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true });

const routes = require('./api/routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);


app.listen(port, function () {
    console.log('Shorter service started listening on port: ', port);
})