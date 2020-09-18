const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp')


//  @descripcion        Muestra todos los bootcamps
//  @ruta / route       GET api/vi/bootcamps
//  @acceso             Publica
exports.getBootcamps = asyncHandler( async (req, res, next) => {
        const bootcamp = await Bootcamp.find();
        res
        .status(200)
        .json({
            success: true,
            count: bootcamp.length,
            data: bootcamp
        })
});

//  @descripcion        Muestra un solo bootcamp
//  @ruta / route       GET api/vi/bootcamps/:id
//  @acceso             Publica
exports.getBootcamp = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
        const bootcamp = await Bootcamp.findById(id)
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp no encontrado, id: ${id}`, 404))
        }
        res
        .status(200)
        .json({
            success: true,
            data: bootcamp
        })
})

//  @descripcion        Crea un Bootcamp
//  @ruta / route       POST api/vi/bootcamps
//  @acceso             Privada
exports.createBootcamp = asyncHandler( async (req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body);
        res
        .status(201)
        .json({
            success: true,
            data: bootcamp
        })
});

//  @descripcion        Modifica un bootcamp
//  @ruta / route       PUT api/vi/bootcamps/:id
//  @acceso             Privada
exports.updateBootcamps = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
        const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp no encontrado, id: ${id}`, 404))
        }
        res
        .status(200)
        .json({
            success: true,
            data: bootcamp
        })

});

//  @descripcion        Elimina un bootcamp
//  @ruta / route       DELETE api/vi/bootcamps/:id
//  @acceso             Privada
exports.deleteBootcamps = asyncHandler( async (req, res, next) => {
    const { id } = req.params;
        const bootcamp = await Bootcamp.findByIdAndDelete(id);
        
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp no encontrado, id: ${id}`, 404))
        }
        res
        .status(200)
        .json({
            success: true
        })
});