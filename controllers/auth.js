const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

//  @descripcion        Registro de un usuario
//  @ruta / route       POST api/v1/auth/register
//  @acceso             Publica
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    //  Creando el usuario
    const user = await User.create({
        name,
        email,
        password,
        role
    });

    sendTokenResponse(user, 201, res)
});

//  @descripcion        Login de un usuario
//  @ruta / route       POST api/v1/auth/login
//  @acceso             Publica
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorResponse('Por favor complete los campos', 400))
    }


    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return next(new ErrorResponse('Credenciales invalidas', 401))
    }

    const isMatch = await user.comparePasswords(password);

    if(!isMatch){
        return next(new ErrorResponse('Credenciales invalidas', 401))
    }

    sendTokenResponse(user, 200, res)
});




//  Obteniendo el token, creando un cookie y enviando la respuesta
const sendTokenResponse = (user, statusCode, res) => {
    //  Creando el token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        })
}