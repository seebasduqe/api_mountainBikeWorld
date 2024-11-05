const express = require('express');
const cors = require('cors');
const app = express();
const categoryRoutes = require('./routes/categories');
const bikeRoutes = require('./routes/bikes');

app.use(cors());
app.use(express.json());

// Rutas de las categorías y bicicletas
app.use('/api/categories', categoryRoutes);
app.use('/api/bikes', bikeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
