const express = require('express');


// Llamando a los controladores
const{
    getBootcamps,
    getBootcamp,
    getBoocampsInRadius,
    createBootcamp,
    updateBootcamps,
    deleteBootcamps
} = require('../controllers/bootcamps');

const courseRouter = require('./courses');

const router = express.Router();

//  Redireccionando a otros routers
router.use('/:bootcampId/courses', courseRouter)



// Estableciendo las direcciones

router
    .route('/radius/:zipcode/:distance')
    .get(getBoocampsInRadius)

router
    .route('/')
    .get(getBootcamps)
    .post(createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(updateBootcamps)
    .delete(deleteBootcamps);


module.exports = router;