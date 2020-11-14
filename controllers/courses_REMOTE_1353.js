const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

//  @descripcion        Muestra todos los cursos
//  @ruta / route       GET api/v1/cursos
//  @ruta / route       GET api/v1/bootcamps/:bootcampId/courses
//  @acceso             Publica
exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if(req.params.bootcampId){
        query = Course.find({
            bootcamp: req.params.bootcampId
        })
    } else {
        query = Course.find().populate('bootcamp');
        /*      De esta manera para filtrar los campos que queremos solamente
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name careers phone'
        });
        */
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })

})

//  @descripcion        Muestra un curso según su ID
//  @ruta / route       GET api/v1/cursos/:ID
//  @acceso             Publica
exports.getCourse = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })

    if(!course){
        return next(new ErrorResponse(`No se ha conseguido el curso con el id: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        data: course
    })

})

//  @descripcion        Agregar un curso
//  @ruta / route       POST api/v1/bootcamps/:bootcampId/courses
//  @acceso             Privada
exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId)

    if(!bootcamp){
        return next(new ErrorResponse(`No se ha conseguido el bootcamp con el id: ${req.params.bootcampId}`, 404))
    }

    const course = await Course.create(req.body);

    res.status(200).json({
        success: true,
        data: course
    })

});

//  @descripcion        Modificar un curso
//  @ruta / route       PUT api/v1/courses/:Id
//  @acceso             Privada
exports.updateCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let course = await Course.findById(id)

    if(!course){
        return next(new ErrorResponse(`No se ha conseguido el curso con el id: ${req.params.bootcampId}`, 404))
    }

    course = await Course.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        success: true,
        data: course
    })

});

//  @descripcion        Eliminar un curso
//  @ruta / route       DELETE api/v1/courses/:Id
//  @acceso             Privada
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let course = await Course.findById(id)

    if(!course){
        return next(new ErrorResponse(`No se ha conseguido el curso con el id: ${req.params.bootcampId}`, 404))
    }

    await course.remove();

    res.status(200).json({
        success: true
    })

});

