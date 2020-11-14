const express = require('express');
const router = express.Router({ mergeParams: true });

const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');

// Llamando a los controladores
const{
    getCourses
} = require('../controllers/courses');

router.route('/').get(advancedResults(Course, {
        path: 'bootcamp',
        select: 'name careers phone'
    }), getCourses);

module.exports = router;