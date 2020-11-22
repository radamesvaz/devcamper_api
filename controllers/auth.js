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

    //  Creando el token
    const token = user.getSignedJwtToken();

    res.status(201).json({
        success: true,
        token
    })
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

    //  Creando el token
    const token = user.getSignedJwtToken();

    res.status(201).json({
        success: true,
        token
    })
})