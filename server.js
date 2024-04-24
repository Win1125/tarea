const http = require('http');
const express = require('express');
const productos = require('./rutas/productos');
const app = express();
app.use(express.json());

app.use('/productos', productos);

app.use('/', function (req, res) {
    res.send('Esta¡ funcionando');
});

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.log('Aplicacion funcionando en ' + port);