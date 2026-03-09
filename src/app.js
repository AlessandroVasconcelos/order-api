const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API de pedidos online.',
  });
});

app.use('/order', orderRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada.',
  });
});

app.use(errorHandler);

module.exports = app;
