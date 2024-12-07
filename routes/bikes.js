// routes/bikes.js
const express = require('express');
const router = express.Router();
const Database = require('../singlenton_db');
const db = Database.instance;

// Crear una nueva bicicleta
router.post('/', async (req, res) => {
  const { title, description, price, imageUrl, categoryId = 1 } = req.body; // Default categoryId to 1 if not provided

  const insertQuery = `
    INSERT INTO bikes (title, description, price, imageUrl, categoryId)
    VALUES (?, ?, ?, ?, ?)
  `;
  try {
    const result = await db.fetchData(insertQuery, [title, description, price, imageUrl, categoryId]);
    res.status(201).json({
      id: result.insertId,
      title,
      description,
      price,
      imageUrl,
      categoryId
    });
  } catch (error) {
    console.error('Error creating bike:', error);
    res.status(500).json({ message: 'Error al crear la bicicleta' });
  }
});

// Obtener todas las bicicletas
router.get('/', async (req, res) => {
  const selectQuery = 'SELECT * FROM bikes';
  try {
    const results = await db.fetchData(selectQuery, []);
    res.json(results);
  } catch (error) {
    console.error('Error fetching bikes:', error);
    res.status(500).json({ message: 'Error al obtener las bicicletas' });
  }
});

// Obtener una bicicleta por ID
router.get('/:id', async (req, res) => {
  const selectQuery = 'SELECT * FROM bikes WHERE id = ?';
  try {
    const results = await db.fetchData(selectQuery, [req.params.id]);
    if (results.length === 0) {
      return res.status(404).json({ message: 'Bicicleta no encontrada' });
    }
    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching bike by id:', error);
    res.status(500).json({ message: 'Error al obtener la bicicleta' });
  }
});

// Actualizar una bicicleta
router.put('/:id', async (req, res) => {
  const { title, description, price, imageUrl } = req.body;

  const updateQuery = `
    UPDATE bikes
    SET title = ?, description = ?, price = ?, imageUrl = ?
    WHERE id = ?
  `;
  try {
    const result = await db.fetchData(updateQuery, [title, description, price, imageUrl, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bicicleta no encontrada' });
    }
    res.json({
      id: req.params.id,
      title,
      description,
      price,
      imageUrl,
    });
  } catch (error) {
    console.error('Error updating bike:', error);
    res.status(500).json({ message: 'Error al actualizar la bicicleta' });
  }
});

// Eliminar una bicicleta
router.delete('/:id', async (req, res) => {
  const deleteQuery = 'DELETE FROM bikes WHERE id = ?';
  try {
    const result = await db.fetchData(deleteQuery, [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Bicicleta no encontrada' });
    }
    res.json({ message: 'Bicicleta eliminada' });
  } catch (error) {
    console.error('Error deleting bike:', error);
    res.status(500).json({ message: 'Error al eliminar la bicicleta' });
  }
});

module.exports = router;
