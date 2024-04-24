// Edwin Fandiño Salazar
// 20221978016
const express = require('express');
const router = express.Router();

const data = [
    { id: 1, nombre: 'Zapatos A', valor: 19.3, enStock: true, createdOn: new Date() },
    { id: 2, nombre: 'Zapatos B', valor: 206.3, enStock: false, createdOn: new Date() },
    { id: 3, nombre: 'Zapatos C', valor: 56.0, enStock: true, createdOn: new Date() },
    { id: 4, nombre: 'Zapatos D', valor: 63.8, enStock: true, createdOn: new Date() },
    { id: 5, nombre: 'Zapatos E', valor: 39.4, enStock: false, createdOn: new Date() },
];

//Ruta raíz que devuelve todos los productos
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// Devuelve el producto especifico por ID
router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // Retornar los valores de la variable found
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// Registrar un nuevo producto
router.post('/', function (req, res) {
    // Metodo para crear un ID autoincrementable
    let itemIds = data.map(item => item.id);
    let nuevoId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;

    let newItem = {
        id: nuevoId,
        nombre: req.body.nombre,
        valor: req.body.valor,
        enStock: false,
        createdOn: new Date()
    }

    data.push(newItem);
    res.status(201).json(newItem);
});

// Metodo que actualiza el producto por ID
router.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // Actualizar los valores (similar a como se hizo en post)
        let updated = {
            id: found.id,
            nombre: req.body.nombre,
            valor: req.body.valor,
            enStock: req.body.enStock,
        }
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1, updated);
        res.sendStatus(204);
    } else {
        res.sendStatus(500)
    }
});

// Elimina un producto por ID
router.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);
    }

    res.sendStatus(204);
});

module.exports = router;