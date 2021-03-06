const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan')
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');

//  git desde nueva maquina

// Cargando env vars
dotenv.config({ path: './config/config.env' });

// Conectando a la base de datos
connectDB();


// Llamando al rauter
const bootcamps = require('./routers/bootcamps')
const courses = require('./routers/courses');
const auth = require('./routers/auth');


const app = express();

app.use(express.json());

//  Cookie parser
app.use(cookieParser());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//  subida de archivos
app.use(fileupload());

//  colocando la carpeta estatica
app.use(express.static(path.join(__dirname, 'public')));

//----- Montando el router

// Bootcamps
app.use('/api/v1/bootcamps', bootcamps);
// Cursos
app.use('/api/v1/courses', courses);
// Auth
app.use('/api/v1/auth', auth);

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
