const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//  Cargando las env vars
dotenv.config({ path: './config/config.env' });

//  Cargando el modelo que se va a subir a la base de datos
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

//  Conectando a la base de datos
 mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

//  Leyendo los archivos JSON que se van a subir
const bootcamps = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

const courses = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
);

//  Importando archivos a la base de datos
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);

        console.log('Data importada...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

//  Eliminando archivos de la base de datos
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();

        console.log('Data eliminada...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err)
    }
}

if(process.argv[2] === '-i'){
    importData();
} else if(process.argv[2] === '-d'){
    deleteData();
}