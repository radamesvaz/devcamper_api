const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    // mostrando error en consola
    console.log(err.stack.red.bgWhite)

    // Mongoose mal ObjectId
    if(err.name == 'CastError'){
        const message = `Recurso con id '${err.value}' no encontrado`;
        error = new ErrorResponse(message, 404)
    }

    res
    .status(error.statusCode || 500)
    .json({
        success: false,
        error: error.message || 'Error del Servidor'
    })
}

module.exports = errorHandler;