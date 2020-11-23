const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('./async');

//  Protegiendo las rutas
exports.protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

  /*  else if(req.cookies.token){
        token = req.cookies.token
    } */

    if(!token){
        return next(new ErrorResponse(`No esta autorizado para acceder esta ruta`, 401));
    }

    try {
        // verificando el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        return next(new ErrorResponse(`No esta autorizado para acceder esta ruta`, 401));
    }
})