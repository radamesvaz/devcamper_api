const express = require('express');
const dotenv = require('dotenv');

// Load env vars

dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(`Servidor corriendo en modo ${process.env.NODE_ENV} en el puerto ${process.env.PORT}`)
)