class HttpStatus {
    constructor() {
        this.success = 200;
        this.bad_request = 400;
        this.not_found = 404;
        this.internal_error = 500;
        this.not_accepted = 406;
    }
}

module.exports = new HttpStatus();