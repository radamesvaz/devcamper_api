const express = require('express');
const router = express.Router({ mergeParams: true });

// Llamando a los controladores
const{
    getCourses
} = require('../controllers/courses');

router.route('/').get(getCourses);

module.exports = router;