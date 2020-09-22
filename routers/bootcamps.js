const express = require('express');
const router = express.Router();

// Llamando a los controladores
const{
    getBootcamps,
    getBootcamp,
    getBoocampsInRadius,
    createBootcamp,
    updateBootcamps,
    deleteBootcamps
} = require('../controllers/bootcamps');

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