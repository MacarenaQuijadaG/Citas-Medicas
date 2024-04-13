// codigo utilizando axios para leer una api
const express = require('express');
const app = express();
const PORT = 3000;
//librerias y paquetes
const axios = require('axios');
const chalk = require('chalk');
// se instalaron versiones una 0.0.4 y 4.17.21
const _ = require('lodash');
// importanto el objeto
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

// salida al servidor y puerto ulitizado
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//arreglo de usuarios
const usuariosRegistrados = [];

//https://randomuser.me/api/?results=10
//https://randomuser.me/api/?results=100
//https://randomuser.me/api/

app.use(express.json());

//ruta 
//app.get('/usuarios', async (req, res) => {
app.get('/', async (req, res) => {
  
  try {
    const response = await axios.get('https://randomuser.me/api/?results=11');
    const objectData = response.data;
    const userData = objectData.results;
    
    userData.forEach(user => {
      console.log(user); // Imprimir todos los datos del usuario
      const segundos = Math.floor(Math.random() * 60) + 1;
      const fechaRegistro = moment().add(segundos, 'seconds').format('MMMM Do YYYY, h:mm:ss a');
      const usuarioCreado = `Nombre: ${user.name.first} ${user.name.last} - ID: ${uuidv4().slice(0, 6)} - Timestamp: ${fechaRegistro}\n`;
      usuariosRegistrados.push(usuarioCreado);
    });
    
    console.log(chalk.blue.bgWhite.bold(usuariosRegistrados.join('')));

    const usuariosPorGenero = _.partition(userData, (usuario) => usuario.gender == 'male');
    console.log(usuariosPorGenero);
    
    // Devolver la lista de usuarios en la respuesta JSON
    res.json(userData.map(user => ({ nombre: user.name.first, apellido: user.name.last, genero: user.gender })));
} catch (error) {
    console.error('Error al obtener usuarios aleatorios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios aleatorios' });
}
});

