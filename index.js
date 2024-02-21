'use strict';

const express = require('express');
const cors = require('cors');

const Routes = require('./app/routers/index');
const App = express();
const port = process.env.PORT || 3000;

const connectDb = require('./app/configs/database');

App.use(express.json());
App.use(cors());

// Rutas o controladores que utilizan la conexión
App.get('/', async (req, res) => {
  try {
    res.send('It works!');
  } catch (error) {
    console.error('Error al realizar operaciones en la base de datos:', error);
    res.status(500).send('Internal Server Error, check logs');
  }
});

Routes(App);

const startServer = async () => {
  try {
    await connectDb();
    App.listen(port, () => {
      console.log(`Mi port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error.message);
    process.exit(1);
  }
};

startServer();
