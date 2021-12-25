const express = require("express");
const router = express.Router();
//importamos las funciones del controlador y del middleware
const { createUser, authenticate, logout, getAllUsuarios, getUsuarioById } = require("../controllers/usuario.controllers");
const { isAuth } = require("../middlewares/auth.midleware")

router.post("/register", createUser);
router.post("/authenticate", authenticate);
//le añadimos el middleware para que solo sea accesible si el user esta logueado
router.post("/logout", logout)
router.get("/", [isAuth], getAllUsuarios);
router.get("/:usuarioId", getUsuarioById);

module.exports = router;