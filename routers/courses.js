const express = require('express');
const router = express.Router({ mergeParams: true });

// Llamando a los controladores
const{
    getCourses,
    getCourse,
    addCourse
} = require('../controllers/courses');

router.route('/')
    .get(getCourses)
    .post(addCourse);


router.route('/:id')
    .get(getCourse);

module.exports = router;