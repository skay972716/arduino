//Ejecutando el modulo dotenv para trabajar con las variables de SO
require('dotenv').config();
//COnstante para servidores
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
//Creando el servidor
const server = http.createServer(app);
//SOcket web instanciando
const SocketIO = require('socket.io')(server);
const io = SocketIO.listen(server);
//Instanciando los middlewares
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routers
app.use(require('./routes/index.js'));

//Abriendo el servidor en localhost en el puerto 3000
app.use(express.static(path.join(__dirname, 'public')));
server.listen(3000, () => console.log('server on port 3000'));

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

//Modificando la seria del puerto en linux, y estilizando el mensaje del servidor con /n
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600,
});
const parser = port.pipe(new ReadLine({delimiter: '\r\n'}));

//Abrir conexion mensaje
parser.on('open', function () {
  console.log('connection is opened');
});

//Mandando la señal del sensor de temperatura
parser.on('data', function (data) {
  let temp = parseInt(data, 10) + ' °C';
  console.log(temp);
  io.emit('temp', data.toString());
});
//Conectando los socket IO
SocketIO.on('connection', socket=>{
		socket.on('total', total=>{
				console.log(total);
				port.write("total");
		})
})
parser.on('error', err => console.log(err));
port.on('error', err => console.log(err));
