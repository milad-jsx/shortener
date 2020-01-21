const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3003;

mongoose.connect('mongodb://127.0.0.1:27017/urlMapper', {useUnifiedTopology: true, useNewUrlParser: true});

const routes = require('./api/routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);


app.listen(port, function () {
    console.log('Shorter service started listening on port: ', port);
})