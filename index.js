const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL (datos de Railway)
const db = mysql.createConnection({
  host: 'containers-us-west-182.railway.app',
  user: 'root',
  password: 'EbqIuGkgMOqdriufCMjlhcoaXJsOINIM',
  database: 'railway',
  port: 3306
});

// Conexión
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
  } else {
    console.log('Conectado a la base de datos MySQL');
  }
});

// Ruta para registrar cliente
app.post('/api/clientes', (req, res) => {
  const {
    cuaderno,
    hoja,
    coche,
    placas,
    kilometraje,
    cliente,
    telefono,
    fecha,
    marca,
    anio,
    servicio,
    color,
    salida
  } = req.body;

  const query = `
    INSERT INTO clientes (
      cuaderno,
      hoja,
      coche,
      placas,
      km,
      cliente,
      telefono,
      entrada,
      marca,
      anio,
      servicio,
      color,
      salida
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      cuaderno,
      hoja,
      coche,
      placas,
      kilometraje,
      cliente,
      telefono,
      fecha,
      marca,
      anio,
      servicio,
      color,
      salida
    ],
    (err, result) => {
      if (err) {
        console.error('Error al insertar cliente:', err);
        res.status(500).send('Error en el servidor');
      } else {
        res.status(200).send('Cliente registrado con éxito');
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});