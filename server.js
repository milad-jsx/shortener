const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

const swaggerUI = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');
app.use(
    '/docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDocument)
);

const routes = require('./api/routes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);


app.listen(port, function () {
    console.log('Shorter service started listening on port: ', port);
})