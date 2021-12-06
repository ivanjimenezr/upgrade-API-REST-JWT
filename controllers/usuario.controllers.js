// Cargamos el modelo 
const Usuario = require("../models/Usuario");
// Cargamos el módulo de bcrypt
const bcrypt = require("bcrypt");
// Cargamos el módulo de jsonwebtoken
const jwt = require("jsonwebtoken");
// Cargamos el fichero de los HTTPSTATUSCODE
const HTTPSTATUSCODE = require("../utils/httpStatusCode");



// Codificamos las operaciones que se podran realizar con relacion a los usuarios
const createUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
        const error = new Error('Usuario ya registrado');
        return next(error);
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = new Usuario({ email, password: encryptedPassword });

    const userDb = await newUser.save();

    return res.status(201).json(userDb);
  } catch (error) {
    return next(error);
  }
};


const authenticate = async (req, res, next) => {
  try {
    //Buscamos al user en bd
    const userInfo = await Usuario.findOne({ email: req.body.email });
    //Comparamos la contraseña
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      //eliminamos la contraseña del usuario
      userInfo.password = null;
      //creamos el token con el id y el name del user
      const token = jwt.sign(
        {
          id: userInfo._id,
          email: userInfo.email,
        },
        req.app.get('secretKey'),
        { expiresIn: "1h" }
      );
      //devolvemos el usuario y el token.
      return res.status(200).json({ user: userInfo, token: token });
    } else {
      const error = new Error();
      error.status = 401;
      return next(error);
    }
  } catch (err) {
    return next(err);
  }
};


//funcion logout, iguala el token a null.
const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null
    });
  } catch (err) {
    return next(err)
  }
}

//Metodo para retornar todos los pisos registrados en la base de datos

const getAllUsuarios = async (req, res, next) => {
  try {
    if (req.query.page) { //Se le añade paginación
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const usuarios = await Usuario.find().skip(skip).limit(20);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { usuarios: usuarios },
      });
    } else {
      const usuarios = await Usuario.find();
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { usuarios: usuarios },
      });
    }
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  authenticate,
  logout,
  getAllUsuarios
}