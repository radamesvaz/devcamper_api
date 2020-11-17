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
})