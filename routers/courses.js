const express = require('express');
const router = express.Router({ mergeParams: true });

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');


// Llamando a los controladores
const{
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courses');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(advancedResults(Course, {
        path: 'bootcamp',
        select: 'name careers phone'
    }), getCourses)
    .post(protect, addCourse);


router.route('/:id')
    .get(getCourse)
    .put(protect, updateCourse)
    .delete(protect, deleteCourse)

module.exports = router;