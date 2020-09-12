const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ exito: true, msj: 'Mostrar todos los bootcamps' });
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    res.status(200).json({ exito: true, msj: `Mostrar bootcamp ${id}` });
});

router.post('/', (req, res) => {
    res.status(201).json({ exito: true, msj: 'Bootcamp creado' });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    res.status(201).json({ exito: true, msj: `Se ha modificado el bootcamp ${id}` });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ exito: true, msj: `Se ha borrado el bootcamp ${id}` });
});


module.exports = router;