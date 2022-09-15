const { CustomAPIError } = require('../errors/custom_errors')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res
            .status(err.statuCode)
            .json({ msg: err.message });
    }

    return res
        .status(500)
        .json({ msg: `Something went wrong, try again later` });
}

module.exports = errorHandlerMiddleware
