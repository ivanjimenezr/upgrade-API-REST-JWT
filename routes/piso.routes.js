//Importamos express
const express = require("express");
//Guardamos la funcion express.Router() en una variable
const router = express.Router();

//Importamos las funciones del controlador del piso
const { getAllPisos, getPisoById } = require("../controllers/piso.controllers");
//Definimos el metodo, la ruta de entrada y la función del controlador
//que se encargará de efectuar la lógica
router.get("/", getAllPisos);
router.get("/:pisoId", getPisoById);
//exportamos la variable router
module.exports = router;