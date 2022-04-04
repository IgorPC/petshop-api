const HttpStatus = require('./HttpStatus');

class ApiError extends Error {
    constructor(message, status = HttpStatus.bad_request) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

module.exports = ApiError;