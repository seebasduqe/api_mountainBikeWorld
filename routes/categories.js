// routes/categories.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Crear una nueva categoría
router.post('/', (req, res) => {
  const { name, description } = req.body;

  const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
  db.query(query, [name, description], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al crear la categoría' });
    }
    res.status(201).json({ id: results.insertId, name, description });
  });
});

// Obtener todas las categorías
router.get('/', (req, res) => {
  const query = 'SELECT * FROM categories';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al obtener las categorías' });
    }
    res.json(results);
  });
});

// Obtener una categoría por ID
router.get('/:id', (req, res) => {
  const query = 'SELECT * FROM categories WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al obtener la categoría' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(results[0]);
  });
});

// Actualizar una categoría
router.put('/:id', (req, res) => {
  const { name, description } = req.body;

  const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
  db.query(query, [name, description, req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al actualizar la categoría' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ id: req.params.id, name, description });
  });
});

// Eliminar una categoría
router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM categories WHERE id = ?';
  db.query(query, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error al eliminar la categoría' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada' });
  });
});

module.exports = router;
