const express = require('express');
const app = express();
const port = 3003;

const routes = require('./api/routes');
routes(app);

app.listen(port, function () {
    console.log('Shorter service started listening on port: ', port);
})