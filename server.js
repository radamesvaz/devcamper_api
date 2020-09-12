const express = require('express');
const dotenv = require('dotenv');

// Llamando al rauter
const bootcamps = require('./routers/bootcamps')


// Load env vars

dotenv.config({ path: './config/config.env' });

const app = express();

//----- Montando el router

// Bootcamps
app.use('/api/v1/bootcamps', bootcamps);



const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${process.env.PORT}`)
)