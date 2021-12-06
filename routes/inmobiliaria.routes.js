//importamos Router de express
const express = require("express");
const router = express.Router();
//importamos nuestro middleware
const { isAuth } = require("../middlewares/auth.midleware")
//importamos las funciones del controlador
const {
    newInmobiliaria,
    getAllInmobiliarias,
    getInmobiliariasById,
    deleteInmobiliariaById,
    updateInmobiliariaById
} = require("../controllers/inmobiliaria.controllers");

//ruta para crear inmobiliaria
// router.post("/create", [isAuth], newInmobiliaria);
router.post("/create", [isAuth], newInmobiliaria);
//ruta para obtener todas las inmobiliarias
router.get("/", getAllInmobiliarias);
//ruta para obtener una inmobiliaria por id
router.get("/:inmobiliariaId", getInmobiliariasById);
//ruta para borrar una inmobiliaria
router.delete("/:inmobiliariaId", [isAuth], deleteInmobiliariaById)
//ruta para modificar una inmobiliaria
router.put("/:inmobiliariaId", [isAuth], updateInmobiliariaById)




//exportamos las rutas
module.exports = router;