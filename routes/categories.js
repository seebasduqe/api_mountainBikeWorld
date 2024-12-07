const express = require('express');
const router = express.Router();
const Database = require('../singlenton_db');
const db = Database.instance;

// Crear una nueva categoría
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
  try {
    const result = await db.fetchData(query, [name, description]);
    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Error al crear la categoría' });
  }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM categories';
  try {
    const results = await db.fetchData(query, []);
    res.json(results);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
});

// Obtener una categoría por ID
router.get('/:id', async (req, res) => {
  const query = 'SELECT * FROM categories WHERE id = ?';
  try {
    const results = await db.fetchData(query, [req.params.id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching category by id:', error);
    res.status(500).json({ message: 'Error al obtener la categoría' });
  }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;

  const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
  try {
    const result = await db.fetchData(query, [name, description, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ id: req.params.id, name, description });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Error al actualizar la categoría' });
  }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
  const query = 'DELETE FROM categories WHERE id = ?';
  try {
    const result = await db.fetchData(query, [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error al eliminar la categoría' });
  }
});

module.exports = router;