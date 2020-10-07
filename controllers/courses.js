const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

//  @descripcion        Muestra todos los cursos // Queries avanzados
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