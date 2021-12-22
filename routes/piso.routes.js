//Importamos express
const express = require("express");
//Guardamos la funcion express.Router() en una variable
const router = express.Router();

//importamos nuestro middleware
const { isAuth } = require("../middlewares/auth.midleware")

//Importamos las funciones del controlador del piso
const { getAllPisos, getPisoById, newPiso, deletePisoById, updatePisoById } = require("../controllers/piso.controllers");
//Definimos el metodo, la ruta de entrada y la función del controlador
//que se encargará de efectuar la lógica
router.get("/", getAllPisos);
router.get("/:pisoId", getPisoById);
// router.post("/create", [isAuth], newPiso;
router.post("/", [isAuth], newPiso);
//ruta para borrar un Piso
router.delete("/:pisoId", [isAuth], deletePisoById)
//ruta para modificar un Piso
router.put("/:pisoId", [isAuth], updatePisoById)

//exportamos la variable router
module.exports = router;