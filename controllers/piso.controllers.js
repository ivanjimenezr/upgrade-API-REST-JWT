// Cargamos el modelo recien creado
const Piso = require("../models/Piso");
// Cargamos el fichero de los HTTPSTATUSCODE
const HTTPSTATUSCODE = require("../utils/httpStatusCode");

//Metodo para retornar todos los pisos registrados en la base de datos

const getAllPisos = async (req, res, next) => {
    try {
      if (req.query.page) { //Se le añade paginación
        const page = parseInt(req.query.page);
        const skip = (page - 1) * 20;
        const pisos = await Piso.find().skip(skip).limit(20).populate('inmobiliaria');
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { pisos: pisos },
        });
      } else {
        const pisos = await Piso.find().populate('inmobiliaria');
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { pisos: pisos },
        });
      }
    } catch (err) {
      return next(err);
    }
  };

// Metodo para la busqueda de pisos por ID
const getPisoById = async (req, res, next) => {
    
    try {
      const pisoId = req.params.pisoId;
      
      const pisoById = await Piso.findById(pisoId).populate('inmobiliaria');
      
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { pisos: pisoById }
      });
    } catch (err) {
      return next(err);
      
    }
  };
  //Exportamos las funciones
  module.exports = {
    getAllPisos,
    getPisoById,
  }