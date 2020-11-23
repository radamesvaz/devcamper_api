const express = require('express');


// Llamando a los controladores
const{
    getBootcamps,
    getBootcamp,
    getBoocampsInRadius,
    createBootcamp,
    updateBootcamps,
    deleteBootcamps,
    bootcampPhotoUpload
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

const courseRouter = require('./courses');
const { protect } = require('../middleware/auth');

const router = express.Router();


//  Redireccionando a otros routers
router.use('/:bootcampId/courses', courseRouter)



// Estableciendo las direcciones

router
    .route('/radius/:zipcode/:distance')
    .get(getBoocampsInRadius)

router
    .route('/')
    .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
    .post(protect, createBootcamp);

router
    .route('/:id')
    .get(getBootcamp)
    .put(protect, updateBootcamps)
    .delete(protect, deleteBootcamps);

router
    .route('/:id/photo').put(protect, bootcampPhotoUpload)


module.exports = router;