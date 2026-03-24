const express = require('express');
const cors = require('cors');
const clienteRoutes = require('./src/routes/clienteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Agrupando as rotas de clientes sob o prefixo /clientes
app.use('/clientes', clienteRoutes);

module.exports = app;