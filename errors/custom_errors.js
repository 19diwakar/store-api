class CustomAPIError extends Error {
    constructor(message, statuCode) {
        super(message, statusCode);
        this.statuCode = statuCode;
    }
}

const createCustomError = (msg, statusCode) => {
   return  CustomAPIError(msg, statusCode);
}

module.exports = {createCustomError, CustomAPIError}