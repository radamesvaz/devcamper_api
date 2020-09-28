const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const colors = require('colors');


// Cargando env vars
dotenv.config({ path: './config/config.env' });

// Conectando a la base de datos
connectDB();


// Llamando al rauter
const bootcamps = require('./routers/bootcamps')
const courses = require('./routers/courses');


const app = express();

app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//----- Montando el router

// Bootcamps
app.use('/api/v1/bootcamps', bootcamps);
// Cursos
app.use('/api/v1/courses', courses);

app.use(errorHandler);

 
const PORT = process.env.PORT || 3000;

const server = app.listen(
    PORT,
    console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${process.env.PORT}`.cyan.bold)
);

// Gestionando unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`ERROR: ${err.message}`.red.bgWhite)
    // Cerrar el servidor y salir del proceso (que la app no corra)
    server.close(() => {
        process.exit(1)
    })
})
