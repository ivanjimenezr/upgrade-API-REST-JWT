const express = require('express');

//Importamos la conexion a la db
const dbConnection = require("./config/database");


//Importamos las rutas
const usuario = require("./routes/usuario.routes");
const inmobiliaria = require("./routes/inmobiliaria.routes");
const piso = require("./routes/piso.routes");


const HTTPSTATUSCODE = require("./utils/httpStatusCode");

const cors = require("cors");
//Ejecutamos la funcion que conecta con la db
dbConnection();

const PORT = 'https://inmobiliaria-bootcamp.herokuapp.com/';

const server = express();

server.set('secretKey', "nodeRestApi");

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

server.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
}));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.use("/usuario", usuario);
server.use("/inmobiliarias", inmobiliaria);
server.use("/pisos", piso);



server.use((req, res, next) => {
    let err = new Error();
    err.status = 404;
    err.message = HTTPSTATUSCODE[404];
    next(err);
  });


// handle errors
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
  })

server.disable('x-powered-by');

server.listen(PORT,()=>{
    console.log(`The server running in http://localhost${PORT}`)
})
