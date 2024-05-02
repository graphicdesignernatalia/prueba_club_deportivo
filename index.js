const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use(bodyParser.json());

//ruta para agregar un nuevo deporte
app.get('/agregar', (req, res) => {
  const { nombre, precio } = req.query;

  //leer la lista actual de deportes
  const deportes = JSON.parse(fs.readFileSync('deportes.json'));

  //agregar el nuevo deporte
  deportes.push({ nombre, precio });

  //escribir de nuevo la lista de deportes en el archivo JSON
  fs.writeFileSync('deportes.json', JSON.stringify(deportes, null, 2));

  res.send('Deporte agregado correctamente');
});

//ruta para obtener todos los deportes
app.get('/deportes', (req, res) => {
  const deportes = JSON.parse(fs.readFileSync('deportes.json'));
  res.json({ deportes });
});

//ruta para editar el precio de un deporte
app.get('/editar', (req, res) => {
  const { nombre, precio } = req.query;

  //leer la lista actual de deportes
  const deportes = JSON.parse(fs.readFileSync('deportes.json'));

  //encontrar el deporte por nombre y actualizar el precio
  const deporteIndex = deportes.findIndex(d => d.nombre === nombre);
  if (deporteIndex !== -1) {
    deportes[deporteIndex].precio = precio;
    fs.writeFileSync('deportes.json', JSON.stringify(deportes, null, 2));
    res.send('Precio actualizado correctamente');
  } else {
    res.status(404).send('Deporte no encontrado');
  }
});

//ruta para eliminar un deporte
app.get('/eliminar', (req, res) => {
  const { nombre } = req.query;

  //leer la lista actual de deportes
  const deportes = JSON.parse(fs.readFileSync('deportes.json'));

  //filtrar los deportes y mantener solo aquellos cuyo nombre no coincida
  const nuevosDeportes = deportes.filter(d => d.nombre !== nombre);

  //escribir de nuevo la lista de deportes en el archivo JSON
  fs.writeFileSync('deportes.json', JSON.stringify(nuevosDeportes, null, 2));

  res.send('Deporte eliminado correctamente');
});

//iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});




  