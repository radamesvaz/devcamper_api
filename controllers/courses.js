const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');

//  @descripcion        Muestra todos los cursos // Queries avanzados
//  @ruta / route       GET api/v1/cursos
//  @ruta / route       GET api/v1/bootcamps/:bootcampId/courses
//  @acceso             Publica
exports.getCourses = asyncHandler(async (req, res, next) => {
    if(req.params.bootcampId){
        const courses = await Course.find({
            bootcamp: req.params.bootcampId
        })

        res.status(200).json({
            success: true,
            cunt: courses.length,
            data: courses
        })
    } else {
        res.status(200).json(res.advancedResults)
    }

})