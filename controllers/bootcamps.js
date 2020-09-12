//  @descripcion        Muestra todos los bootcamps
//  @ruta / route       GET api/vi/bootcamps
//  @acceso             Publica
exports.getBootcamps = (req, res, next) => {
    res
    .status(200)
    .json({ exito: true, msj: 'Mostrar todos los bootcamps' });
}

//  @descripcion        Muestra un solo bootcamp
//  @ruta / route       GET api/vi/bootcamps/:id
//  @acceso             Publica
exports.getBootcamp = (req, res, next) => {
    const { id } = req.params
    res
    .status(200)
    .json({ exito: true, msj: `Mostrar bootcamp ${id}` });
}

//  @descripcion        Crea un Bootcamp
//  @ruta / route       POST api/vi/bootcamps
//  @acceso             Privada
exports.createBootcamp = (req, res, next) => {
    res
    .status(201)
    .json({ exito: true, msj: 'Bootcamp creado!' });
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