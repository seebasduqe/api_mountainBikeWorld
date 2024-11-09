// routes/bikes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear una nueva bicicleta
router.post('/', (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  const query = 'INSERT INTO bikes (title, description, price, imageUrl, categoryId) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, description, price, imageUrl, 1], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al crear la bicicleta' });
    }
    res.status(201).json({
      id: results.insertId,
      title,
      description,
      price,
      imageUrl
    });
  });
});

// Obtener todas las bicicletas
router.get('/', (req, res) => {
  const query = 'SELECT * FROM bikes';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: err });
    }
    res.json(results);
  });
});

// Obtener una bicicleta por ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM bikes WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al obtener la bicicleta' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Bicicleta no encontrada' });
    }
    res.json(results[0]);
  });
});

// Actualizar una bicicleta
router.put('/:id', (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  const query = 'UPDATE bikes SET title = ?, description = ?, price = ?, imageUrl = ? WHERE id = ?';
  db.query(query, [title, description, price, imageUrl, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al actualizar la bicicleta' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Bicicleta no encontrada' });
    }
    res.json({
      id: req.params.id,
      title,
      description,
      price,
      imageUrl,
    });
  });
});

// Eliminar una bicicleta
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM bikes WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al eliminar la bicicleta' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Bicicleta no encontrada' });
    }
    res.json({ message: 'Bicicleta eliminada' });
  });
});

module.exports = router;
