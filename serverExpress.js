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

    const hombres = userData.filter(user => user.gender === 'male').slice(0, 11);
    const mujeres = userData.filter(user => user.gender === 'female').slice(0, 11);

    // Imprimir lista de hombres con fondo blanco y color de texto azul
    console.log(chalk.bgWhite.blue.bold('Hombres:'));
    hombres.forEach(user => {
        const segundos = Math.floor(Math.random() * 60) + 1;
        const fechaRegistro = moment().add(segundos, 'seconds').format('MMMM Do YYYY, h:mm:ss a');
        console.log(chalk.bgWhite.blue(`Nombre: ${user.name.first} ${user.name.last} - ID: ${uuidv4().slice(0, 6)} - Timestamp: ${fechaRegistro}`));
        const usuarioCreado = `Nombre: ${user.name.first} - Apellido: ${user.name.last} - ID: ${uuidv4().slice(0, 6)} - Timestamp: ${fechaRegistro}\n`;
        usuariosRegistrados.push(usuarioCreado);
      });

    // Imprimir lista de mujeres con fondo blanco y color de texto azul
    console.log(chalk.bgWhite.blue.bold('\nMujeres:'));
    mujeres.forEach(user => {
        const segundos = Math.floor(Math.random() * 60) + 1;
        const fechaRegistro = moment().add(segundos, 'seconds').format('MMMM Do YYYY, h:mm:ss a');
        console.log(chalk.bgWhite.blue(`Nombre: ${user.name.first} ${user.name.last} - ID: ${uuidv4().slice(0, 6)} - Timestamp: ${fechaRegistro}`));
    });

} catch (error) {
    console.error('Error al obtener usuarios: ', error);
}
});

