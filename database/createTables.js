const providersTable = require('./model/Provider');

providersTable
    .sync()
    .then(() => console.log('Providers table successfully created'))
    .catch((error) => console.log(error));