const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');
const geocoder = require('../utils/geocoder');


//  @descripcion        Muestra todos los bootcamps
//  @ruta / route       GET api/v1/bootcamps
//  @acceso             Publica
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    let query;

    let queryStr = JSON.stringify(req.query);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match  => `$${match}`);

    query = Bootcamp.find(JSON.parse(queryStr));

        const bootcamp = await query;
        res
        .status(200)
        .json({
            success: true,
            count: bootcamp.length,
            data: bootcamp
        })
});

//  @descripcion        Muestra un solo bootcamp
//  @ruta / route       GET api/v1/bootcamps/:id
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

//  @descripcion        Filtra bootcamps por distancia al zipcode
//  @ruta / route       GET api/v1/bootcamps/:zipcode/:distance
//  @acceso             Publica
exports.getBoocampsInRadius = asyncHandler( async (req, res, next) => {
    const { zipcode, distance } = req.params;


    // Obteniento la latitud y longitud del zipcode usando Geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const long = loc[0].longitude;

    // Calculaando el Radio usando radianes
    // Dividir la distancia por el radio de la Tierra
    // La distancia de la Tierra = 6.378 km / 3.963 millas
    const radius = distance / 3963;

    //Filtrando Bootcamps por el Radio
    const bootcamps = await Bootcamp.find({
        location:{
            $geoWithin: { $centerSphere: [ [ long, lat ], radius ] } 
        }
    });

    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
});

//  @descripcion        Crea un Bootcamp
//  @ruta / route       POST api/v1/bootcamps
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
//  @ruta / route       PUT api/v1/bootcamps/:id
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
//  @ruta / route       DELETE api/v1/bootcamps/:id
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