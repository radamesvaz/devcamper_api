const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Por favor agrega un titulo al curso']
    },
    description: {
        type: String,
        required: [true, 'Por favor agrega una descripcion']
    },
    weeks: {
        type: String,
        required: [true, 'Por favor agrega una duracion del curso en semanas']
    },
    tuition: {
        type: Number,
        required: [true, 'Por favor agrega un costo de la enseñanza']
    },    
    minimumSkill: {
        type: String,
        required: [true, 'Por favor agrega una habilidad minima'],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scolarshipAvailable: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'BootcampSchema',
        required: true
    }
});

module.exports = mongoose.model('Course', CourseSchema)