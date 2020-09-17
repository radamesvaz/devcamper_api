const errorHandler = (err, req, res, next) => {
    // mostrando error en consola
    console.log(err.stack.red.bgWhite)

    res
    .status(500)
    .json({
        success: false,
        error: err.message
    })
}

module.exports = errorHandler;