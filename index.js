const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const HttpStatus = require('./responses/HttpStatus');

app.use((req, res, next) => {
    const format = req.header('Content-Type');

    if (format !== 'application/json') {
        res.status(HttpStatus.not_accepted).json({message: 'This API only accept Json requests'});
        return;
    }

    next();
});

app.use(bodyParser.json());

const router = require('./routes/providers');
app.use('/api/providers', router);

app.use((error, req, res, next) => {
    console.log(error);
    if(error.status === undefined) {
        res.status(HttpStatus.internal_error).json({message: 'Internal Server Error'});
        return;
    }

    res.status(error.status).json({message: error.message});
});

app.listen(config.get('app.port'), () => {
    console.log('API Running');
});