const Bootcamp = require('../models/Bootcamp')


//  @descripcion        Muestra todos los bootcamps
//  @ruta / route       GET api/vi/bootcamps
//  @acceso             Publica
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.find();

        res
        .status(200)
        .json({
            success: true,
            data: bootcamp
        })
    } catch (error) {
        res
        .status(400)
        .json({
            success: false,
            data: error
        })
    }
}

//  @descripcion        Muestra un solo bootcamp
//  @ruta / route       GET api/vi/bootcamps/:id
//  @acceso             Publica
exports.getBootcamp = async (req, res, next) => {
    const { id } = req.params;
    try {
        const bootcamp = await Bootcamp.findById(id)
        res
        .status(200)
        .json({
            success: true,
            data: bootcamp
        })

    } catch (error) {
        res
        .status(400)
        .json({
            success: false,
            data: error
        })
    }
}

//  @descripcion        Crea un Bootcamp
//  @ruta / route       POST api/vi/bootcamps
//  @acceso             Privada
exports.createBootcamp = async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res
    .status(201)
    .json({
        success: true,
        data: bootcamp
    })
}

//  @descripcion        Modifica un bootcamp
//  @ruta / route       PUT api/vi/bootcamps/:id
//  @acceso             Privada
exports.updateBootcamps = (req, res, next) => {
    const { id } = req.params;
    res
    .status(201)
    .json({ exito: true, msj: `Se ha modificado el bootcamp ${id}` });
}

//  @descripcion        Elimina un bootcamp
//  @ruta / route       DELETE api/vi/bootcamps/:id
//  @acceso             Privada
exports.deleteBootcamps = (req, res, next) => {
    const { id } = req.params;
    res
    .status(200)
    .json({ exito: true, msj: `Se ha borrado el bootcamp ${id}` });
}